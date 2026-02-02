import type {
  AxisGroupSummary,
  AxisSlotType,
  RoughAxisData,
  UserAxisBundleDict,
  UserAxisGroup,
  UserAxisGroupDict,
  UserAxisItemPositionDict,
  UserAxisSlot,
  UserAxisSlotDict,
  UserAxisSlotList,
} from "@interfacesV02/data/user";
import createAxisSlot from "./createAxisSlot";
import type { DirectionType } from "@interfacesV02/type";
import type {
  EvaluationAxis,
  PreferenceAxis,
} from "@interfacesV02/data/system";

const getIntensity = (currentID: number, stepPerSide: number) => {
  // 0, 1, 2
  // 2, 1, 0
  if (currentID < stepPerSide) return stepPerSide - currentID - 1;

  // 3 4 5
  // 0 1 2
  return currentID - stepPerSide;
};

export const convertEvaluationRoughAxisData = (
  data: RoughAxisData,
  evaluationAxis: EvaluationAxis,
) => {
  const stepPerSide = evaluationAxis.setpPerSide;
  const createNewEvaluationGroup = (
    groupID: number,
    bundleList: number[],
  ): UserAxisGroup => {
    let axisSide: DirectionType = groupID - stepPerSide < 0 ? "START" : "END";
    const groupSide = evaluationAxis.partDict[axisSide];

    const intensity = getIntensity(groupID, stepPerSide);
    const groupSummary: AxisGroupSummary = {
      type: "EVALUATION",
      groupIcon: groupSide.icon ?? "",
      intensityLabel: evaluationAxis.intensityLabelList[intensity],
      groupLabel: groupSide.label,
      groupDescription: "",
    };

    return {
      userAxisGroupID: groupID,
      groupSummary: groupSummary,
      axisSide: axisSide,
      intensityLevel: intensity,
      bundleList: bundleList,
    };
  };

  return convertRoughAxisData(data, createNewEvaluationGroup);
};

export const convertPreferenceRoughAxisData = (
  data: RoughAxisData,
  preferenceAxis: PreferenceAxis,
) => {
  const createNewPreferenceGroup = (
    groupID: number,
    bundleList: number[],
  ): UserAxisGroup => {
    const groupSummary: AxisGroupSummary = {
      type: "PREFERENCE",
      groupIcon: preferenceAxis.icon ?? "",
      intensityLabel: `${groupID / 2}`,
      groupLabel: preferenceAxis.label,
      groupDescription: preferenceAxis.intensityLabelList[groupID],
    };

    return {
      userAxisGroupID: groupID,
      groupSummary: groupSummary,
      axisSide: "END",
      intensityLevel: 0,
      bundleList: bundleList,
    };
  };
  return convertRoughAxisData(data, createNewPreferenceGroup);
};
const convertRoughAxisData = (
  data: RoughAxisData,
  createNewGroup: (groupID: number, bundleList: number[]) => UserAxisGroup,
) => {
  const userAxisGroupDict: UserAxisGroupDict = {};
  const userAxisBundleDict: UserAxisBundleDict = {};
  const userAxisItemPosition: UserAxisItemPositionDict = {};
  const userAxisSlotList: UserAxisSlotList = [];
  const userAxisSlotDict: UserAxisSlotDict = {};

  let currentAxisGroupID: number = 0;
  let currentAxisBundleID: number = 0;

  /** 1. 그룹별로 조회 */
  data.forEach((group) => {
    let currentBundleList: number[] = [];

    if (group.length === 0) {
      const slotID = userAxisSlotList.length;

      const newSlot: UserAxisSlot = {
        slotID: userAxisSlotList.length,
        slotType: "CENTER_LABEL",
        userAxisGroupID: currentAxisGroupID,
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

    /** 2. 번들별로 조회 */
    userAxisGroupDict[currentAxisGroupID] = createNewGroup(
      currentAxisGroupID,
      currentBundleList,
    );

    currentAxisGroupID++;
  });

  return {
    userAxisBundleDict,
    userAxisGroupDict,
    userAxisItemPosition,
    userAxisSlotList,
    userAxisSlotDict,
  };
};
