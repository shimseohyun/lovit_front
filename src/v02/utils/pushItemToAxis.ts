import type { AxisData } from "@hooksV02/board/useBoardData";
import {
  addBundleToDict,
  addItemPositionToDict,
  updateBundleInDict,
  updateGroupInDict,
  type EvaluationAxisType,
} from "@hooksV02/data/localStorage";
import type {
  UserAxisBundle,
  UserAxisBundleDict,
} from "@interfacesV02/data/user";

const createBundleList = (
  bundleList: number[],
  newBundleID: number,
  insertIDX: number,
): number[] => {
  return [
    ...bundleList.slice(0, insertIDX),
    newBundleID,
    ...bundleList.slice(insertIDX),
  ];
};

const createBundle = (
  itemID: number,
  groupID: number,
  bundleDict: UserAxisBundleDict,
): UserAxisBundle => {
  const newBundleID = Object.keys(bundleDict).length;

  return {
    userAxisBundleID: newBundleID,
    userAxisGroupID: groupID,
    itemList: [itemID],
  };
};

const pushItemToAxis = (
  itemID: number,
  slotIDX: number,
  type: EvaluationAxisType,
  data: AxisData,
) => {
  const slotDict = data.slotDict;

  const groupDict = data.groupDict;
  const bundleDict = data.bundleDict;
  const itemPositionDict = data.itemPositionDict;

  const slot = slotDict[slotIDX];

  if (slot === undefined) return;

  const groupID = slot.userAxisGroupID;

  // 아이템을 기존의 번들에 푸시
  if (slot.slotType === "ITEM_LIST") {
    const bundleID = slot.userAxisBundleID;
    if (bundleID === undefined) return;
    const itemLsit = bundleDict[bundleID].itemList;

    itemLsit.push(itemID);

    updateBundleInDict(type, bundleDict, bundleID, { itemList: itemLsit });
    addItemPositionToDict(type, itemPositionDict, {
      itemSummaryID: itemID,
      userAxisGroupID: groupID,
      userAxisBundleID: bundleID,
    });
    return;
  }

  // 새로운 번들을 만들고 기존의 그룹을 수정
  const newBundle = createBundle(itemID, groupID, bundleDict);
  let nextBundleList: number[] = [];

  const bundleList = groupDict[groupID].bundleList;

  let insertIDX: number = 0;
  if (slot.slotType === "CENTER_LABEL") {
    nextBundleList = [newBundle.userAxisBundleID];
  } else {
    if (slot.slotType === "BETWEEN") {
      insertIDX = slotIDX;
      createBundleList(bundleList, newBundle.userAxisBundleID, slotIDX);
    } else if (slot.slotType === "START_LABEL") {
      insertIDX = 0;
    } else if (slot.slotType === "END_LABEL") {
      insertIDX = groupDict[groupID].bundleList.length;
    }
    nextBundleList = createBundleList(
      bundleList,
      newBundle.userAxisBundleID,
      insertIDX,
    );
  }

  addBundleToDict(type, bundleDict, newBundle);
  updateGroupInDict(type, groupDict, groupID, { bundleList: nextBundleList });
  addItemPositionToDict(type, itemPositionDict, {
    itemSummaryID: itemID,
    userAxisGroupID: groupID,
    userAxisBundleID: newBundle.userAxisBundleID,
  });
};

export default pushItemToAxis;
