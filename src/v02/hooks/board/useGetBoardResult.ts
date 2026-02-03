import { useMemo } from "react";
import { useBoardStaticContext } from "./context/context";
import type { ResultType } from "@interfacesV02/type";

type ItemPosition = { userAxisGroupID: number };
type ItemPositionDict = Record<number, ItemPosition | undefined>;

type AxisDataLike = { itemPositionDict: ItemPositionDict };

type BoardStaticContextLike = {
  itemList: number[];
  vertical: AxisDataLike;
  horizontal: AxisDataLike;
  preference: AxisDataLike;
};

type AxisProfile = "FOCUSED" | "WIDE";

type AxisSummary = {
  zone: ResultType;
  profile: AxisProfile;
};

type BoardResult = {
  horizontal: AxisSummary;
  vertical: AxisSummary;
};

const groupMinId = 0;
const groupMaxId = 5;
const groupSize = groupMaxId - groupMinId + 1; // 6

const preferenceNeutralGroupId = 5;
const preferenceHalfRange = 5; // w=(p-5)/5

// groupId -> positionPct
const groupCenter = 2.5;
const groupStepPct = 20;

const positionMinPct = -50;
const positionMaxPct = 50;

// [-50,50] 3등분 경계
const rangePct = positionMaxPct - positionMinPct; // 100
const zoneCut1Pct = positionMinPct + rangePct / 3; // -16.666...
const zoneCut2Pct = positionMinPct + (2 * rangePct) / 3; // +16.666...

// 평균(위치) 안정화용
const shrinkageK = 2;

// profile 판정값
const focusedStdThresholdPct = 14;
const focusedMassThreshold = 0.62;
const noSignalWeightThreshold = 0.15;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const isValidGroupId = (groupId: number) =>
  Number.isFinite(groupId) && groupId >= groupMinId && groupId <= groupMaxId;

const groupIdToPositionPct = (groupId: number) =>
  (groupId - groupCenter) * groupStepPct;

const preferenceGroupIdToLikeWeight = (pGroupId: number) => {
  const w = (pGroupId - preferenceNeutralGroupId) / preferenceHalfRange; // [-1,1]
  return Math.max(0, w); // like only
};

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

const useGetBoardResult = (): BoardResult => {
  const { itemList, vertical, horizontal, preference } =
    useBoardStaticContext() as unknown as BoardStaticContextLike;

  return useMemo(() => {
    const pDict = preference.itemPositionDict;
    const hDict = horizontal.itemPositionDict;
    const vDict = vertical.itemPositionDict;

    // 그룹별 likeWeight 누적 (profile의 mass 계산용)
    const hGroupLikeWeight = Array<number>(groupSize).fill(0);
    const vGroupLikeWeight = Array<number>(groupSize).fill(0);

    // 전체 likeWeight (분모)
    let totalLikeWeight = 0;

    // 축별 가중합 / 제곱가중합 (분산/표준편차)
    let hSumWX = 0;
    let hSumWX2 = 0;
    let vSumWX = 0;
    let vSumWX2 = 0;

    for (const itemId of itemList) {
      const p = pDict[itemId];
      const h = hDict[itemId];
      const v = vDict[itemId];
      if (!p || !h || !v) continue;

      const pGroupId = p.userAxisGroupID;
      const hGroupId = h.userAxisGroupID;
      const vGroupId = v.userAxisGroupID;

      if (!isValidGroupId(hGroupId) || !isValidGroupId(vGroupId)) continue;

      const likeWeight = preferenceGroupIdToLikeWeight(pGroupId);
      if (likeWeight <= 0) continue;

      totalLikeWeight += likeWeight;

      // groupId가 0~5니까 그대로 index로 사용 가능
      hGroupLikeWeight[hGroupId] += likeWeight;
      vGroupLikeWeight[vGroupId] += likeWeight;

      const hPos = groupIdToPositionPct(hGroupId);
      const vPos = groupIdToPositionPct(vGroupId);

      hSumWX += likeWeight * hPos;
      hSumWX2 += likeWeight * hPos * hPos;

      vSumWX += likeWeight * vPos;
      vSumWX2 += likeWeight * vPos * vPos;
    }

    // ✅ 위치(평균): shrinkage 적용
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

    // ✅ 분산/표준편차: likeWeight 데이터만(=shrinkage 미적용)
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
    };
  }, [
    itemList,
    vertical.itemPositionDict,
    horizontal.itemPositionDict,
    preference.itemPositionDict,
  ]);
};

export default useGetBoardResult;
