import type { RoughAxisData } from "@interfacesV02/data/user";
import useHandleAxisData from "./useHandleAxisData";
import convertRoughAxisData from "@utilsV02/convertRoughAxisData";

type Parms = {
  horizontalRough?: RoughAxisData;
  verticalRough?: RoughAxisData;
};
const useBoardData = (parms: Parms) => {
  const { horizontalRough = [], verticalRough = [] } = parms;
  const verticalData = convertRoughAxisData(verticalRough, 3, "EVALUATION");
  const horizontalData = convertRoughAxisData(horizontalRough, 3, "EVALUATION");

  const horizontal = useHandleAxisData({
    initialBundleDic: horizontalData.userAxisBundleDict,
    initialGroupDict: horizontalData.userAxisGroupDict,
    initialItemPositionDict: horizontalData.userAxisItemPosition,
    initialSlotList: horizontalData.userAxisSlotList,
  });
  const vertical = useHandleAxisData({
    initialBundleDic: verticalData.userAxisBundleDict,
    initialGroupDict: verticalData.userAxisGroupDict,
    initialItemPositionDict: verticalData.userAxisItemPosition,
    initialSlotList: verticalData.userAxisSlotList,
  });

  const itemList = Object.keys(vertical.itemPositionDict).map(Number);
  return { horizontal, vertical, itemList };
};

export default useBoardData;
