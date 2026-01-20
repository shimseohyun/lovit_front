import { useMemo } from "react";
import type useBoardData from "../useBoardData";
import type { BoardConfig } from "./BoardContext";
import type { Summary } from "../../../type/type";

export type BoardStaticValue = {
  rowData: ReturnType<typeof useBoardData>["rowData"];
  colData: ReturnType<typeof useBoardData>["colData"];
  rowSeparatedData: ReturnType<typeof useBoardData>["rowSeparatedData"];
  colSeparatedData: ReturnType<typeof useBoardData>["colSeparatedData"];
  getIdPosition: ReturnType<typeof useBoardData>["getIdPosition"];
  idPositionMap: ReturnType<typeof useBoardData>["idPositionMap"];
  rowCount: ReturnType<typeof useBoardData>["rowCount"];
  colCount: ReturnType<typeof useBoardData>["colCount"];

  config: BoardConfig;

  rowMinSlot: number;
  rowMaxSlot: number;
  colMinSlot: number;
  colMaxSlot: number;

  // (호환)
  minSlot: number;
  maxSlot: number;

  gridCount: number;
  summaryData: Record<number, Summary>;
};

type Params = {
  summaryData: Record<number, Summary>;
  boardData: ReturnType<typeof useBoardData>;
  mergedConfig: BoardConfig;
};

export function createBoardStaticValue(params: Params): BoardStaticValue {
  const { boardData, mergedConfig, summaryData } = params;
  const {
    rowData,
    colData,
    rowSeparatedData,
    colSeparatedData,
    getIdPosition,
    idPositionMap,
    rowCount,
    colCount,
  } = boardData;

  const rowMinSlot = 0;
  const colMinSlot = 0;
  const rowMaxSlot = Math.max(0, rowData.length);
  const colMaxSlot = Math.max(0, colData.length);

  const minSlot = 0;
  const maxSlot = Math.max(rowMaxSlot, colMaxSlot);

  return {
    rowData,
    colData,
    rowSeparatedData,
    colSeparatedData,
    getIdPosition,
    idPositionMap,
    rowCount,
    colCount,

    config: mergedConfig,

    rowMinSlot,
    rowMaxSlot,
    colMinSlot,
    colMaxSlot,

    minSlot,
    maxSlot,

    gridCount: Math.max(rowData.length, colData.length),
    summaryData,
  };
}

// ✅ Provider를 짧게 만들기 위한 hook 래퍼
export function useBoardStaticValue(params: Params) {
  const { boardData, mergedConfig, summaryData } = params;

  return useMemo(
    () => createBoardStaticValue({ boardData, summaryData, mergedConfig }),
    [
      boardData.rowData,
      boardData.colData,
      boardData.rowSeparatedData,
      boardData.colSeparatedData,
      boardData.getIdPosition,
      boardData.idPositionMap,
      boardData.rowCount,
      boardData.colCount,
      mergedConfig,
    ],
  );
}
