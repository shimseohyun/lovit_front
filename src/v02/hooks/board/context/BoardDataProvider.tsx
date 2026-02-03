import { useMemo } from "react";

import {
  BoardStaticContext,
  BoardSlotContext,
  BoardStepContext,
} from "./context";
import { defaultStepPx } from "./constant";
import type { BoardStaticValue, ProviderProps } from "./type";

import useBoardData from "@hooksV02/board/context/useBoardData";
import useBoardSlot from "@hooksV02/board/context/useBoardSlot";
import useBoardStep from "@hooksV02/board/context/useBoardStep";

import useViewport from "@hooksV02/useViewPort";

export const BoardDataProvider = (props: ProviderProps) => {
  const { children, boardInformation, checkingItemList = [] } = props;

  const boardSlot = useBoardSlot();

  const boardStep = useBoardStep({
    checkingItemList: checkingItemList,
  });

  const boardData = useBoardData(boardStep.currentItemID);

  const size = useViewport();

  const staticValue: BoardStaticValue = useMemo(
    () => ({
      boardInformation,

      boardSize: size.width,
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
