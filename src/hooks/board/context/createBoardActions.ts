import { useCallback, useMemo } from "react";
import type useBoardData from "../useBoardData";
import type { Description, Position } from "../type";
import { deriveTitle } from "./boardDomain";
import type { BoardAction } from "./boardState";

type Dispatch = (action: BoardAction) => void;

export type BoardActionsValue = {
  setInitialSlot: (p: Position) => void;
  setSlot: (p: Position) => void;
  setTitle: (d: Description) => void;
  reset: () => void;
};

type Params = {
  boardData: ReturnType<typeof useBoardData>;
  dispatch: Dispatch;
};

export function createBoardActions(params: Params): BoardActionsValue {
  const { boardData, dispatch } = params;

  return {
    setInitialSlot: (group: Position) => {
      const {
        rowSeparatedData,
        colSeparatedData,
        getRowCenterSlot,
        getColCenterSlot,
      } = boardData;

      if (rowSeparatedData.length === 0 || colSeparatedData.length === 0)
        return;

      const rGroup = Math.max(
        0,
        Math.min(group.r, rowSeparatedData.length - 1),
      );
      const cGroup = Math.max(
        0,
        Math.min(group.c, colSeparatedData.length - 1),
      );

      dispatch({
        type: "SET_SLOT",
        payload: { r: getRowCenterSlot(rGroup), c: getColCenterSlot(cGroup) },
      });
    },

    setSlot: (p: Position) => {
      dispatch({ type: "SET_SLOT", payload: p });
    },

    setTitle: (d: Description) => {
      const nextTitle = deriveTitle(d, {
        rowData: boardData.rowData,
        colData: boardData.colData,
        rowSlotToGroup: boardData.rowSlotToGroup,
        colSlotToGroup: boardData.colSlotToGroup,
      });

      if (!nextTitle) return;
      dispatch({ type: "SET_TITLE", payload: nextTitle });
    },

    reset: () => {
      dispatch({ type: "RESET" });
    },
  };
}

// ✅ Provider를 짧게 만들기 위한 hook 래퍼 (콜백 안정화)
export function useBoardActionsValue(params: Params): BoardActionsValue {
  const { boardData, dispatch } = params;

  const setInitialSlot = useCallback(
    (group: Position) => {
      if (
        boardData.rowSeparatedData.length === 0 ||
        boardData.colSeparatedData.length === 0
      )
        return;

      const rGroup = Math.max(
        0,
        Math.min(group.r, boardData.rowSeparatedData.length - 1),
      );
      const cGroup = Math.max(
        0,
        Math.min(group.c, boardData.colSeparatedData.length - 1),
      );

      dispatch({
        type: "SET_SLOT",
        payload: {
          r: boardData.getRowCenterSlot(rGroup),
          c: boardData.getColCenterSlot(cGroup),
        },
      });
    },
    [
      boardData.rowSeparatedData.length,
      boardData.colSeparatedData.length,
      boardData.getRowCenterSlot,
      boardData.getColCenterSlot,
      dispatch,
    ],
  );

  const setSlot = useCallback(
    (p: Position) => dispatch({ type: "SET_SLOT", payload: p }),
    [dispatch],
  );

  const setTitle = useCallback(
    (d: Description) => {
      const nextTitle = deriveTitle(d, {
        rowData: boardData.rowData,
        colData: boardData.colData,
        rowSlotToGroup: boardData.rowSlotToGroup,
        colSlotToGroup: boardData.colSlotToGroup,
      });

      if (!nextTitle) return;
      dispatch({ type: "SET_TITLE", payload: nextTitle });
    },
    [
      boardData.rowData,
      boardData.colData,
      boardData.rowSlotToGroup,
      boardData.colSlotToGroup,
      dispatch,
    ],
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);

  return useMemo(
    () => ({ setInitialSlot, setSlot, setTitle, reset }),
    [setInitialSlot, setSlot, setTitle, reset],
  );
}
