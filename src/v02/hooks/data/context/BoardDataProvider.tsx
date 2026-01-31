import { useMemo } from "react";

import {
  BoardStaticContext,
  BoardSlotContext,
  BoardStepContext,
} from "./context";
import { defaultBoardSize, defaultStepPx } from "./constant";
import type { BoardStaticValue, ProviderProps } from "./type";

import useBoardData from "@hooksV02/data/board/useBoardData";
import useBoardSlot from "@hooksV02/data/board/useBoardSlot";
import useBoardStep from "../board/useBoardStep";

export const BoardDataProvider = (props: ProviderProps) => {
  const {
    children,
    horizontalRough,
    verticalRough,
    preferenceRough,
    itemSummaryDict = {},
    boardInformation,
  } = props;

  const boardData = useBoardData({
    horizontalRough,
    verticalRough,
    preferenceRough,
  });

  const boardSlot = useBoardSlot();

  const boardStep = useBoardStep({
    setEvaluationSlot: boardSlot.setEvaluationSlot,
    itemListLength: 10,
  });

  // ✅ 정적(혹은 저빈도) 값만
  const staticValue: BoardStaticValue = useMemo(
    () => ({
      boardInformation,
      itemSummaryDict,
      boardSize: defaultBoardSize,
      stepPX: defaultStepPx,
      ...boardData,
    }),
    [boardInformation, itemSummaryDict, boardData],
  );

  // ✅ slot/step은 따로 provider로 분리
  // (가능하면 boardSlot / boardStep도 내부에서 useMemo로 안정화되면 더 좋아요)
  const slotValue = useMemo(() => boardSlot, [boardSlot]);
  const stepValue = useMemo(() => boardStep, [boardStep]);

  return (
    <BoardStaticContext.Provider value={staticValue}>
      <BoardSlotContext.Provider value={slotValue}>
        <BoardStepContext.Provider value={stepValue}>
          {children}
        </BoardStepContext.Provider>
      </BoardSlotContext.Provider>
    </BoardStaticContext.Provider>
  );
};
