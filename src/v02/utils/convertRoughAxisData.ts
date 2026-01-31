import type {
  AxisSlotType,
  RoughAxisData,
  UserAxisBundleDict,
  UserAxisGroupDict,
  UserAxisItemPositionDict,
  UserAxisSlotList,
} from "@interfacesV02/data/user";
import createAxisSlot from "./createAxisSlot";
import type { DirectionType } from "@interfacesV02/type";

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
  const userAxisSlotList: UserAxisSlotList = [];

  let currentAxisGroupID: number = 0;
  let currentAxisBundleID: number = 0;

  /** 1. 그룹별로 조회 */
  data.forEach((group, groupIDX) => {
    let axisSide: DirectionType =
      groupIDX - groupCountPerSide < 0 ? "START" : "END";
    let currentBundleList: number[] = [];
    let currentIntensity =
      type === "EVALUATION"
        ? getIntensity(groupIDX, groupCountPerSide)
        : groupIDX;

    if (group.length === 0) {
      // 슬롯 넣기
      userAxisSlotList.push({
        slotID: userAxisSlotList.length,
        slotType: "CENTER_LABEL",
        userAxisGroupID: currentAxisGroupID,
      });
    }

    /** 2. 번들별로 조회 */
    group.forEach((bundle, bundleIDX) => {
      let currentItemList: number[] = [];

      /** 3. 아이템 별로 조회 */
      bundle.forEach((itemID) => {
        userAxisItemPosition[itemID] = {
          itemSummaryID: itemID,
          userAxisGroupID: currentAxisGroupID,
          userAxisBundleID: currentAxisBundleID,
        };
        currentItemList.push(itemID);
      });
      /** 3. 아이템 별로 조회 */

      const typeList: AxisSlotType[] = [];
      typeList.push(bundleIDX === 0 ? "START_LABEL" : "BETWEEN");
      typeList.push("ITEM_LIST");
      if (group.length - 1 === bundleIDX) typeList.push("END_LABEL");
      const newSlotList = createAxisSlot(
        userAxisSlotList.length,
        typeList,
        currentAxisGroupID,
        currentAxisBundleID,
      );

      userAxisSlotList.push(...newSlotList);

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
  return {
    userAxisBundleDict,
    userAxisGroupDict,
    userAxisItemPosition,
    userAxisSlotList,
  };
};

export default convertRoughAxisData;
