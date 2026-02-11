import type { ItemIDList } from "@interfacesV03/data/user";
import type { AxisData, ResultType } from "@interfacesV03/type";

type AxisProfile = "FOCUSED" | "WIDE";

type AxisSummary = {
  zone: ResultType;
  profile: AxisProfile;
};

type BoardResult = {
  horizontal: AxisSummary;
  vertical: AxisSummary;
};

type BoardResultWithTop = BoardResult & {
  topLikedItemIDList: ItemIDList;
  hasNoCalcData: boolean; // 계산에 포함되는 데이터가 없으면 true
};

const groupMinID = 0;
const groupMaxID = 5;
const groupSize = groupMaxID - groupMinID + 1; // 6

// groupID -> positionPct
const groupCenter = 2.5;
const groupStepPct = 20;

const positionMinPct = -50;
const positionMaxPct = 50;

// [-50, 50] 3등분 경계
const rangePct = positionMaxPct - positionMinPct;
const zoneCut1Pct = positionMinPct + rangePct / 3 + 10;
const zoneCut2Pct = positionMinPct + (2 * rangePct) / 3 - 10;

// 평균(위치) 안정화용
const shrinkageK = 2;

// profile 판정값
const focusedStdThresholdPct = 14;
const focusedMassThreshold = 0.62;
const noSignalWeightThreshold = 0.15;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const isValidGroupID = (groupID: number) =>
  Number.isFinite(groupID) && groupID >= groupMinID && groupID <= groupMaxID;

const groupIDToPositionPct = (groupID: number) =>
  (groupID - groupCenter) * groupStepPct;

const positionPctToZone = (positionPct: number): ResultType => {
  if (positionPct < zoneCut1Pct) return "START";
  if (positionPct < zoneCut2Pct) return "MIDDLE";
  return "END";
};

const calcProfile = (params: {
  totalLikeWeight: number;
  stdPct: number;
  groupLikeWeight: number[];
}): AxisProfile => {
  const { totalLikeWeight, stdPct, groupLikeWeight } = params;

  const hasSignal = totalLikeWeight >= noSignalWeightThreshold;
  if (!hasSignal) return "WIDE";

  const denom = totalLikeWeight <= 0 ? 1 : totalLikeWeight;

  const startMass = (groupLikeWeight[0] + groupLikeWeight[1]) / denom;
  const centerMass = (groupLikeWeight[2] + groupLikeWeight[3]) / denom;
  const endMass = (groupLikeWeight[4] + groupLikeWeight[5]) / denom;

  const maxMass = Math.max(startMass, centerMass, endMass);

  return stdPct <= focusedStdThresholdPct || maxMass >= focusedMassThreshold
    ? "FOCUSED"
    : "WIDE";
};

/**
 * ✅ topLikedItemIDList
 * - 기존처럼 preference.roughData의 "상위(4~)"에서 뽑되,
 * - ✅ 계산에 포함된(itemIDSet) 것만 top3에 포함
 */
const buildTopLikedItemIDList = (
  preference: AxisData,
  includedItemIDSet: Set<number>,
) => {
  const picked: number[] = [];
  const pickedSet = new Set<number>();

  const roughData = preference.roughData;

  for (let i = roughData.length - 1; i >= 4; i--) {
    const bundleList = roughData[i];

    for (let b = bundleList.length - 1; b >= 0; b--) {
      const ids = bundleList[b];

      for (let k = ids.length - 1; k >= 0; k--) {
        const id = ids[k];

        // ✅ 계산에서 제외된 건 스킵
        if (!includedItemIDSet.has(id)) continue;

        // 중복 방지
        if (pickedSet.has(id)) continue;

        picked.push(id);
        pickedSet.add(id);

        if (picked.length >= 3) return picked;
      }
    }
  }

  return picked;
};

/**
 * ✅ (변경) 선호도 평균 기반 계산
 * - preference groupID를 0..10 점수로 보고(score: 0..1),
 * - score 평균(avgScore)을 먼저 구한 뒤,
 * - score > avgScore 인 아이템만 계산에 포함 (평균 기준으로 가중치 정규화)
 */
const preferenceMinGroupID = 0;
const preferenceMaxGroupID = 10;
const preferenceRange = preferenceMaxGroupID - preferenceMinGroupID;

const preferenceGroupIDToScore = (pGroupID: number) => {
  if (!Number.isFinite(pGroupID)) return NaN;
  const clamped = clamp(pGroupID, preferenceMinGroupID, preferenceMaxGroupID);
  return preferenceRange === 0
    ? 0
    : (clamped - preferenceMinGroupID) / preferenceRange; // 0..1
};

const scoreToLikeWeightByAvg = (score: number, avgScore: number) => {
  // 평균 이하 => 계산 제외
  if (!Number.isFinite(score) || !Number.isFinite(avgScore)) return 0;
  if (score <= avgScore) return 0;

  // 평균을 기준으로 "위쪽 구간"에서 0..1로 정규화
  const denom = 1 - avgScore;
  if (denom <= 1e-9) return 0;

  return clamp((score - avgScore) / denom, 0, 1);
};

