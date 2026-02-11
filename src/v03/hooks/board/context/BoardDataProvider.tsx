import { useMemo } from "react";

import {
  BoardStaticContext,
  BoardSlotContext,
  BoardStepContext,
} from "./context";
import { defaultStepPx } from "./constant";
import type { BoardStaticValue, ProviderProps } from "./type";

import useBoardData from "@hooksV03/board/context/useBoardData";
import useBoardSlot from "@hooksV03/board/context/useBoardSlot";
import useBoardStep from "@hooksV03/board/context/useBoardStep";

export const BoardDataProvider = (props: ProviderProps) => {
  const { children, boardInformation } = props;

  const boardSlot = useBoardSlot();
  const boardStep = useBoardStep({});
  const boardData = useBoardData(boardStep.currentItemID);

  const staticValue: BoardStaticValue = useMemo(
    () => ({
      boardInformation,
      stepPX: defaultStepPx,
      ...boardData,
    }),
    [boardInformation, boardData],
  );

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
