import type { RoughAxisData } from "@interfacesV03/data/user";
import type { AxisData } from "@interfacesV03/type";

const createBundleList = (
  bundleList: number[][],
  newBundleList: number[],
  insertIDX: number,
): number[][] => {
  return [
    ...bundleList.slice(0, insertIDX),
    newBundleList,
    ...bundleList.slice(insertIDX),
  ];
};

const getNewRoughData = (
  itemID: number,
  slotIDX: number,
  data: AxisData,
): RoughAxisData => {
  let nextRoughData: RoughAxisData = data.roughData;
  const slot = data.slotDict[data.slotList[slotIDX]];
  const type = slot.slotType;
  const groupID = slot.userAxisGroupID;

  const startSlotIDX = data.slotByGroupDict[groupID].startSlotIDX;
  const bundleIDX = Math.floor((slotIDX - startSlotIDX) / 2);

  let nextBundleList: number[][] = data.roughData[groupID];

  if (type === "ITEM_LIST") {
    const nextItemList = data.roughData[groupID][bundleIDX] ?? [];
    nextItemList.push(itemID);
    nextBundleList[bundleIDX] = nextItemList;
  } else {
    const newItemList = [itemID];
    let insertIDX = type === "START_LABEL" ? 0 : bundleIDX + 1;
    nextBundleList = createBundleList(nextBundleList, newItemList, insertIDX);
  }

  nextRoughData[groupID] = nextBundleList;

  return nextRoughData;
};

export default getNewRoughData;
