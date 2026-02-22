import * as S from "./Board.styled";
import * as Title from "@componentsV03/title/Title.styled";

import { type AxisType, type SlotDict } from "@interfacesV03/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
} from "@hooksV03/board/context/context";

import useSwipeBoard from "@componentsV03/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV03/board/swipeBoard/SwipeBoard";

import type { BoardAxisDict } from "@interfacesV03/type";

import { useMemo } from "react";
import Spacing from "@componentsV03/spacing/Spacing";

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
        startIDX: data.slotByGroupDict[evaluationGroup[axis]].startSlotIDX,
        endIDX: data.slotByGroupDict[evaluationGroup[axis]].endSlotIDX,
        ...data,
      },
    };
  }, [axis]);

  if (dataDict === undefined) return;

  const getSlot = (s: SlotDict) => {
    setEvaluationSlot({ VERTICAL: s.VERTICAL, HORIZONTAL: s.HORIZONTAL });
  };

  const { swipeBoardProps } = useSwipeBoard({
    slot: evaluationSlot,
    getSlot: getSlot,
    dataDict: dataDict,
  });

  const groupID = evaluationGroup[axis];
  const groupSummary = boardInformation.axisDict[axis].groupSummary[groupID];

  return (
    <>
      <Title.BoardTitleContainer>
        {axis === "HORIZONTAL" ? (
          <h6>왼쪽·오른쪽으로 드래그해주세요</h6>
        ) : (
          <h6>위·아래로 드래그해주세요</h6>
        )}
        <h1>{"같은 그룹에 속한 사람과\n비교할 수 있어요"}</h1>
      </Title.BoardTitleContainer>

      <Title.BoardTitelGroupChipWrapper>
        <Title.BoardTitelGroupChip
          $lightColor={groupSummary.labelColorLight}
          $lighterColor={groupSummary.labelColorLightest}
        >
          {groupSummary.groupIcon} {groupSummary.intensityLabel}{" "}
          {groupSummary.groupLabel}
        </Title.BoardTitelGroupChip>
      </Title.BoardTitelGroupChipWrapper>

      <S.SwipeBoardContainer>
        <SwipeBoard {...swipeBoardProps} />
        <Spacing size={40} />
      </S.SwipeBoardContainer>
    </>
  );
};

export default SwipeEvaluationBoard;
