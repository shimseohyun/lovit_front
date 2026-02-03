import type { AxisSlotType, UserAxisSlot } from "@interfacesV02/data/user";

const createAxisSlot = (
  startID: number,
  typeList: AxisSlotType[],
  groupID: number,
  bundleID?: number,
  bundle?: number[],
): UserAxisSlot[] => {
  const slotList = typeList.map((type, i): UserAxisSlot => {
    return {
      slotID: startID + i,
      slotType: type,
      userAxisGroupID: groupID,
      userAxisBundleID: type === "ITEM_LIST" ? bundleID : undefined,
      userAxisBundle: type === "ITEM_LIST" ? bundle : [],
    };
  });
  return slotList;
};

export default createAxisSlot;
