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
import pushItemToAxis from "@utilsV02/pushItemToAxis";
import type { EvaluationSlot, PreferenceSlot } from "@interfacesV02/type";

export const BoardDataProvider = (props: ProviderProps) => {
  const { children, boardInformation, checkingItemList = [] } = props;

  const boardSlot = useBoardSlot();

  const boardStep = useBoardStep({
    checkingItemList: checkingItemList,
    setEvaluationSlot: boardSlot.setEvaluationSlot,
  });

  const boardData = useBoardData(boardStep.currentItemID);

  const pushItem = (
    evaluationSlot: EvaluationSlot,
    preferenceSlot: PreferenceSlot,
  ) => {
    if (preferenceSlot.preference === undefined || evaluationSlot === undefined)
      return;

    const p = preferenceSlot.preference;
    const v = evaluationSlot.VERTICAL;
    const h = evaluationSlot.HORIZONTAL;

    const itemID = boardStep.currentItemID;

    pushItemToAxis(itemID, p, "PREFERENCE", boardData.preference);
    pushItemToAxis(itemID, v, "VERTICAL", boardData.vertical);
    pushItemToAxis(itemID, h, "HORIZONTAL", boardData.horizontal);

    boardStep.confrimCurrentStep();

    // boardSlot.resetSlot();
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
