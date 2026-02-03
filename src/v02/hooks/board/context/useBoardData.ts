// useBoardData.ts
export type UseBoardDataReturn = ReturnType<typeof useBoardData>;

import { useMemo } from "react";
import { useGetAxisData } from "@hooksV02/data/useGetAxisData";

import type {
  UserAxisBundleDict,
  UserAxisGroupDict,
  UserAxisSlot,
  UserAxisSlotDict,
  UserAxisSlotList,
} from "@interfacesV02/data/user";
import createAxisSlot from "@utilsV02/createAxisSlot";
import type { AxisData } from "@interfacesV02/type";

/**
 * ✅ calcKey(= currentItemID 같은 키)가 바뀔 때만
 * slotList/slotDict 같은 “무거운 계산”이 다시 돌게 만들기
 */
const useBoardData = (calcKey?: unknown) => {
  return useMemo(() => {
    const h = useGetAxisData("HORIZONTAL", 6);
    const v = useGetAxisData("VERTICAL", 6);
    const p = useGetAxisData("PREFERENCE", 11);

    const hSlot = getSlotData(h.group, h.bundle);
    const vSlot = getSlotData(v.group, v.bundle);
    const pSlot = getSlotData(p.group, p.bundle);

    const horizontal: AxisData = {
      groupDict: h.group,
      bundleDict: h.bundle,
      itemPositionDict: h.itemPosition,
      slotList: hSlot.slotList,
      slotDict: hSlot.slotDict,
    };

    const vertical: AxisData = {
      groupDict: v.group,
      bundleDict: v.bundle,
      itemPositionDict: v.itemPosition,
      slotList: vSlot.slotList,
      slotDict: vSlot.slotDict,
    };

    const preference: AxisData = {
      groupDict: p.group,
      bundleDict: p.bundle,
      itemPositionDict: p.itemPosition,
      slotList: pSlot.slotList,
      slotDict: pSlot.slotDict,
    };

    const itemList: number[] = Object.keys(vertical.itemPositionDict).map(
      Number,
    );

    return {
      horizontal,
      vertical,
      preference,
      itemList,
    };
  }, [calcKey]);
};

export default useBoardData;

const getSlotData = (
  groupDict: UserAxisGroupDict,
  bundleDict: UserAxisBundleDict,
) => {
  const groupList = Object.keys(groupDict).map(Number);

  const slotList: UserAxisSlotList = [];
  const slotDict: UserAxisSlotDict = {};

  let slotCursor = 0;

  groupList.forEach((groupID) => {
    const group = groupDict[groupID];
    const bundleCount = group.bundleList.length;

    const pushSlots = (slots: UserAxisSlot[]) => {
      slots.forEach((slot) => {
        slotDict[slot.slotID] = slot;
        slotList.push(slot.slotID);
      });
      slotCursor += slots.length;
    };

    if (bundleCount === 0) {
      const slots = createAxisSlot(
        slotCursor,
        ["CENTER_LABEL"],
        groupID,
        undefined,
        [],
      );
      pushSlots(slots);
      return;
    }

    if (bundleCount === 1) {
      const bundleID = group.bundleList[0];

      const slots = createAxisSlot(
        slotCursor,
        ["START_LABEL", "ITEM_LIST", "END_LABEL"],
        groupID,
        bundleID,
        bundleDict[bundleID].itemList,
      );
      pushSlots(slots);
      return;
    }

    group.bundleList.forEach((bundleID, bundleIDX) => {
      const slots = createAxisSlot(
        slotCursor,
        [bundleIDX === 0 ? "START_LABEL" : "BETWEEN", "ITEM_LIST"],
        groupID,
        bundleID,
        bundleDict[bundleID].itemList,
      );
      pushSlots(slots);
    });
  });

  return { slotDict, slotList };
};
