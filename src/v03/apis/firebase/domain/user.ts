import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../core";

import type { AxisData, BoardAxisType } from "@interfacesV03/type";
import type { ItemIDList } from "@interfacesV03/data/user";

import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";
import { getItemCount } from "@dataV03/itemSummary";

export type GetUserBoardDataReturn = {
  // cusor: number;
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
  uid: string,
): Promise<GetUserBoardDataReturn> => {
  try {
    const docRef = doc(firestoreDb, "userBoardData", uid);
    const snap = await getDoc(docRef);
    const data = snap.data();

    if (!data) throw "NO_DATA";

    // const itemCusor = data["cusor"];
    const itemList = parsingData(data["itemList"]);
    const horizontal = parsingData(data["axis"]["HORIZONTAL"]);
    const vertical = parsingData(data["axis"]["VERTICAL"]);
    const preference = parsingData(data["axis"]["PREFERENCE"]);

    const isMore = getItemCount() > itemList.length;
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
    throw err;
  }
};

export const postUserBoardData = async (
  uid: string,
  body: PostUserBoardDataBody,
) => {
  try {
    const docRef = doc(firestoreDb, "userBoardData", uid);
    await setDoc(docRef, body);
  } catch (err) {
    console.log(err);
  }
};

export const resetUserBoardData = async (uid: string) => {
  const initialData: PostUserBoardDataBody = {
    itemList: "[]",
    axis: {
      HORIZONTAL: JSON.stringify(initialEvaluation),
      VERTICAL: JSON.stringify(initialEvaluation),
      PREFERENCE: JSON.stringify(initialPreference),
    },
  };
  try {
    const docRef = doc(firestoreDb, "userBoardData", uid);
    await setDoc(docRef, initialData);
  } catch (err) {
    console.log(err);
  }
};
