import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import type {
  UserAxisGroupDict,
  UserAxisItemPositionDict,
  UserAxisPointDict,
} from "@interfacesV02/data/user";

const useGetBoardPoint = () => {
  const TOTAL_GROUP_COUNT = 6;
  const { vertical, horizontal, itemList } = useBoardDataContext();

  const getPoints = (
    positionDict: UserAxisItemPositionDict,
    groupDict: UserAxisGroupDict,
  ) => {
    const pointDict: UserAxisPointDict = {};

    itemList.forEach((item) => {
      const position = positionDict[item];
      const groupID = position.userAxisGroupID;
      const bundleID = position.userAxisBundleID;
      const group = groupDict[groupID];
      const bundleList = group.bundleList;
      const bundleCount = bundleList.length;
      const bundleIDX = bundleList.findIndex((i) => i === bundleID);

      const percent =
        groupID / TOTAL_GROUP_COUNT +
        ((1 / TOTAL_GROUP_COUNT) * (bundleIDX + 1)) / (bundleCount + 1);

      pointDict[item] = {
        percentage: Math.round(percent * 10000) / 100,
        groupID: groupID,
      };
    });
    return pointDict;
  };

  return {
    verticalPoints: getPoints(vertical.itemPositionDict, vertical.groupDict),
    horizontalPoints: getPoints(
      horizontal.itemPositionDict,
      horizontal.groupDict,
    ),
  };
};

export default useGetBoardPoint;
