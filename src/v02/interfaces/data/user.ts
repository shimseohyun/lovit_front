import type { PrimaryKey } from ".";

export type RoughAxisData = number[][][];

type ItemSummaryID = PrimaryKey;
type UserAxisGroupID = PrimaryKey;
type UserAxisBundleID = PrimaryKey;
type UserAxisSlotID = PrimaryKey;

export type ItemIDList = ItemSummaryID[];

export interface UserAxisGroup {
  userAxisGroupID: UserAxisGroupID;
  bundleList: UserAxisBundleID[];
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
  uesrAxisBundleIDX: UserAxisBundleID;
  userAxisBundle?: number[];
}

export interface UserAxisSlotByGroup {
  groupID: number;
  startSlotIDX: number;
  endSlotIDX: number;
  slotCount: number;
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

export type UserAxisSlotByGroupDict = Record<
  UserAxisGroupID,
  UserAxisSlotByGroup
>;
