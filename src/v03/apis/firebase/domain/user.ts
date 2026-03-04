import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../core";

import type { AxisData, BoardAxisType } from "@interfacesV03/type";
import type { ItemIDList } from "@interfacesV03/data/user";

import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";
import { USER_BOARD } from "../path";
import { getItemGroupList, getItemIDList } from "@dataV03/itemSummary";

export type GetUserBoardDataReturn = {
  isMore: boolean;
  groupItemCount: number;
  totalItemCount: number;
  filteredItemList: ItemIDList;
  pendingItemList: ItemIDList;
  itemList: ItemIDList;
  axis: Record<BoardAxisType, AxisData>;
};

export type PostUserBoardDataBody = {
  itemList: string;
  axis: Record<BoardAxisType, string>;
};

const parsingData = (data: string) => {
  if (data === undefined) throw "데이터가 undefined 입니다.";
  return JSON.parse(data);
};

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

export const getUserBoardData = async (parms: {
  boardID: number;
  groupID?: number;
  uid: string;
}): Promise<GetUserBoardDataReturn> => {
  const { boardID, groupID, uid } = parms;
  try {
    const docRef = doc(firestoreDb, USER_BOARD(boardID), uid);
    const snap = await getDoc(docRef);
    const data = snap.data();

    if (!data) throw "NO_DATA";

    // const itemCusor = data["cusor"];
    const itemList: ItemIDList = parsingData(data["itemList"]);
    const horizontal = parsingData(data["axis"]["HORIZONTAL"]);
    const vertical = parsingData(data["axis"]["VERTICAL"]);
    const preference = parsingData(data["axis"]["PREFERENCE"]);

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
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postUserBoardData = async (
  boardID: number,
  uid: string,
  body: PostUserBoardDataBody,
) => {
  try {
    const docRef = doc(firestoreDb, USER_BOARD(boardID), uid);
    await setDoc(docRef, body);
  } catch (err) {
    console.log(err);
  }
};

export const resetUserBoardData = async (boardID: number, uid: string) => {
  const initialData: PostUserBoardDataBody = {
    itemList: "[]",
    axis: {
      HORIZONTAL: JSON.stringify(initialEvaluation),
      VERTICAL: JSON.stringify(initialEvaluation),
      PREFERENCE: JSON.stringify(initialPreference),
    },
  };
  try {
    const docRef = doc(firestoreDb, USER_BOARD(boardID), uid);
    await setDoc(docRef, initialData);
  } catch (err) {
    console.log(err);
  }
};
