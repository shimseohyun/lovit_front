import { signInAnonymously } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreAuth, firestoreDb } from "../core";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxisData, BoardAxisType } from "@interfacesV02/type";
import type { ItemIDList } from "@interfacesV02/data/user";

import { convertRoughToAxisData } from "@utilsV02/convertRoughToAxisData";
import { getItemIDList } from "@dataV02/itemSummary";

type GetUserBoardDataReturn = {
  itemList: ItemIDList;
  axis: Record<BoardAxisType, AxisData>;
};

type PostUserBoardDataBody = {
  itemList: string;
  axis: Record<BoardAxisType, string>;
};

const parsingData = (data: string) => {
  if (data === undefined) throw "데이터가 undefined 입니다.";
  return JSON.parse(data);
};

const getUserBoardData = async (): Promise<
  GetUserBoardDataReturn | undefined
> => {
  try {
    await signInAnonymously(firestoreAuth);

    const docRef = doc(firestoreDb, "userBoardData", "1234");
    const snap = await getDoc(docRef);
    const data = snap.data();

    if (data === undefined) throw "값이 없습니다.";

    const itemList = parsingData(data["itemList"]);
    const horizontal = parsingData(data["axis"]["HORIZONTAL"]);
    const vertical = parsingData(data["axis"]["VERTICAL"]);
    const preference = parsingData(data["axis"]["PREFERENCE"]);

    return {
      itemList: itemList,
      axis: {
        HORIZONTAL: convertRoughToAxisData("HORIZONTAL", horizontal),
        VERTICAL: convertRoughToAxisData("VERTICAL", vertical),
        PREFERENCE: convertRoughToAxisData("PREFERENCE", preference),
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const initialEvaluationRoughData = [[], [], [], [], [], []];
const initialPreferenceRoughData = [[], [], [], [], [], [], [], [], [], [], []];

const postUserBoardData = async (body: PostUserBoardDataBody) => {
  try {
    await signInAnonymously(firestoreAuth);
    const docRef = doc(firestoreDb, "userBoardData", "1234");
    await setDoc(docRef, body);
  } catch (err) {
    console.log(err);
  }
};

export const resetUserBoardData = async () => {
  const initialData: PostUserBoardDataBody = {
    itemList: "[]",
    axis: {
      HORIZONTAL: JSON.stringify(initialEvaluationRoughData),
      VERTICAL: JSON.stringify(initialEvaluationRoughData),
      PREFERENCE: JSON.stringify(initialPreferenceRoughData),
    },
  };
  try {
    await signInAnonymously(firestoreAuth);
    const docRef = doc(firestoreDb, "userBoardData", "1234");
    await setDoc(docRef, initialData);
    console.log("데이터베이스가 초기화되었습니다.");
  } catch (err) {
    console.log(err);
  }
};

export const useResetUserBoardData = () => {
  return useMutation({
    mutationKey: ["POST_BOARD_DATA"],
    mutationFn: () => resetUserBoardData(),
  });
};

export const usePostUserBoardData = () => {
  return useMutation({
    mutationKey: ["POST_BOARD_DATA"],
    mutationFn: (body: PostUserBoardDataBody) => postUserBoardData(body),
  });
};

export const useGetUserBoardData = (id?: number) => {
  return useQuery({
    queryKey: ["USER_BOARD", id],
    queryFn: getUserBoardData,
  });
};

export const useGetPendingItemList = (maxCount: number) => {
  return useQuery({
    queryKey: ["PENDLING_ITEM_LIST"],

    queryFn: async () => {
      const data = await getUserBoardData();
      const checkedItemList = data?.itemList ?? [];

      const itemIDList = getItemIDList();

      const checkedItemIDSet = new Set(checkedItemList);

      const pendingItemIDAllList = itemIDList.filter(
        (id) => !checkedItemIDSet.has(id),
      );

      const pendingItemIDList = pendingItemIDAllList.slice(0, maxCount);
      const isLast = pendingItemIDAllList.length <= maxCount;
      return { list: pendingItemIDList, isLast };
    },
  });
};
