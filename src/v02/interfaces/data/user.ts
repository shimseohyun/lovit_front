import type { PrimaryKey } from ".";
import type { AxisSide } from "./system";

export type RoughAxisData = number[][][];

type ItemSummaryID = PrimaryKey;
type UserAxisGroupID = PrimaryKey;
type UserAxisBundleID = PrimaryKey;

export interface UserAxisGroup {
  userAxisGroupID: UserAxisGroupID;

  axisSide: AxisSide;
  intensityLevel: number;

  bundleList: UserAxisBundleID[];
}

export interface UserAxisBundle {
  userAxisBundleID: UserAxisBundleID;
  userAxisGroupID: UserAxisGroupID;

  itemList: ItemSummaryID[];
}

export interface UserAxisItemPosition {
  itemSummaryID: ItemSummaryID;
  userAxisGroupID: number;
  userAxisBundleID: number;
  order: number;
}

export type UserAxisGroupDict = Record<UserAxisGroupID, UserAxisGroup>;
export type UserAxisBundleDict = Record<UserAxisBundleID, UserAxisBundle>;
export type UserAxisItemPositionDict = Record<
  ItemSummaryID,
  UserAxisItemPosition
>;
