import type { UserAxisGroupDict } from "@interfacesV02/data/user";

export const getSlotCenterIDX = (
  groupID: number,
  gorupDict: UserAxisGroupDict,
) => {
  let slotIDX = 0;
  for (let i = 0; i < groupID; i++) {
    slotIDX += getSlotCount(gorupDict[i].bundleList.length);
  }

  slotIDX += Math.floor(getSlotCount(gorupDict[groupID].bundleList.length) / 2);

  return slotIDX;
};

export const getSlotStartIDX = (
  groupID: number,
  gorupDict: UserAxisGroupDict,
) => {
  let slotIDX = 0;
  for (let i = 0; i < groupID; i++) {
    slotIDX += getSlotCount(gorupDict[i].bundleList.length);
  }

  return slotIDX;
};

export const getSlotCount = (length: number) => {
  if (length === 0) return 1;
  else {
    return 2 * length - 1 + 2;
  }
};
