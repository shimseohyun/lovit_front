import { useMemo } from "react";

import {
  BoardStaticContext,
  BoardSlotContext,
  BoardStepContext,
} from "./context";
import { defaultStepPx } from "./constant";
import type { BoardStaticValue, ProviderProps } from "./type";

import useBoardData from "@hooksV02/board/useBoardData";
import useBoardSlot from "@hooksV02/board/useBoardSlot";
import useBoardStep from "@hooksV02/board/useBoardStep";

import useViewport from "@hooksV02/useViewPort";

export const BoardDataProvider = (props: ProviderProps) => {
  const {
    children,
    horizontalRough,
    verticalRough,
    preferenceRough,
    boardInformation,

    checkingItemList = [],
  } = props;

  const boardData = useBoardData({
    horizontalRough,
    verticalRough,
    preferenceRough,
    boardInformation,
  });

  const boardSlot = useBoardSlot();

  const boardStep = useBoardStep({
    checkingItemList: checkingItemList,
    setEvaluationSlot: boardSlot.setEvaluationSlot,
  });

  const pushItem = () => {
    if (
      boardSlot.preferenceSlot?.preference === undefined ||
      boardSlot.evaluationSlot === undefined
    )
      return;

    const p = boardSlot.preferenceSlot.preference;
    const v = boardSlot.evaluationSlot.VERTICAL;
    const h = boardSlot.evaluationSlot.HORIZONTAL;

    const itemID = boardStep.currentItemID;
    boardData.preference.pushItem(itemID, p);
    boardData.vertical.pushItem(itemID, v);
    boardData.horizontal.pushItem(itemID, h);
  };

  const size = useViewport();

  // ✅ 정적(혹은 저빈도) 값만
  const staticValue: BoardStaticValue = useMemo(
    () => ({
      boardInformation,

      boardSize: size.width,
      stepPX: defaultStepPx,
      pushItem,
      ...boardData,
    }),
    [boardInformation, boardData],
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
