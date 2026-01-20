import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type {
  BoardData,
  Description,
  Position,
  SeparatedBoardData,
} from "./type";

import useBoardData from "./useBoardData";
import { getTitle } from "./useBoardDescription";

export type BoardConfig = {
  screenWidth: number;
  screenHeight: number;
  stepPx: number;
  minDistancePx: number;
};

// ✅ 거의 안 바뀌는 값들
type BoardStaticValue = {
  rowData: BoardData;
  colData: BoardData;
  rowSeparatedData: SeparatedBoardData;
  colSeparatedData: SeparatedBoardData;
  getIdPosition: ReturnType<typeof useBoardData>["getIdPosition"];
  rowCount: number[];
  colCount: number[];

  minSlot: number;
  maxSlot: number;
  config: BoardConfig;
};

// ✅ 자주 바뀌는 값들(구독 대상)
type BoardStateValue = {
  slot: Position | undefined;
  title: string | undefined;
};

// ✅ 액션들
type BoardActionsValue = {
  setInitialSlot: (p: Position) => void;
  setSlot: (p: Position) => void;
  setTitle: (d: Description) => void;
  reset: () => void;
};

const boardStaticContext = createContext<BoardStaticValue | null>(null);
const boardStateContext = createContext<BoardStateValue | null>(null);
const boardActionsContext = createContext<BoardActionsValue | null>(null);

type BoardProviderProps = PropsWithChildren<{
  initialRow: BoardData;
  initialCol: BoardData;
  config?: Partial<BoardConfig>;
}>;

export const BoardProvider = (props: BoardProviderProps) => {
  const { children, initialRow, initialCol, config } = props;

  const [slot, setSlotState] = useState<Position>();

  const [title, setTitleState] = useState<string>();

  const setInitialSlot = useCallback((group: Position) => {
    setSlotState({
      r: getCenterSlot(group.r, rowSeparatedData),
      c: getCenterSlot(group.c, colSeparatedData),
    });
  }, []);

  const setSlot = useCallback((p: Position) => {
    setSlotState({ ...p });
  }, []);

  const setTitle = useCallback((d: Description) => {
    let groupID: number;
    let slotNum = d.slotNum;

    let value;
    if (d.direction == "left" || d.direction == "up") {
      slotNum = slotNum - 1;
    }

    if (d.axis === "vertical") {
      groupID = colSlotToGroup[slotNum];
      value = colData[slotNum];
    } else {
      groupID = rowSlotToGroup[slotNum];
      value = rowData[slotNum];
    }
    const newTitle = getTitle(value, groupID, d.direction);
    if (newTitle === "") return;
    setTitleState(newTitle);
  }, []);

  const reset = useCallback(() => {
    setSlotState(undefined);
    setTitleState(undefined);
  }, []);

  const mergedConfig: BoardConfig = useMemo(
    () => ({
      screenWidth: 400,
      screenHeight: 400,
      stepPx: 100,
      minDistancePx: 10,
      ...config,
    }),
    [config],
  );

  const {
    rowData,
    colData,

    rowSeparatedData,
    colSeparatedData,
    colSlotToGroup,
    rowSlotToGroup,
    rowCount,
    colCount,

    getIdPosition,
    getCenterSlot,
  } = useBoardData({
    rowData: initialRow,
    colData: initialCol,
  });

  const staticValue = useMemo<BoardStaticValue>(
    () => ({
      rowData: rowData,
      colData: colData,
      colCount: colCount,
      rowCount: rowCount,
      rowSeparatedData: rowSeparatedData,
      colSeparatedData: colSeparatedData,
      getIdPosition,
      config: mergedConfig,
      minSlot: 0,
      maxSlot: rowData.length,
    }),
    [initialRow, initialCol, mergedConfig],
  );

  const stateValue = useMemo<BoardStateValue>(
    () => ({
      rowData,
      colData,
      slot,
      title,
      gridCount: colData.length,
    }),
    [rowData, colData, slot, title],
  );

  const actionsValue = useMemo<BoardActionsValue>(
    () => ({
      setInitialSlot,
      setSlot,
      setTitle,
      reset,
    }),
    [setSlot, setTitle, reset],
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

export const useBoardStatic = () => {
  const ctx = useContext(boardStaticContext);
  if (!ctx) throw new Error("useBoardStatic must be used within BoardProvider");
  return ctx;
};

export const useBoardState = () => {
  const ctx = useContext(boardStateContext);
  if (!ctx) throw new Error("useBoardState must be used within BoardProvider");
  return ctx;
};

export const useBoardActions = () => {
  const ctx = useContext(boardActionsContext);
  if (!ctx)
    throw new Error("useBoardActions must be used within BoardProvider");
  return ctx;
};

// (옵션) 기존 코드 유지용
export const useBoard = () => ({
  ...useBoardStatic(),
  ...useBoardState(),
  ...useBoardActions(),
});
