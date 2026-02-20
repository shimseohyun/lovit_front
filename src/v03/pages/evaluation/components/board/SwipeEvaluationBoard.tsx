import * as S from "./Board.styled";
import * as Title from "@componentsV03/title/Title.styled";

import { type AxisType, type SlotDict } from "@interfacesV03/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
} from "@hooksV03/board/context/context";

import useSwipeBoard from "@componentsV03/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV03/board/swipeBoard/SwipeBoard";

import type { AxisData, BoardAxisDict } from "@interfacesV03/type";

import { getSwipeBoardSubTitle } from "@componentsV03/board/swipeBoard/getSwipeBoardTitle";
import { useMemo } from "react";

type Parms = { axis: AxisType };
const SwipeEvaluationBoard = (parms: Parms) => {
  const { axis } = parms;
  const { vertical, horizontal, boardInformation } = useBoardStaticContext();
  const { evaluationSlot, evaluationGroup, setEvaluationSlot } =
    useBoardSlotContext();

  const data = axis === "VERTICAL" ? vertical : horizontal;

  if (evaluationSlot === undefined || evaluationGroup === undefined) return;

  const dataDict: BoardAxisDict | undefined = useMemo(() => {
    return {
      [axis]: {
        startIDX: data.slotByGroupDict[evaluationGroup.VERTICAL].startSlotIDX,
        endIDX: data.slotByGroupDict[evaluationGroup.VERTICAL].endSlotIDX,
        ...data,
      },
    };
  }, [axis]);

  if (dataDict === undefined) return;

  const getSlot = (s: SlotDict) => {
    setEvaluationSlot({ VERTICAL: s.VERTICAL, HORIZONTAL: s.HORIZONTAL });
  };

  const { dragDirection: direction, swipeBoardProps } = useSwipeBoard({
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
    const groupID = evaluationGroup[axis];

    const groupSummary = boardInformation.axisDict[axis].groupSummary[groupID];

    return (
      <Title.BoardTitleSubContainer>
        <Title.BoardTitelGroupChip>
          {groupSummary.intensityLabel} {groupSummary.groupLabel}
        </Title.BoardTitelGroupChip>

        <Title.BoardTitleSubWrapper $isSelected={true}>
          {getSubTitle(axis, data)}
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
