import type { DirectionType } from "@interfacesV02/type";
import type { PrimaryKey } from ".";

export type RoughAxisData = number[][][];

type ItemSummaryID = PrimaryKey;
type UserAxisGroupID = PrimaryKey;
type UserAxisBundleID = PrimaryKey;
type UserAxisSlotID = PrimaryKey;

export type AxisGroupSummary = {
  type: "EVALUATION" | "PREFERENCE";
  groupIcon: string;
  intensityLabel: string;
  groupLabel: string;
  groupDescription: string;
};

export interface UserAxisGroup {
  userAxisGroupID: UserAxisGroupID;
  bundleList: UserAxisBundleID[];

  // 지워도 될것같음
  groupSummary: AxisGroupSummary;
  axisSide: DirectionType;
  intensityLevel: number;
}

export interface UserAxisBundle {
  userAxisBundleID: UserAxisBundleID;
  userAxisGroupID: UserAxisGroupID;

  itemList: ItemSummaryID[];
}

export interface UserAxisItemPosition {
  itemSummaryID: ItemSummaryID;
  userAxisGroupID: UserAxisGroupID;
  userAxisBundleID: UserAxisBundleID;
}

export type AxisSlotType =
  | "START_LABEL"
  | "CENTER_LABEL"
  | "END_LABEL"
  | "BETWEEN"
  | "ITEM_LIST";

export interface UserAxisSlot {
  slotID: UserAxisSlotID;
  slotType: AxisSlotType;

  userAxisGroupID: UserAxisGroupID;
  userAxisBundleID?: UserAxisBundleID; // "ITEM_LIST" 에서만 존재
  userAxisBundle?: number[];
}

export interface UserAxisPoint {
  percentage: number;
  groupID: number;
}

export type UserAxisGroupDict = Record<UserAxisGroupID, UserAxisGroup>;
export type UserAxisBundleDict = Record<UserAxisBundleID, UserAxisBundle>;
export type UserAxisItemPositionDict = Record<
  ItemSummaryID,
  UserAxisItemPosition
>;

export type UserAxisPointDict = Record<ItemSummaryID, UserAxisPoint>;

export type UserAxisSlotList = number[];
export type UserAxisSlotDict = Record<UserAxisSlotID, UserAxisSlot>;
