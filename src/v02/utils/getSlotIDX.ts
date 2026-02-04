import type { UserAxisSlotByGroupDict } from "@interfacesV02/data/user";

export const getSlotCenterIDX = (
  groupID: number,
  slotByGroupDict: UserAxisSlotByGroupDict,
) => {
  return (
    slotByGroupDict[groupID].startSlotIDX +
    Math.floor(slotByGroupDict[groupID].slotCount / 2)
  );
};
