import type {
  RoughAxisData,
  UserAxisBundleDict,
  UserAxisGroupDict,
  UserAxisItemPositionDict,
  UserAxisSlotByGroupDict,
  UserAxisSlotDict,
  UserAxisSlotList,
} from "./data/user";

export type AxisData = {
  type: BoardAxisType;
  roughData: RoughAxisData;
  groupDict: UserAxisGroupDict;
  bundleDict: UserAxisBundleDict;
  itemPositionDict: UserAxisItemPositionDict;
  slotList: UserAxisSlotList;
  slotDict: UserAxisSlotDict;
  slotByGroupDict: UserAxisSlotByGroupDict;
};

export type AxisType = "HORIZONTAL" | "VERTICAL";
export type BoardAxisType = "HORIZONTAL" | "VERTICAL" | "PREFERENCE";
export type DirectionType = "END" | "START";
export type ResultType = DirectionType | "MIDDLE";

export const emptyDirection: BoardDirection = {
  HORIZONTAL: null,
  VERTICAL: null,
};

export type BoardDirection = Record<AxisType, DirectionType | null>;

export type EvaluationSlot = Record<AxisType, number>;

export type PreferenceSlot = { preference: number };

export type BoardAxisDict = Partial<Record<AxisType, AxisData>>;
export type SlotCount = Record<AxisType, number>;
export type SlotDict = Partial<Record<AxisType, number>>;
