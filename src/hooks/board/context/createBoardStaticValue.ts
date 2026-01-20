import { useMemo } from "react";
import type useBoardData from "../useBoardData";
import type { BoardConfig } from "./BoardContext";
import type { Summary } from "../../../type/type";

export type BoardStaticValue = {
  rowData: ReturnType<typeof useBoardData>["rowData"];
  colData: ReturnType<typeof useBoardData>["colData"];
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
  const { rowData, colData } = boardData;

  return {
    rowData,
    colData,
    config: mergedConfig,
    summaryData,
  };
}

// ✅ Provider를 짧게 만들기 위한 hook 래퍼
export function useBoardStaticValue(params: Params) {
  const { boardData, mergedConfig, summaryData } = params;

  return useMemo(
    () => createBoardStaticValue({ boardData, summaryData, mergedConfig }),
    [boardData.rowData, boardData.colData, mergedConfig],
  );
}
