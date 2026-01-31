import { useMemo } from "react";

import { BoardStaticContext } from "./context";

import { defaultBoardSize, defaultStepPx } from "./constant";

import type { BoardStaticValue, ProviderProps } from "./type";

import useBoardData from "@hooksV02/data/board/useBoardData";
import useEvaluationSlot from "@hooksV02/data/board/useEvaluationSlot";
import useBoardStep from "../board/useBoardStep";

export const BoardDataProvider = (props: ProviderProps) => {
  const {
    children,
    horizontalRough,
    verticalRough,
    preferenceRough,
    itemSummaryDict = {},
  } = props;

  const boardData = useBoardData({
    horizontalRough,
    verticalRough,
    preferenceRough,
  });
  const evaluationSlot = useEvaluationSlot();

  const boardStep = useBoardStep({
    setEvaluationSlot: evaluationSlot.setEvaluationSlot,
    itemListLength: 10,
  });

  const staticValue: BoardStaticValue = useMemo(
    () => ({
      itemSummaryDict: itemSummaryDict,
      boardSize: defaultBoardSize,
      stepPX: defaultStepPx,
      ...boardData,
      ...evaluationSlot,
      ...boardStep,
    }),
    [itemSummaryDict, boardData],
  );

  return (
    <BoardStaticContext.Provider value={staticValue}>
      {children}
    </BoardStaticContext.Provider>
  );
};
