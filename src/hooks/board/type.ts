// Board domain types

// NOTE: 보드 도메인은 "스와이프 훅" 구현(폴더 구조/import 경로)에 종속되지 않도록
// axis / direction 을 문자열 리터럴 유니온으로 로컬 정의합니다.
export type SwipeAxis = "horizontal" | "vertical";
export type SwipeDirection = "left" | "right" | "up" | "down";

export type BoardData = number[];
export type SeparatedBoardData = number[][];

export type PositionMode = "group" | "slot";

export type Position = {
  r: number;
  c: number;
  mode?: PositionMode; // default: "group"
};

// ✅ 기존 typo(soltNum)도 같이 지원하려면 외부에서 별도 변환해 주세요.
export type Description = {
  axis: SwipeAxis;
  direction: SwipeDirection;
  slotNum: number;
};
