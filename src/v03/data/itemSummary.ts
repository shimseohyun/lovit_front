import type {
  BoardInformation,
  ItemGroup,
  ItemSummary,
  ItemSummaryDict,
} from "@interfacesV03/data/system";
import type { ItemIDList } from "@interfacesV03/data/user";
import { BOARD_INFO_DICT, type BoardDict } from "./boardInformation";

export const getItemCount = (boardID: number) => {
  return getItemIDList(boardID).length;
};

export const getItemSummary = (
  boardID: number,
  itemID: number,
): ItemSummary => {
  const dict = BOARD_INFO_DICT[boardID]?.itemSummaryDict;
  if (!dict)
    return {
      itemSummaryID: 0,
      name: "",
      thumbnailURL: "",
      category: "",
    };
  return dict[itemID];
};

export const getItemGroupIDList = (boardID: number) => {
  const groupDict = BOARD_INFO_DICT[boardID]?.itemGroupDict;
  if (!groupDict) return [];
  return Object.keys(groupDict).map(Number);
};

export const getItemGroup = (boardID: number, groupID: number): ItemGroup => {
  const groupDict = BOARD_INFO_DICT[boardID]?.itemGroupDict;
  if (!groupDict)
    return {
      id: 0,
      name: "",
      itemIDList: [],
      logoURL: "",
    };
  const dict = groupDict[groupID];
  if (!dict)
    return {
      id: 0,
      name: "",
      itemIDList: [],
      logoURL: "",
    };
  else {
    return dict;
  }
};
export const getItemGroupList = (
  boardID: number,
  groupID: number,
): ItemIDList => {
  const groupDict = BOARD_INFO_DICT[boardID]?.itemGroupDict;

  if (!groupDict) return [];
  if (!groupDict[groupID]) return [];
  const list = groupDict[groupID].itemIDList;
  return list;
};

export const getItemIDList = (boardID: number): ItemIDList => {
  const list = BOARD_INFO_DICT[boardID]?.itemIDList;
  if (!list) return [];
  return list;
};

export const getBoard = (boardID: number): BoardDict => {
  const info = BOARD_INFO_DICT[boardID];
  return info;
};

export const getBoardInformation = (
  boardID: number,
): BoardInformation | undefined => {
  const info = BOARD_INFO_DICT[boardID]?.boardInformation;
  return info;
};

export const getBoardItemDict = (
  boardID: number,
): ItemSummaryDict | undefined => {
  const dict = BOARD_INFO_DICT[boardID]?.itemSummaryDict;
  return dict;
};
