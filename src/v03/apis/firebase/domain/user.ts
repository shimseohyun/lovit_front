import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../core";

import type { AxisData, BoardAxisType } from "@interfacesV03/type";
import type { ItemIDList } from "@interfacesV03/data/user";

import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";
import { USER_BOARD } from "../path";
import { getItemCount } from "@dataV03/itemSummary";

export type GetUserBoardDataReturn = {
  isMore: boolean;
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

export const getUserBoardData = async (
  boardID: number,
  uid: string,
): Promise<GetUserBoardDataReturn> => {
  try {
    const docRef = doc(firestoreDb, USER_BOARD(boardID), uid);
    const snap = await getDoc(docRef);
    const data = snap.data();

    if (!data) throw "NO_DATA";

    // const itemCusor = data["cusor"];
    const itemList = parsingData(data["itemList"]);
    const horizontal = parsingData(data["axis"]["HORIZONTAL"]);
    const vertical = parsingData(data["axis"]["VERTICAL"]);
    const preference = parsingData(data["axis"]["PREFERENCE"]);

    const itemCount = getItemCount(boardID);
    const isMore = itemCount > itemList.length;

    return {
      isMore,
      itemList,
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
