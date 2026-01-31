export type AxisType = "HORIZONTAL" | "VERTICAL";
export type DirectionType = "END" | "START";

export const emptyDirection: BoardDirection = {
  HORIZONTAL: null,
  VERTICAL: null,
};

export type BoardDirection = Record<AxisType, DirectionType | null>;

export type EvaluationSlot = Record<AxisType, number>;

export type PreferenceSlot = { preference: number };

export type SlotDict = Partial<Record<AxisType, number>>;
