import {
  getUserBoardData,
  postUserBoardData,
  resetUserBoardData,
  type GetUserBoardDataReturn,
  type PostUserBoardDataBody,
} from "@apisV02/firebase/domain/user";
import {
  getUserBoardDataLocal,
  postUseBoardDataLocal,
} from "@apisV02/localstorage/user";
import { getItemIDList } from "@dataV02/itemSummary";

import { useMutation, useQuery } from "@tanstack/react-query";
import { convertRoughToAxisData } from "@utilsV02/convertRoughToAxisData";

export const useResetUserBoardData = (uid: string | undefined) => {
  return useMutation({
    mutationKey: ["POST_BOARD_DATA"],
    mutationFn: async () => {
      if (uid) {
        return resetUserBoardData(uid);
      } else {
        console.log("유저 정보가 없어요!");
        return;
      }
    },
  });
};

export const usePostUserBoardData = (uid: string | undefined) => {
  return useMutation({
    mutationKey: ["POST_BOARD_DATA"],
    mutationFn: async (body: PostUserBoardDataBody) => {
      if (uid) {
        return postUserBoardData(uid!, body);
      } else {
        console.log("유저 정보가 없어요!");
        return postUseBoardDataLocal(body);
      }
    },
  });
};
const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

const initialData: GetUserBoardDataReturn = {
  itemList: [],
  axis: {
    HORIZONTAL: convertRoughToAxisData("HORIZONTAL", [...initialEvaluation]),
    VERTICAL: convertRoughToAxisData("VERTICAL", [...initialEvaluation]),
    PREFERENCE: convertRoughToAxisData("PREFERENCE", [...initialPreference]),
  },
};

export const useGetUserBoardData = (uid: string | undefined, id?: number) => {
  return useQuery<GetUserBoardDataReturn>({
    queryKey: ["USER_BOARD", id, uid],
    queryFn: async () =>
      uid ? getUserBoardData(uid) : getUserBoardDataLocal(),
    initialData: initialData,
  });
};

export const useGetPendingItemList = (
  uid: string | undefined,
  maxCount: number,
) => {
  return useQuery({
    queryKey: ["PENDLING_ITEM_LIST", maxCount, uid],
    queryFn: async () => {
      let data: number[];
      if (uid) {
        const userData = await getUserBoardData(uid);
        data = userData?.itemList ?? [];
      } else {
        data = getUserBoardDataLocal().itemList;
      }
      const checkedItemList = data;

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
