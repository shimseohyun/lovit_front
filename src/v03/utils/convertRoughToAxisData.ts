import type {
  AxisSlotType,
  RoughAxisData,
  UserAxisBundleDict,
  UserAxisGroupDict,
  UserAxisItemPositionDict,
  UserAxisSlot,
  UserAxisSlotByGroupDict,
  UserAxisSlotDict,
  UserAxisSlotList,
} from "@interfacesV03/data/user";
import createAxisSlot from "./createAxisSlot";
import type { AxisData, BoardAxisType } from "@interfacesV03/type";

export const convertRoughToAxisData = (
  type: BoardAxisType,
  data: RoughAxisData,
): AxisData => {
  const userAxisGroupDict: UserAxisGroupDict = {};
  const userAxisBundleDict: UserAxisBundleDict = {};
  const userAxisItemPosition: UserAxisItemPositionDict = {};
  const userAxisSlotList: UserAxisSlotList = [];
  const userAxisSlotDict: UserAxisSlotDict = {};
  const userAxisSlotByGroup: UserAxisSlotByGroupDict = {};

  let currentAxisGroupID: number = 0;
  let currentAxisBundleID: number = 0;

  data.forEach((group) => {
    let currentBundleList: number[] = [];

    let startSlotIDX = userAxisSlotList.length;

    if (group.length === 0) {
      const slotID = userAxisSlotList.length;

      const newSlot: UserAxisSlot = {
        slotID: userAxisSlotList.length,
        slotType: "CENTER_LABEL",
        userAxisGroupID: currentAxisGroupID,
        uesrAxisBundleIDX: 0,
      };

      userAxisSlotDict[slotID] = newSlot;
      userAxisSlotList.push(slotID);
    }

    /** 2. 번들별로 조회 */
    group.forEach((bundle, bundleIDX) => {
      let currentItemList: number[] = [];

      /** 3. 아이템 별로 조회 */
      bundle.forEach((itemID) => {
        userAxisItemPosition[itemID] = {
          itemSummaryID: itemID,
          userAxisGroupID: currentAxisGroupID,
          userAxisBundleID: bundleIDX,
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
        bundleIDX,
        currentAxisBundleID,
      );

      newSlotList.forEach((slot) => {
        userAxisSlotList.push(slot.slotID);
        userAxisSlotDict[slot.slotID] = slot;
      });

      userAxisBundleDict[currentAxisBundleID] = {
        userAxisGroupID: currentAxisGroupID,
        userAxisBundleID: currentAxisBundleID,
        itemList: currentItemList,
      };

      currentBundleList.push(currentAxisBundleID);
      currentAxisBundleID++;
    });

    let endSlotIDX = userAxisSlotList.length - 1;

    userAxisGroupDict[currentAxisGroupID] = {
      userAxisGroupID: currentAxisGroupID,
      bundleList: currentBundleList,
    };

    userAxisSlotByGroup[currentAxisGroupID] = {
      groupID: currentAxisGroupID,
      slotCount: endSlotIDX - startSlotIDX + 1,
      startSlotIDX: startSlotIDX,
      endSlotIDX: endSlotIDX,
    };

    currentAxisGroupID++;
  });

  return {
    type: type,
    roughData: data,
    groupDict: userAxisGroupDict,
    bundleDict: userAxisBundleDict,
    itemPositionDict: userAxisItemPosition,
    slotList: userAxisSlotList,
    slotDict: userAxisSlotDict,
    slotByGroupDict: userAxisSlotByGroup,
  };
};
