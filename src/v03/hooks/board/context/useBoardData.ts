// useBoardData.ts
export type UseBoardDataReturn = ReturnType<typeof useBoardData>;

import { useGetUserBoardData } from "@hooksV03/api/userBoardData";

const useBoardData = (boardID: number, currentStep: number) => {
  const { data, isFetching } = useGetUserBoardData(boardID, currentStep);

  const horizontal = data.axis.HORIZONTAL;
  const vertical = data.axis.VERTICAL;
  const preference = data.axis.PREFERENCE;
  const itemList = data.itemList;

  return { horizontal, vertical, preference, itemList, isFetching };
};

export default useBoardData;
