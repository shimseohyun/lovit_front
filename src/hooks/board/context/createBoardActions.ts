import { useCallback, useMemo } from "react";
import type useBoardData from "@hooks/board/useBoardData";
import type { SwipeData, Position } from "@hooks/board/type";

import { deriveTitle } from "./boardDomain";
import type { BoardAction } from "./boardState";

type Dispatch = (action: BoardAction) => void;

export type BoardActionsValue = {
  setSlot: (p: Position) => void;
  setTitle: (d: SwipeData) => void;
  setLike: (id: number, like: boolean) => void;
  reset: () => void;
};

type Params = {
  boardData: ReturnType<typeof useBoardData>;
  dispatch: Dispatch;
};

// ✅ Provider를 짧게 만들기 위한 hook 래퍼 (콜백 안정화)
export function useBoardActionsValue(params: Params): BoardActionsValue {
  const { boardData, dispatch } = params;

  const setSlot = useCallback(
    (p: Position) => dispatch({ type: "SET_SLOT", payload: p }),
    [dispatch],
  );

  const setTitle = useCallback(
    (d: SwipeData) => {
      const nextTitle = deriveTitle(d, {
        verticalData: boardData.verticalData,
        horizontalData: boardData.horizontalData,
        verticalPositionData: boardData.verticalPositionData,
        horizontalPositionData: boardData.horizontalPositionData,
      });

      if (!nextTitle) return;
      dispatch({ type: "SET_TITLE", payload: nextTitle });
    },
    [
      boardData.verticalData,
      boardData.horizontalData,

      boardData.horizontalPositionData,
      boardData.verticalPositionData,
      dispatch,
    ],
  );

  const setLike = useCallback(
    (id: number, liked: boolean) =>
      dispatch({ type: "SET_LIKE", payload: { id, liked } }),
    [dispatch],
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);

  return useMemo(
    () => ({ setSlot, setTitle, reset, setLike }),
    [setSlot, setTitle, reset, setLike],
  );
}
