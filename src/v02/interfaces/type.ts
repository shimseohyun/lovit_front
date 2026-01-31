export type AxisType = "HORIZONTAL" | "VERTICAL";
export type DirectionType = "END" | "START" | null;
export type BoardDirection = Record<AxisType, DirectionType>;

export type EvaluationSlot = Record<AxisType, number>;

export type PreferenceSlot = { preference: number };

export type SlotDict = Partial<Record<AxisType, number>>;
