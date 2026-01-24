export type Point = {
  id: number;
  x: number;
  y: number;
};
// Board domain types
export type Step = "BOARD" | "LIKED" | "RESULT";

// NOTE: 보드 도메인은 "스와이프 훅" 구현(폴더 구조/import 경로)에 종속되지 않도록
// axis / direction 을 문자열 리터럴 유니온으로 로컬 정의합니다.
export type SwipeAxis = "horizontal" | "vertical";
export type SwipeDirection = "left" | "right" | "up" | "down";

export type BoardData = number[];
export type SeparatedBoardData = number[][];

type BoardPosition = { group: number; idx: number };
export type BoardPositionData = Record<number, BoardPosition>;

export type PositionMode = "group" | "slot";

export type Position = {
  r: number;
  c: number;
  mode?: PositionMode; // default: "group"
};

export type SwipeData = {
  axis: SwipeAxis;
  direction: SwipeDirection;
  slotNum: number;
};

export type Title = {
  comparisonID?: number;
  comparisonLabel?: string;
  groupName?: string;
};
