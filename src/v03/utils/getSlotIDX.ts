import type { UserAxisSlotByGroupDict } from "@interfacesV03/data/user";

export const getSlotCenterIDX = (
  groupID: number,
  slotByGroupDict: UserAxisSlotByGroupDict,
) => {
  return (
    slotByGroupDict[groupID].startSlotIDX +
    Math.floor(slotByGroupDict[groupID].slotCount / 2)
  );
};
