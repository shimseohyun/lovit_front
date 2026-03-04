import type {
  GetUserBoardDataReturn,
  PostUserBoardDataBody,
} from "@apisV03/firebase/domain/user";

import type { ItemIDList, RoughAxisData } from "@interfacesV03/data/user";
import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";
import { HORIZONTAL, ITEM_LIST, PREFERENCE, VERTICAL } from "./path";
import { getItemGroupList, getItemIDList } from "@dataV03/itemSummary";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

export const getUserBoardDataLocal = (parms: {
  boardID: number;
  groupID?: number;
}): GetUserBoardDataReturn => {
  const { boardID, groupID } = parms;
  const i = window.localStorage.getItem(ITEM_LIST(boardID));
  const h = window.localStorage.getItem(HORIZONTAL(boardID));
  const v = window.localStorage.getItem(VERTICAL(boardID));
  const p = window.localStorage.getItem(PREFERENCE(boardID));

  const itemList: ItemIDList = i ? JSON.parse(i) : [];
  const horizontal: RoughAxisData = h ? JSON.parse(h) : [...initialEvaluation];
  const vertical: RoughAxisData = v ? JSON.parse(v) : [...initialEvaluation];
  const preference: RoughAxisData = p ? JSON.parse(p) : [...initialPreference];
  const list =
    groupID !== undefined
      ? getItemGroupList(boardID, groupID)
      : getItemIDList(boardID);

  const groupItemCount = list.length;

  const itemSet = new Set(itemList);
  const filteredItemList: ItemIDList = [];
  const pendingItemList: ItemIDList = [];

  list.forEach((id) => {
    if (itemSet.has(id)) {
      filteredItemList.push(id);
    } else {
      pendingItemList.push(id);
    }
  });

  const isMore = groupItemCount > filteredItemList.length;

  return {
    isMore,
    itemList,
    groupItemCount,
    totalItemCount: itemList.length,
    filteredItemList,
    pendingItemList,
    axis: {
      HORIZONTAL: convertRoughToAxisData("HORIZONTAL", horizontal),
      VERTICAL: convertRoughToAxisData("VERTICAL", vertical),
      PREFERENCE: convertRoughToAxisData("PREFERENCE", preference),
    },
  };
};

export const postUseBoardDataLocal = (
  boardID: number,
  body: PostUserBoardDataBody,
) => {
  window.localStorage.setItem(ITEM_LIST(boardID), body.itemList);
  window.localStorage.setItem(HORIZONTAL(boardID), body.axis.HORIZONTAL);
  window.localStorage.setItem(VERTICAL(boardID), body.axis.VERTICAL);
  window.localStorage.setItem(PREFERENCE(boardID), body.axis.PREFERENCE);
};
