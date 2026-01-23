import { useMemo, useReducer, type PropsWithChildren } from "react";

import type { BoardData, Position, Title } from "../type";
import useBoardData from "../useBoardData";

import { createStrictContext } from "./createStrictContext";
import { boardReducer, initialBoardState } from "./boardState";
import {
  useBoardStaticValue,
  type BoardStaticValue,
} from "./createBoardStaticValue";
import {
  useBoardActionsValue,
  type BoardActionsValue,
} from "./createBoardActions";
import type { Summary } from "@interfaces/type";

export type BoardConfig = {
  screenWidth: number;
  screenHeight: number;
  stepPx: number;
  minDistancePx: number;
};

const DEFAULT_BOARD_CONFIG: BoardConfig = {
  screenWidth: 400,
  screenHeight: 400,
  stepPx: 60,
  minDistancePx: 10,
};

const mergeConfig = (config?: Partial<BoardConfig>): BoardConfig => ({
  ...DEFAULT_BOARD_CONFIG,
  ...config,
});

export type BoardStateValue = {
  slot: Position | undefined;
  title: Title | undefined;
};

const [boardStaticContext, useBoardStatic] =
  createStrictContext<BoardStaticValue>("useBoardStatic");
const [boardStateContext, useBoardState] =
  createStrictContext<BoardStateValue>("useBoardState");
const [boardActionsContext, useBoardActions] =
  createStrictContext<BoardActionsValue>("useBoardActions");

type BoardProviderProps = PropsWithChildren<{
  initialRow: BoardData;
  initialCol: BoardData;
  summaryData: Record<number, Summary>;
  config?: Partial<BoardConfig>;
}>;

export const BoardProvider = ({
  children,
  initialRow,
  initialCol,
  summaryData,
  config,
}: BoardProviderProps) => {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  const boardData = useBoardData({ rowData: initialRow, colData: initialCol });
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);

  const staticValue = useBoardStaticValue({
    boardData,
    summaryData,
    mergedConfig,
  });
  const actionsValue = useBoardActionsValue({ boardData, dispatch });
  const stateValue = useMemo(
    () => ({ slot: state.slot, title: state.title }),
    [state.slot, state.title],
  );

  return (
    <boardStaticContext.Provider value={staticValue}>
      <boardActionsContext.Provider value={actionsValue}>
        <boardStateContext.Provider value={stateValue}>
          {children}
        </boardStateContext.Provider>
      </boardActionsContext.Provider>
    </boardStaticContext.Provider>
  );
};

export { useBoardStatic, useBoardState, useBoardActions };

export const useBoard = () => ({
  ...useBoardStatic(),
  ...useBoardState(),
  ...useBoardActions(),
});