type Parms = {
  vertical: AxisData;
  horizontal: AxisData;
  preference: AxisData;
  itemList: ItemIDList;
};

const useGetBoardResult = (parms: Parms): BoardResultWithTop => {
  const { vertical, horizontal, preference, itemList } = parms;

  const pDict = preference.itemPositionDict;
  const hDict = horizontal.itemPositionDict;
  const vDict = vertical.itemPositionDict;

  // ----------------------------
  // 1) 선호도 평균(avgScore) 계산
  //    (H/V까지 모두 위치가 있는 item만 대상으로 평균)
  // ----------------------------
  let prefScoreSum = 0;
  let prefScoreCount = 0;

  for (const itemID of itemList) {
    const p = pDict[itemID];
    const h = hDict[itemID];
    const v = vDict[itemID];
    if (!p || !h || !v) continue;

    const hGroupID = h.userAxisGroupID;
    const vGroupID = v.userAxisGroupID;
    if (!isValidGroupID(hGroupID) || !isValidGroupID(vGroupID)) continue;

    const score = preferenceGroupIDToScore(p.userAxisGroupID);
    if (!Number.isFinite(score)) continue;

    prefScoreSum += score;
    prefScoreCount += 1;
  }

  const avgPreferenceScore =
    prefScoreCount === 0 ? 0 : clamp(prefScoreSum / prefScoreCount, 0, 1);

  // ----------------------------
  // 2) 평균 기반 가중치로 H/V 척도 계산
  // ----------------------------
  const hGroupLikeWeight = Array<number>(groupSize).fill(0);
  const vGroupLikeWeight = Array<number>(groupSize).fill(0);

  let totalLikeWeight = 0;

  let hSumWX = 0;
  let hSumWX2 = 0;
  let vSumWX = 0;
  let vSumWX2 = 0;

  const likedEntries: Array<{ itemID: number; likeWeight: number }> = [];

  for (const itemID of itemList) {
    const p = pDict[itemID];
    const h = hDict[itemID];
    const v = vDict[itemID];
    if (!p || !h || !v) continue;

    const hGroupID = h.userAxisGroupID;
    const vGroupID = v.userAxisGroupID;

    if (!isValidGroupID(hGroupID) || !isValidGroupID(vGroupID)) continue;

    const score = preferenceGroupIDToScore(p.userAxisGroupID);
    const likeWeight = scoreToLikeWeightByAvg(score, avgPreferenceScore);
    if (likeWeight <= 0) continue; // ✅ 계산 제외

    likedEntries.push({ itemID, likeWeight });
    totalLikeWeight += likeWeight;

    hGroupLikeWeight[hGroupID] += likeWeight;
    vGroupLikeWeight[vGroupID] += likeWeight;

    const hPos = groupIDToPositionPct(hGroupID);
    const vPos = groupIDToPositionPct(vGroupID);

    hSumWX += likeWeight * hPos;
    hSumWX2 += likeWeight * hPos * hPos;

    vSumWX += likeWeight * vPos;
    vSumWX2 += likeWeight * vPos * vPos;
  }

  const hasNoCalcData = likedEntries.length === 0;

  // ✅ topLikedItemIDList도 "계산 포함된 item"만
  const includedItemIDSet = new Set(likedEntries.map((e) => e.itemID));
  const topLikedItemIDList = buildTopLikedItemIDList(
    preference,
    includedItemIDSet,
  );

  // 위치 평균은 shrinkage 적용(0쪽으로 안정화)
  const denomPos = totalLikeWeight + shrinkageK;

  const hPositionPct = clamp(
    denomPos === 0 ? 0 : hSumWX / denomPos,
    positionMinPct,
    positionMaxPct,
  );
  const vPositionPct = clamp(
    denomPos === 0 ? 0 : vSumWX / denomPos,
    positionMinPct,
    positionMaxPct,
  );

  const horizontalZone = positionPctToZone(hPositionPct);
  const verticalZone = positionPctToZone(vPositionPct);

  // 분산/표준편차: likeWeight 데이터만(=shrinkage 미적용)
  const denomVar = totalLikeWeight;

  const hEX = denomVar === 0 ? 0 : hSumWX / denomVar;
  const hEX2 = denomVar === 0 ? 0 : hSumWX2 / denomVar;
  const hVar = Math.max(0, hEX2 - hEX * hEX);
  const hStd = Math.sqrt(hVar);

  const vEX = denomVar === 0 ? 0 : vSumWX / denomVar;
  const vEX2 = denomVar === 0 ? 0 : vSumWX2 / denomVar;
  const vVar = Math.max(0, vEX2 - vEX * vEX);
  const vStd = Math.sqrt(vVar);

  const horizontalProfile = calcProfile({
    totalLikeWeight,
    stdPct: hStd,
    groupLikeWeight: hGroupLikeWeight,
  });

  const verticalProfile = calcProfile({
    totalLikeWeight,
    stdPct: vStd,
    groupLikeWeight: vGroupLikeWeight,
  });

  return {
    horizontal: { zone: horizontalZone, profile: horizontalProfile },
    vertical: { zone: verticalZone, profile: verticalProfile },
    topLikedItemIDList,
    hasNoCalcData,
  };
};

export default useGetBoardResult;
