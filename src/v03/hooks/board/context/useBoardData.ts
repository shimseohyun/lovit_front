// useBoardData.ts
export type UseBoardDataReturn = ReturnType<typeof useBoardData>;

import { useGetUserBoardData } from "@hooksV03/api/userBoardData";
import { useAuth } from "@hooksV03/auth/useAuth";

const useBoardData = (currentStep?: number) => {
  const { user } = useAuth();
  const { data, isFetching } = useGetUserBoardData(user?.uid, currentStep);

  const horizontal = data.axis.HORIZONTAL;
  const vertical = data.axis.VERTICAL;
  const preference = data.axis.PREFERENCE;
  const itemList = data.itemList;

  return { horizontal, vertical, preference, itemList, isFetching };
};

export default useBoardData;
