import type {
  GetUserBoardDataReturn,
  PostUserBoardDataBody,
} from "@apisV03/firebase/domain/user";
import { maxItemCount } from "@constantsV03/auth";
import type { ItemIDList, RoughAxisData } from "@interfacesV03/data/user";
import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";
import { HORIZONTAL, ITEM_LIST, PREFERENCE, VERTICAL } from "./path";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

export const getUserBoardDataLocal = (
  boardID: number,
): GetUserBoardDataReturn => {
  const i = window.localStorage.getItem(ITEM_LIST(boardID));
  const h = window.localStorage.getItem(HORIZONTAL(boardID));
  const v = window.localStorage.getItem(VERTICAL(boardID));
  const p = window.localStorage.getItem(PREFERENCE(boardID));

  const itemList: ItemIDList = i ? JSON.parse(i) : [];
  const horizontal: RoughAxisData = h ? JSON.parse(h) : [...initialEvaluation];
  const vertical: RoughAxisData = v ? JSON.parse(v) : [...initialEvaluation];
  const preference: RoughAxisData = p ? JSON.parse(p) : [...initialPreference];

  const isMore = maxItemCount > itemList.length;

  return {
    isMore: isMore,
    itemList: itemList,
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
