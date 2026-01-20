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

const DEFAULT_BOARD_CONFIG: BoardConfig = {
  screenWidth: 400,
  screenHeight: 400,
  stepPx: 100,
  minDistancePx: 10,
};

const mergeConfig = (config?: Partial<BoardConfig>): BoardConfig => ({
  ...DEFAULT_BOARD_CONFIG,
  ...config,
});

// ✅ 거의 안 바뀌는 값들
type BoardStaticValue = {
  rowData: BoardData;
  colData: BoardData;
  rowSeparatedData: SeparatedBoardData;
  colSeparatedData: SeparatedBoardData;
  getIdPosition: ReturnType<typeof useBoardData>["getIdPosition"];
  rowCount: number[];
  colCount: number[];

  config: BoardConfig;

  // ✅ axis별 슬롯 범위(권장)
  rowMinSlot: number;
  rowMaxSlot: number;
  colMinSlot: number;
  colMaxSlot: number;

  // ✅ (호환) 예전 코드가 min/max만 쓰는 경우
  minSlot: number;
  maxSlot: number;

  // ✅ 유틸
  gridCount: number;
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

  const mergedConfig = useMemo(() => mergeConfig(config), [config]);

  const {
    rowData,
    colData,

    rowSeparatedData,
    colSeparatedData,
    rowSlotToGroup,
    colSlotToGroup,
    rowCount,
    colCount,

    getIdPosition,
    getCenterSlot,
  } = useBoardData({
    rowData: initialRow,
    colData: initialCol,
  });

  const [slot, setSlotState] = useState<Position>();
  const [title, setTitleState] = useState<string>();

  const setInitialSlot = useCallback(
    (group: Position) => {
      if (rowSeparatedData.length === 0 || colSeparatedData.length === 0)
        return;

      // group.r / group.c 가 범위를 벗어나도 안전하게 보정
      const rGroup = Math.max(
        0,
        Math.min(group.r, rowSeparatedData.length - 1),
      );
      const cGroup = Math.max(
        0,
        Math.min(group.c, colSeparatedData.length - 1),
      );

      setSlotState({
        r: getCenterSlot(rGroup, rowSeparatedData),
        c: getCenterSlot(cGroup, colSeparatedData),
      });
    },
    [getCenterSlot, rowSeparatedData, colSeparatedData],
  );

  const setSlot = useCallback((p: Position) => {
    setSlotState(p);
  }, []);

  const setTitle = useCallback(
    (d: Description) => {
      const { axis, direction } = d;

      // move 방향에 따라 "기준이 되는" slot을 맞춰줌
      let slotNum = d.slotNum;
      if (direction === "left" || direction === "up") slotNum -= 1;

      // ✅ FIX: vertical 이동은 rowData(상업/예술), horizontal 이동은 colData(팝콘/여운)
      const isVertical = axis === "vertical";
      const axisData = isVertical ? rowData : colData;
      const axisSlotToGroup = isVertical ? rowSlotToGroup : colSlotToGroup;

      if (slotNum < 0 || slotNum >= axisData.length) return;

      const groupId = axisSlotToGroup[slotNum];
      const value = axisData[slotNum];
      if (typeof groupId !== "number" || typeof value !== "number") return;

      const nextTitle = getTitle(value, groupId, direction);
      if (nextTitle === "") return;
      setTitleState(nextTitle);
    },
    [rowData, colData, rowSlotToGroup, colSlotToGroup],
  );

  const reset = useCallback(() => {
    setSlotState(undefined);
    setTitleState(undefined);
  }, []);

  const rowMinSlot = 0;
  const colMinSlot = 0;
  const rowMaxSlot = Math.max(0, rowData.length - 1);
  const colMaxSlot = Math.max(0, colData.length - 1);

  // (호환) 예전 코드가 min/max만 쓰는 경우, 큰 쪽 기준으로 제공
  const minSlot = 0;
  const maxSlot = Math.max(rowMaxSlot, colMaxSlot);

  const staticValue = useMemo<BoardStaticValue>(
    () => ({
      rowData,
      colData,
      rowSeparatedData,
      colSeparatedData,
      getIdPosition,
      rowCount,
      colCount,
      config: mergedConfig,

      rowMinSlot,
      rowMaxSlot,
      colMinSlot,
      colMaxSlot,

      minSlot,
      maxSlot,

      gridCount: colData.length,
    }),
    [
      rowData,
      colData,
      rowSeparatedData,
      colSeparatedData,
      getIdPosition,
      rowCount,
      colCount,
      mergedConfig,
      rowMinSlot,
      rowMaxSlot,
      colMinSlot,
      colMaxSlot,
      minSlot,
      maxSlot,
    ],
  );

  const stateValue = useMemo<BoardStateValue>(
    () => ({
      slot,
      title,
    }),
    [slot, title],
  );

  const actionsValue = useMemo<BoardActionsValue>(
    () => ({
      setInitialSlot,
      setSlot,
      setTitle,
      reset,
    }),
    [setInitialSlot, setSlot, setTitle, reset],
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
