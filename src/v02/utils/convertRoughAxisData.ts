import type { AxisSide } from "@interfacesV02/data/system";

import type {
  RoughAxisData,
  UserAxisBundleDict,
  UserAxisGroupDict,
  UserAxisItemPositionDict,
} from "@interfacesV02/data/user";

const getIntensity = (currentID: number, groupCountPerSide: number) => {
  return Math.abs(currentID - groupCountPerSide);
};

const convertRoughAxisData = (
  data: RoughAxisData,
  groupCountPerSide: number,
  type: "EVALUATION" | "PREFERENCE",
) => {
  const userAxisGroupDict: UserAxisGroupDict = {};
  const userAxisBundleDict: UserAxisBundleDict = {};
  const userAxisItemPosition: UserAxisItemPositionDict = {};

  let currentAxisGroupID: number = 0;
  let currentAxisBundleID: number = 0;

  /** 1. 그룹별로 조회 */
  data.forEach((group, groupIDX) => {
    let axisSide: AxisSide = groupIDX - groupCountPerSide < 0 ? "START" : "END";
    let currentBundleList: number[] = [];
    let currentIntensity =
      type === "EVALUATION"
        ? getIntensity(groupIDX, groupCountPerSide)
        : groupIDX;

    /** 2. 번들별로 조회 */
    group.forEach((bundle) => {
      let currentItemList: number[] = [];

      /** 3. 아이템 별로 조회 */
      bundle.forEach((itemID, itemIDX) => {
        userAxisItemPosition[itemID] = {
          itemSummaryID: itemID,
          userAxisGroupID: currentAxisGroupID,
          userAxisBundleID: currentAxisBundleID,
          order: itemIDX,
        };

        currentItemList.push(itemID);
      });
      /** 3. 아이템 별로 조회 */

      userAxisBundleDict[currentAxisBundleID] = {
        userAxisGroupID: currentAxisGroupID,
        userAxisBundleID: currentAxisBundleID,
        itemList: currentItemList,
      };

      currentBundleList.push(currentAxisBundleID);
      currentAxisBundleID++;
    });
    /** 2. 번들별로 조회 */

    userAxisGroupDict[currentAxisGroupID] = {
      userAxisGroupID: currentAxisGroupID,

      axisSide: axisSide,
      intensityLevel: currentIntensity,

      bundleList: currentBundleList,
    };

    currentAxisGroupID++;
  });
  return { userAxisBundleDict, userAxisGroupDict, userAxisItemPosition };
};

export default convertRoughAxisData;
