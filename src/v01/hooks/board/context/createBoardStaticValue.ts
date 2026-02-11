import { useMemo } from "react";
import type useBoardData from "../useBoardData";
import type { BoardConfig } from "./BoardContext";
import type { Summary } from "@interfacesV01/type";

export type BoardStaticValue = {
  verticalData: ReturnType<typeof useBoardData>["verticalData"];
  verticalCount: ReturnType<typeof useBoardData>["verticalCount"];
  verticalSeparatedData: ReturnType<
    typeof useBoardData
  >["verticalSeparatedData"];
  verticalPositionData: ReturnType<typeof useBoardData>["verticalPositionData"];

  horizontalData: ReturnType<typeof useBoardData>["horizontalData"];
  horizontalCount: ReturnType<typeof useBoardData>["horizontalCount"];
  horizontalSeparatedData: ReturnType<
    typeof useBoardData
  >["verticalSeparatedData"];
  horizontalPositionData: ReturnType<
    typeof useBoardData
  >["horizontalPositionData"];

  points: ReturnType<typeof useBoardData>["points"];
  getPoints: ReturnType<typeof useBoardData>["getPoints"];

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
    verticalData,
    horizontalData,
    verticalCount,
    verticalPositionData,
    verticalSeparatedData,
    horizontalCount,
    horizontalPositionData,
    horizontalSeparatedData,
    points,
    getPoints,
  } = boardData;

  return {
    verticalData,
    horizontalData,
    verticalCount,
    verticalPositionData,
    verticalSeparatedData,
    horizontalCount,
    horizontalPositionData,
    horizontalSeparatedData,
    config: mergedConfig,
    points,
    getPoints,
    summaryData,
  };
}

// ✅ Provider를 짧게 만들기 위한 hook 래퍼
export function useBoardStaticValue(params: Params) {
  const { boardData, mergedConfig, summaryData } = params;

  return useMemo(
    () => createBoardStaticValue({ boardData, summaryData, mergedConfig }),
    [
      boardData.verticalData,
      boardData.verticalCount,
      boardData.verticalSeparatedData,
      boardData.verticalPositionData,

      boardData.horizontalData,
      boardData.horizontalCount,
      boardData.horizontalSeparatedData,
      boardData.horizontalPositionData,

      mergedConfig,
    ],
  );
}
