// useBoardData.ts
export type UseBoardDataReturn = ReturnType<typeof useBoardData>;

import { useGetUserBoardData } from "@apisV02/firebase/domain/user";
import { convertRoughToAxisData } from "@utilsV02/convertRoughToAxisData";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

const useBoardData = (currentStep?: number) => {
  const { data, isLoading } = useGetUserBoardData(currentStep);
  if (data === undefined || data === null)
    return {
      itemList: [],
      horizontal: convertRoughToAxisData("HORIZONTAL", initialEvaluation),
      vertical: convertRoughToAxisData("VERTICAL", initialEvaluation),
      preference: convertRoughToAxisData("PREFERENCE", initialPreference),
    };
  else {
    const horizontal = data.axis.HORIZONTAL;
    const vertical = data.axis.VERTICAL;
    const preference = data.axis.PREFERENCE;
    const itemList = data.itemList;

    return { horizontal, vertical, preference, itemList, isLoading };
  }
};

export default useBoardData;
