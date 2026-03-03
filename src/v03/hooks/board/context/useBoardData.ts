// useBoardData.ts
export type UseBoardDataReturn = ReturnType<typeof useBoardData>;

import { useGetUserBoardData } from "@hooksV03/api/userBoardData";

const useBoardData = (
  currentStep: number,
  boardID: number,
  groupID?: number,
) => {
  const { data, isFetching } = useGetUserBoardData({
    boardID: boardID,
    groupID: groupID,
    step: currentStep,
  });

  const horizontal = data.axis.HORIZONTAL;
  const vertical = data.axis.VERTICAL;
  const preference = data.axis.PREFERENCE;
  const itemList = data.itemList;

  return {
    horizontal,
    vertical,
    preference,
    itemList,

    filteredItemList: data.filteredItemList,
    isFetching,
  };
};

export default useBoardData;
