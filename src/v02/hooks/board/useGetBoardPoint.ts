import type {
  ItemIDList,
  UserAxisGroupDict,
  UserAxisItemPositionDict,
  UserAxisPointDict,
} from "@interfacesV02/data/user";
import type { AxisData } from "@interfacesV02/type";

type Parms = {
  vertical: AxisData;
  horizontal: AxisData;
  preference: AxisData;
  itemList: ItemIDList;
};

const useGetBoardPoint = (parms: Parms) => {
  const { vertical, horizontal, preference, itemList } = parms;

  const getPoints = (
    positionDict: UserAxisItemPositionDict,
    groupDict: UserAxisGroupDict,
  ) => {
    const pointDict: UserAxisPointDict = {};
    const TOTAL_GROUP_COUNT = Object.keys(groupDict).length;

    const gap = 1 / TOTAL_GROUP_COUNT;
    itemList.forEach((item) => {
      const position = positionDict[item];
      const groupID = position.userAxisGroupID;
      const bundleID = position.userAxisBundleID;
      const group = groupDict[groupID];
      const bundleList = group.bundleList;
      const bundleCount = bundleList.length;
      const bundleIDX = bundleList.findIndex((i) => i === bundleID);

      const start = groupID / TOTAL_GROUP_COUNT;
      const percent = start + (gap * (bundleIDX + 1)) / (bundleCount + 1);

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
    preferncePoints: getPoints(
      preference.itemPositionDict,
      preference.groupDict,
    ),
  };
};

export default useGetBoardPoint;
