import {
  getUserBoardData,
  postUserBoardData,
  resetUserBoardData,
  type GetUserBoardDataReturn,
  type PostUserBoardDataBody,
} from "@apisV03/firebase/domain/user";
import {
  getUserBoardDataLocal,
  postUseBoardDataLocal,
} from "@apisV03/localstorage/user";
import { maxItemCount } from "@constantsV03/auth";
import { getItemGroupList, getItemIDList } from "@dataV03/itemSummary";
import { useAuth } from "@hooksV03/auth/useAuth";

import { useMutation, useQuery } from "@tanstack/react-query";
import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";

export const useResetUserBoardData = (boardID: number) => {
  const { user } = useAuth();
  const uid = user?.uid;

  return useMutation({
    mutationKey: ["POST_BOARD_DATA"],
    mutationFn: async () => {
      if (uid) {
        return resetUserBoardData(boardID, uid);
      } else {
        return;
      }
    },
  });
};

export const usePostUserBoardData = (boardID: number) => {
  const { user } = useAuth();
  const uid = user?.uid;

  return useMutation({
    mutationKey: ["POST_BOARD_DATA"],
    mutationFn: async (body: PostUserBoardDataBody) => {
      if (uid) {
        return postUserBoardData(boardID, uid!, body);
      } else {
        return postUseBoardDataLocal(boardID, body);
      }
    },
  });
};
const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

const initialData: GetUserBoardDataReturn = {
  isMore: true,
  groupItemCount: 0,
  totalItemCount: 0,
  filteredItemList: [],
  itemList: [],
  axis: {
    HORIZONTAL: convertRoughToAxisData("HORIZONTAL", [...initialEvaluation]),
    VERTICAL: convertRoughToAxisData("VERTICAL", [...initialEvaluation]),
    PREFERENCE: convertRoughToAxisData("PREFERENCE", [...initialPreference]),
  },
};

export const useGetUserBoardData = (parms: {
  boardID: number;
  groupID?: number;
  step?: number;
}) => {
  const { boardID, groupID, step } = parms;
  const { user } = useAuth();
  const uid = user?.uid;

  return useQuery<GetUserBoardDataReturn>({
    queryKey: ["USER_BOARD", boardID, groupID, uid, step],
    queryFn: async () => {
      const data = uid
        ? getUserBoardData({ boardID, groupID, uid })
        : getUserBoardDataLocal({ boardID, groupID });

      return data;
    },
    initialData: initialData,
  });
};

export const useGetPendingItemList = (
  boardID: number,
  groupID: number | undefined,
) => {
  const { user } = useAuth();
  const uid = user?.uid;

  return useQuery({
    initialData: { list: [], isLast: false },
    queryKey: ["PENDLING_ITEM_LIST", boardID, groupID, uid],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      let data: number[];
      let endSlice: number;

      if (uid) {
        try {
          const userData = await getUserBoardData({ boardID, groupID, uid });
          data = userData.itemList ?? [];
        } catch {
          data = [];
        }

        endSlice = maxItemCount;
      } else {
        data = getUserBoardDataLocal({ boardID, groupID }).itemList;
        endSlice = maxItemCount - data.length;
      }

      const checkedItemList = data;

      const itemIDList =
        groupID !== undefined
          ? getItemGroupList(boardID, groupID)
          : getItemIDList(boardID);

      const checkedItemIDSet = new Set(checkedItemList);
      const pendingItemIDAllList = itemIDList.filter(
        (id) => !checkedItemIDSet.has(id),
      );
      const pendingItemIDList = pendingItemIDAllList.slice(0, endSlice);

      const isLast =
        endSlice <= 0 || pendingItemIDAllList.length <= maxItemCount;

      return { list: pendingItemIDList, isLast };
    },
  });
};
