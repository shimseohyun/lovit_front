import * as S from "./Board.styled";

import { type AxisType, type SlotDict } from "@interfacesV02/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
} from "@hooksV02/board/context/context";

import useSwipeBoard from "@componentsV02/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV02/board/swipeBoard/SwipeBoard";
import { getItemSummary } from "@dataV02/itemSummary";
import type { AxisData } from "@interfacesV02/type";
import { useEffect, useState } from "react";
import Spacing from "@componentsV02/spacing/Spacing";

const SwipeEvaluationBoard = () => {
  const { vertical, horizontal, boardInformation } = useBoardStaticContext();
  const { evaluationSlot, setEvaluationSlot } = useBoardSlotContext();

  const [onboarding, setOnBoarding] = useState<AxisType | undefined>(undefined);

  const ONBOARDING_STEP_MS = 1400;

  useEffect(() => {
    let timerID: number | null = null;
    let isCanceled = false;

    const onboardingAxisList: AxisType[] = [];
    if (!evaluationSlot) return;

    if (vertical.slotDict[evaluationSlot.VERTICAL].slotType !== "CENTER_LABEL")
      onboardingAxisList.push("VERTICAL");

    if (
      horizontal.slotDict[evaluationSlot.HORIZONTAL].slotType !== "CENTER_LABEL"
    )
      onboardingAxisList.push("HORIZONTAL");

    const run = (idx: number) => {
      if (isCanceled) return;
      if (idx >= onboardingAxisList.length) {
        setOnBoarding(undefined);
        return;
      }
      setOnBoarding(onboardingAxisList[idx]);
      timerID = window.setTimeout(() => run(idx + 1), ONBOARDING_STEP_MS);
    };

    run(0);

    return () => {
      isCanceled = true;
      if (timerID !== null) window.clearTimeout(timerID);
    };
  }, []);

  if (evaluationSlot === undefined) return;

  const getSlot = (s: SlotDict) => {
    if (s.VERTICAL === undefined || s.HORIZONTAL === undefined) return;
    setEvaluationSlot({ VERTICAL: s.VERTICAL, HORIZONTAL: s.HORIZONTAL });
  };

  const {
    dragDirection: direction,
    swipeBoardProps,
    dragAxis: realDragAxis,
  } = useSwipeBoard({
    slot: evaluationSlot,
    getSlot: getSlot,
    dataDict: {
      VERTICAL: vertical,
      HORIZONTAL: horizontal,
    },
  });

  const dragAxis = onboarding === undefined ? realDragAxis : onboarding;
  const getSubTitle = (axis: AxisType, data: AxisData) => {
    const slotIDX = evaluationSlot[axis];

    const slotID = data.slotList[slotIDX];
    const slot = data.slotDict[slotID];

    const slotType = slot.slotType;
    const groupSummary =
      boardInformation.axisDict[axis].groupSummary[slot.userAxisGroupID];

    // 아이콘 - 그룹명 조합
    const icon = groupSummary.groupIcon;
    const groupLabel = groupSummary.groupLabel;

    const dragDirection = direction[axis];

    // 그룹 라벨만 출력
    if (
      slotType === "CENTER_LABEL" ||
      (dragDirection === "END" && slotType === "START_LABEL") ||
      (dragDirection === "START" && slotType === "END_LABEL")
    ) {
      return renderGroupTitle({
        icon: icon,
        intensity: groupSummary.intensityLabel,
        group: groupLabel,
      });
    }

    // 비교해야함
    if (
      slotType === "BETWEEN" ||
      (dragDirection === "START" && slotType === "START_LABEL") ||
      (dragDirection === "END" && slotType === "END_LABEL")
    ) {
      const d = dragDirection === "END" ? -1 : 1;
      const a = groupSummary.axisSide === "END" ? -1 : 1;

      const comparisonItemID = getComparisonItem(data, slotIDX + d) ?? 0;
      const comparisonLabel = d * a === 1 ? "더" : "덜";

      return renderComparisonTitle({
        comparison: getItemSummary(comparisonItemID).name,
        icon: icon,
        abs: comparisonLabel,
        group: groupLabel,
      });
    }

    // 아이템 리스트
    if (slotType === "ITEM_LIST") {
      const comparisonItemID = getComparisonItem(data, slotIDX) ?? 0;

      return renderSameTitle({
        comparison: getItemSummary(comparisonItemID).name,
        icon: icon,
        group: groupLabel,
      });
    }
  };

  const Title = () => {
    return (
      <S.BoardTitleContainer>
        <S.BoardTitleDescription>
          {`드래그해서 비교할 수 있어요.`}
        </S.BoardTitleDescription>
        <S.BoardTitleMain>같은 그룹에 속한 사람이 있어요</S.BoardTitleMain>
      </S.BoardTitleContainer>
    );
  };

  const BoardTitle = () => {
    return (
      <S.BoardTitleSubContainer>
        {/* 상하 */}
        <S.BoardTitleSubWrapper
          $isSelected={dragAxis === "VERTICAL" || dragAxis === null}
        >
          {getSubTitle("VERTICAL", vertical)}
        </S.BoardTitleSubWrapper>
        <Spacing size={8} />
        {/* 좌우 */}
        <S.BoardTitleSubWrapper
          $isSelected={dragAxis === "HORIZONTAL" || dragAxis === null}
        >
          {getSubTitle("HORIZONTAL", horizontal)}
        </S.BoardTitleSubWrapper>
      </S.BoardTitleSubContainer>
    );
  };
  return (
    <>
      <Title />

      <S.SwipeBoardContainer>
        <BoardTitle />
        <SwipeBoard onboarding={onboarding} {...swipeBoardProps} />
      </S.SwipeBoardContainer>
    </>
  );
};

export default SwipeEvaluationBoard;

const getComparisonItem = (data: AxisData, comparisonSlotIDX: number) => {
  const comparisonSlotID = data.slotList[comparisonSlotIDX];
  const comparisonSlot = data.slotDict[comparisonSlotID];
  const bundleID = comparisonSlot.userAxisBundleID;

  if (bundleID === undefined) return;

  const itemList = data.bundleDict[bundleID].itemList;
  const comparisonItemID =
    data.itemPositionDict[itemList[itemList.length - 1]].itemSummaryID;

  return comparisonItemID;
};

// "[그룹]"
const renderGroupTitle = (parms: {
  icon: string;
  intensity: string;
  group: string;
}) => {
  const { icon, intensity, group } = parms;
  return (
    <>
      <S.BoardTitleSubChip>
        {icon} {intensity} {group}
      </S.BoardTitleSubChip>
    </>
  );
};

// "[아이템] 보다 [덜/더] [그룹]"
const renderComparisonTitle = (parms: {
  comparison: string;
  icon: string;
  abs: string;
  group: string;
}) => {
  const { comparison, icon, abs, group } = parms;
  return (
    <>
      <S.BoardTitleSubChip>{comparison}</S.BoardTitleSubChip>
      <span>보다</span>
      <S.BoardTitleSubChip>
        {icon} {abs} {group}
      </S.BoardTitleSubChip>
    </>
  );
};

// "[아이템] 만큼 [그룹]"
const renderSameTitle = (parms: {
  comparison: string;
  icon: string;
  group: string;
}) => {
  const { comparison, icon, group } = parms;

  return (
    <>
      <S.BoardTitleSubChip>{comparison}</S.BoardTitleSubChip>
      <span>만큼</span>
      <S.BoardTitleSubChip>
        {icon} {group}
      </S.BoardTitleSubChip>
    </>
  );
};
