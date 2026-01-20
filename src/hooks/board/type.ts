import type { SwipeAxis, SwipeDirection } from "../../hooks/swipe/type";

export type BoardData = number[];
export type SeparatedBoardData = number[][];

export type PositionMode = "group" | "slot";

export type Position = {
  r: number;
  c: number;
  mode?: PositionMode; // default: "group"
};

// ✅ 기존 typo(soltNum)도 같이 지원
export type Description = {
  axis: SwipeAxis;
  direction: SwipeDirection;
  slotNum: number;
};
