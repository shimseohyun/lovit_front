import { useMemo } from "react";
import type useBoardData from "../useBoardData";
import type { BoardConfig } from "./BoardContext";
import type { Summary } from "@interfaces/type";

export type BoardStaticValue = {
  rowData: ReturnType<typeof useBoardData>["rowData"];
  rowCount: ReturnType<typeof useBoardData>["rowCount"];
  rowSeparatedData: ReturnType<typeof useBoardData>["rowSeparatedData"];
  rowPositionData: ReturnType<typeof useBoardData>["rowPositionData"];

  colData: ReturnType<typeof useBoardData>["colData"];
  colCount: ReturnType<typeof useBoardData>["colCount"];
  colSeparatedData: ReturnType<typeof useBoardData>["rowSeparatedData"];
  colPositionData: ReturnType<typeof useBoardData>["colPositionData"];

  config: BoardConfig;
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
    rowCount,
    rowPositionData,
    rowSeparatedData,
    colCount,
    colPositionData,
    colSeparatedData,
  } = boardData;

  return {
    rowData,
    colData,
    rowCount,
    rowPositionData,
    rowSeparatedData,
    colCount,
    colPositionData,
    colSeparatedData,
    config: mergedConfig,
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
      boardData.rowCount,
      boardData.rowSeparatedData,
      boardData.rowPositionData,

      boardData.colData,
      boardData.colCount,
      boardData.colSeparatedData,
      boardData.colPositionData,

      mergedConfig,
    ],
  );
}
