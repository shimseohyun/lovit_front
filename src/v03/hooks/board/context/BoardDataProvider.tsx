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
import { BOARD_INFO_DICT } from "@dataV03/boardInformation";

export const BoardDataProvider = (props: ProviderProps) => {
  const { children, boardID, groupID } = props;
  const { boardInformation, itemSummaryDict } = BOARD_INFO_DICT[boardID];

  const boardSlot = useBoardSlot();
  const boardStep = useBoardStep({ boardID, groupID });
  const boardData = useBoardData(boardStep.currentItemID, boardID, groupID);

  const staticValue: BoardStaticValue = useMemo(
    () => ({
      boardID,
      groupID,
      boardInformation,
      itemSummaryDict,
      stepPX: defaultStepPx,
      ...boardData,
    }),
    [boardData],
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
