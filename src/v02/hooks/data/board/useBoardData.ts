export type UseBoardDataReturn = ReturnType<typeof useBoardData>;

import type { RoughAxisData } from "@interfacesV02/data/user";
import useHandleAxisData from "./useHandleAxisData";
import convertRoughAxisData from "@utilsV02/convertRoughAxisData";

type Parms = {
  horizontalRough?: RoughAxisData;
  verticalRough?: RoughAxisData;
  preferenceRough?: RoughAxisData;
};

const useBoardData = (parms: Parms) => {
  const {
    horizontalRough = [],
    verticalRough = [],
    preferenceRough = [],
  } = parms;
  const verticalData = convertRoughAxisData(verticalRough, 3, "EVALUATION");
  const horizontalData = convertRoughAxisData(horizontalRough, 3, "EVALUATION");
  const preferenceData = convertRoughAxisData(
    preferenceRough,
    11,
    "PREFERENCE",
  );

  const horizontal = useHandleAxisData({
    initialBundleDict: horizontalData.userAxisBundleDict,
    initialGroupDict: horizontalData.userAxisGroupDict,
    initialItemPositionDict: horizontalData.userAxisItemPosition,
    initialSlotList: horizontalData.userAxisSlotList,
    initialSlotDict: horizontalData.userAxisSlotDict,
  });

  const vertical = useHandleAxisData({
    initialBundleDict: verticalData.userAxisBundleDict,
    initialGroupDict: verticalData.userAxisGroupDict,
    initialItemPositionDict: verticalData.userAxisItemPosition,
    initialSlotList: verticalData.userAxisSlotList,
    initialSlotDict: verticalData.userAxisSlotDict,
  });

  const preference = useHandleAxisData({
    initialBundleDict: preferenceData.userAxisBundleDict,
    initialGroupDict: preferenceData.userAxisGroupDict,
    initialItemPositionDict: preferenceData.userAxisItemPosition,
    initialSlotList: preferenceData.userAxisSlotList,
    initialSlotDict: preferenceData.userAxisSlotDict,
  });

  const itemList: number[] = Object.keys(vertical.itemPositionDict).map(Number);

  return { horizontal, vertical, preference, itemList };
};

export default useBoardData;
