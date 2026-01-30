import type { AxisSlotType, UserAxisSlot } from "@interfacesV02/data/user";

const createAxisSlot = (
  startID: number,
  typeList: AxisSlotType[],
  groupID: number,
  bundleID?: number,
): UserAxisSlot[] => {
  const slotList = typeList.map((type, i): UserAxisSlot => {
    return {
      slotID: startID + i,
      slotType: type,
      userAxisGroupID: groupID,
      userAxisBundleID: type === "ITEM_LIST" ? bundleID : undefined,
    };
  });
  return slotList;
};

export default createAxisSlot;

export const getSlotCount = (length: number) => {
  if (length === 0) return 1;
  else {
    return 2 * length - 1 + 2;
  }
};
