import * as S from "./Board.styled";
import * as Title from "@componentsV02/title/Title.styled";

import { type AxisType, type SlotDict } from "@interfacesV02/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
} from "@hooksV02/board/context/context";

import useSwipeBoard from "@componentsV02/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV02/board/swipeBoard/SwipeBoard";

import type { AxisData, BoardAxisDict } from "@interfacesV02/type";

import { getSwipeBoardSubTitle } from "@componentsV02/board/swipeBoard/getSwipeBoardTitle";
import { useMemo } from "react";

const SwipeEvaluationBoard = () => {
  const { vertical, horizontal, boardInformation } = useBoardStaticContext();
  const { evaluationSlot, evaluationGroup, setEvaluationSlot } =
    useBoardSlotContext();

  if (evaluationSlot === undefined || evaluationGroup === undefined) return;

  const dataDict: BoardAxisDict = useMemo(() => {
    return {
      VERTICAL:
        evaluationSlot.VERTICAL !== undefined
          ? {
              startIDX:
                vertical.slotByGroupDict[evaluationGroup.VERTICAL].startSlotIDX,
              endIDX:
                vertical.slotByGroupDict[evaluationGroup.VERTICAL].endSlotIDX,
              ...vertical,
            }
          : undefined,
      HORIZONTAL:
        evaluationSlot.HORIZONTAL !== undefined
          ? {
              startIDX:
                horizontal.slotByGroupDict[evaluationGroup.HORIZONTAL]
                  .startSlotIDX,
              endIDX:
                horizontal.slotByGroupDict[evaluationGroup.HORIZONTAL]
                  .endSlotIDX,
              ...horizontal,
            }
          : undefined,
    };
  }, []);

  const getSlot = (s: SlotDict) => {
    setEvaluationSlot({ VERTICAL: s.VERTICAL, HORIZONTAL: s.HORIZONTAL });
  };

  const {
    dragDirection: direction,
    swipeBoardProps,
    dragAxis,
  } = useSwipeBoard({
    slot: evaluationSlot,
    getSlot: getSlot,
    dataDict: dataDict,
  });

  const getSubTitle = (axis: AxisType, data: AxisData) => {
    const groupID = evaluationGroup[axis];
    const groupSummary = boardInformation.axisDict[axis].groupSummary[groupID];

    return getSwipeBoardSubTitle({
      data,
      slotIDX: evaluationSlot[axis],
      dragDirection: direction[axis],
      icon: groupSummary.groupIcon,
      intensity: groupSummary.intensityLabel,
      groupLabel: groupSummary.groupLabel,
      axisSide: groupSummary.axisSide, // evaluation만
      showGroupLabelInGroupTitle: true,
      labelColorLight: groupSummary.labelColorLight,
      labelColorLighter: groupSummary.labelColorLightest,
    });
  };

  const BoardTitle = () => {
    const vGroup = evaluationGroup.VERTICAL;
    const hGroup = evaluationGroup.HORIZONTAL;

    const vSummary = boardInformation.axisDict.VERTICAL.groupSummary[vGroup];
    const hSummary = boardInformation.axisDict.HORIZONTAL.groupSummary[hGroup];
    return (
      <Title.BoardTitleSubContainer>
        <Title.BoardTitelGroupChip>
          {vSummary.intensityLabel} {vSummary.groupLabel}
          {" · "}
          {hSummary.intensityLabel} {hSummary.groupLabel}
        </Title.BoardTitelGroupChip>

        {/* 상하 */}
        <Title.BoardTitleSubWrapper
          $isSelected={
            (dragAxis === "VERTICAL" || dragAxis === null) &&
            evaluationSlot.VERTICAL !== undefined
          }
        >
          {getSubTitle("VERTICAL", vertical)}
        </Title.BoardTitleSubWrapper>

        {/* 좌우 */}
        <Title.BoardTitleSubWrapper
          $isSelected={
            (dragAxis === "HORIZONTAL" || dragAxis === null) &&
            evaluationSlot.HORIZONTAL !== undefined
          }
        >
          {getSubTitle("HORIZONTAL", horizontal)}
        </Title.BoardTitleSubWrapper>
      </Title.BoardTitleSubContainer>
    );
  };
  return (
    <>
      <Title.BoardTitleContainer>
        <h6>드래그해서 비교할 수 있어요.</h6>
        <h1>같은 그룹에 속한 사람이 있어요</h1>
      </Title.BoardTitleContainer>

      <S.SwipeBoardContainer>
        <BoardTitle />
        <SwipeBoard {...swipeBoardProps} />
      </S.SwipeBoardContainer>
    </>
  );
};

export default SwipeEvaluationBoard;
