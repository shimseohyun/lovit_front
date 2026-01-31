export type AxisData = ReturnType<typeof useHandleAxisData>;

import type {
  AxisSlotType,
  UserAxisBundle,
  UserAxisBundleDict,
  UserAxisGroup,
  UserAxisGroupDict,
  UserAxisItemPosition,
  UserAxisItemPositionDict,
  UserAxisSlotDict,
  UserAxisSlotList,
} from "@interfacesV02/data/user";
import createAxisSlot from "@utilsV02/createAxisSlot";

import { useState } from "react";

type Parms = {
  initialGroupDict?: UserAxisGroupDict;
  initialBundleDict?: UserAxisBundleDict;
  initialItemPositionDict?: UserAxisItemPositionDict;
  initialSlotList?: UserAxisSlotList;
  initialSlotDict?: UserAxisSlotDict;
};

const useHandleAxisData = (parms: Parms) => {
  const {
    initialGroupDict = {},
    initialBundleDict = {},
    initialItemPositionDict = {},
    initialSlotList = [],
    initialSlotDict = {},
  } = parms;

  const [groupDict, setGroupDict] =
    useState<UserAxisGroupDict>(initialGroupDict);
  const [bundleDict, setBundleDict] =
    useState<UserAxisBundleDict>(initialBundleDict);

  const [itemPositionDict, setItemPositionDict] =
    useState<UserAxisItemPositionDict>(initialItemPositionDict);

  const [slotList, setSlotList] = useState<UserAxisSlotList>(initialSlotList);
  const [slotDict, setSlotDict] = useState<UserAxisSlotDict>(initialSlotDict);

  const createNewBundle = (itemID: number, groupID: number) => {
    const newBundleID = Object.keys(bundleDict).length;

    const newBundle: UserAxisBundle = {
      userAxisBundleID: newBundleID,
      userAxisGroupID: groupID,
      itemList: [itemID],
    };
    return newBundle;
  };

  const updateBundle = (newBundle: UserAxisBundle) => {
    const newBundleDict = {
      ...bundleDict,
      [newBundle.userAxisBundleID]: newBundle,
    };
    setBundleDict(newBundleDict);
  };

  const updateGroup = (newGroup: UserAxisGroup, groupID: number) => {
    const newGroupDict = {
      ...groupDict,
      [groupID]: newGroup,
    };

    setGroupDict(newGroupDict);
  };

  const pushBundle = (itemID: number, groupID: number) => {
    const newBundle = createNewBundle(itemID, groupID);
    const newGroup: UserAxisGroup = {
      ...groupDict[groupID],
      bundleList: [newBundle.userAxisBundleID],
    };
    updateBundle(newBundle);
    updateGroup(newGroup, groupID);
  };

  const insertBundle = (itemID: number, groupID: number, insertIDX: number) => {
    const newBundle = createNewBundle(itemID, groupID);

    let bundleLsit = groupDict[groupID].bundleList;
    if (insertIDX === bundleLsit.length) {
      bundleLsit.push(newBundle.userAxisBundleID);
    } else {
      bundleLsit = [
        ...bundleLsit.slice(0, insertIDX),
        newBundle.userAxisBundleID,
        ...bundleLsit.slice(insertIDX),
      ];
    }

    let newGroup: UserAxisGroup = {
      ...groupDict[groupID],
      bundleList: bundleLsit,
    };

    updateBundle(newBundle);
    updateGroup(newGroup, groupID);
  };

  const updateItemPosition = (
    itemID: number,
    groupID: number,
    bundleID: number,
  ) => {
    const newItemPosition: UserAxisItemPosition = {
      itemSummaryID: itemID,
      userAxisGroupID: groupID,
      userAxisBundleID: bundleID,
    };
    const newItemPositoinDict = {
      ...itemPositionDict,
      [itemID]: newItemPosition,
    };
    setItemPositionDict(newItemPositoinDict);
  };

  const updateSlot = (
    prevID: number,
    nextID: number,
    groupID: number,
    bundleID: number | undefined,
    keyList: AxisSlotType[],
  ) => {
    const newSlot = createAxisSlot(slotList.length, keyList, groupID, bundleID);
    const newSlotDict = slotDict;

    const newSlotIDX = newSlot.map((slot) => {
      newSlotDict[slot.slotID] = slot;
      return slot.slotID;
    });

    const newSlotList = [
      ...slotList.slice(0, prevID),
      ...newSlotIDX,
      ...slotList.slice(nextID),
    ];

    setSlotDict(newSlotDict);
    setSlotList(newSlotList);
  };

  const pushItem = (itemID: number, slotIDX: number) => {
    const slotID = slotList[slotIDX];
    const slot = slotDict[slotID ?? 0];
    if (slotID === undefined || slot === undefined) return;

    const slotType = slot.slotType;
    const groupID = slot.userAxisGroupID;
    const bundleID =
      slot.userAxisBundleID === undefined
        ? Object.keys(bundleDict).length
        : slot.userAxisBundleID;
    updateItemPosition(itemID, groupID, bundleID);
    switch (slotType) {
      // slotIDX 위치에 시작, 리스트, 끝 슬롯으로 대체
      case "CENTER_LABEL": {
        updateSlot(slotIDX, slotIDX + 1, groupID, bundleID, [
          "START_LABEL",
          "ITEM_LIST",
          "END_LABEL",
        ]);

        pushBundle(itemID, groupID);

        return;
      }

      // slotIDX 뒤에 list, between 삽입
      case "BETWEEN": {
        updateSlot(slotIDX + 1, slotIDX + 1, groupID, bundleID, [
          "ITEM_LIST",
          "BETWEEN",
        ]);

        const prevSlotID = slotList[slotIDX - 1];
        const prevSlot = slotDict[prevSlotID];

        const prevBundleID = prevSlot?.userAxisBundleID;
        if (prevBundleID === undefined) return;

        const insertIDX = groupDict[groupID].bundleList.findIndex(
          (item) => item === prevBundleID,
        );

        insertBundle(itemID, groupID, insertIDX);

        return;
      }

      case "START_LABEL": {
        updateSlot(slotIDX + 1, slotIDX + 1, groupID, bundleID, [
          "ITEM_LIST",
          "BETWEEN",
        ]);

        insertBundle(itemID, groupID, 0);

        return;
      }

      // slotIDX 앞에 between, list 삽입
      case "END_LABEL": {
        updateSlot(slotIDX, slotIDX, groupID, bundleID, [
          "BETWEEN",
          "ITEM_LIST",
        ]);
        const insertIDX = groupDict[groupID].bundleList.length;
        insertBundle(itemID, groupID, insertIDX);

        return;
      }

      // slotID의 bundle의 itemList에 itemID 추가
      case "ITEM_LIST": {
        if (bundleID === undefined) return;

        const newBundle: UserAxisBundle = {
          ...bundleDict[bundleID],
          itemList: [...bundleDict[bundleID].itemList, itemID],
        };

        const newBundleDict = {
          ...bundleDict,
          [bundleID]: newBundle,
        };

        setBundleDict(newBundleDict);
        return;
      }

      default:
        return;
    }
  };

  return {
    groupDict,
    bundleDict,
    itemPositionDict,
    slotList,
    slotDict,
    pushItem,
  };
};

export default useHandleAxisData;
