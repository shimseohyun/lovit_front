import { useMemo } from "react";
import useViewport from "@hooksV02/useViewPort";
import type {
  ItemIDList,
  UserPoint,
  UserPointDict,
} from "@interfacesV02/data/user";
import type { AxisData } from "@interfacesV02/type";

type Parms = {
  vertical: AxisData;
  horizontal: AxisData;
  preference: AxisData;
  itemList: ItemIDList;
  likedItemList?: ItemIDList;
};

const EVALUATION_GROUP_COUNT = 6;
const PREFERENCE_GROUP_COUNT = 11;

const CENTER_SIZE = 20;
const BOARD_PADDING_PX = 32;

const useGetBoardPoint = (parms: Parms) => {
  const { vertical, horizontal, preference, itemList, likedItemList } = parms;

  const { width } = useViewport();
  const BOARD_SIZE = Math.max(0, width - BOARD_PADDING_PX);

  const result = useMemo(() => {
    const points: UserPointDict = {};
    const likedPointsList: UserPoint[] = [];

    const isResult = likedItemList !== undefined;

    const get_bundle_count = (axis: AxisData, group_id: number) =>
      axis.groupDict[group_id]?.bundleList.length ?? 0;

    // group + bundle -> ratio(0~1)
    const get_ratio = (
      group_id: number,
      totalGroupCount: number,
      bundle_idx: number,
      total_bundle_count: number,
    ) => {
      const start = group_id / totalGroupCount;
      const gap = 1 / totalGroupCount;
      const inside = (bundle_idx + 1) / (total_bundle_count + 1);
      return start + gap * inside;
    };

    // axis + item -> percent(0~100)
    const getAxisPercent = (
      axis: AxisData,
      itemID: number,
      totalGroupCount: number,
      isCenterGap: boolean,
    ) => {
      const pos = axis.itemPositionDict[itemID];
      if (!pos) return null;

      const bundle_count = get_bundle_count(axis, pos.userAxisGroupID);
      const ratio = get_ratio(
        pos.userAxisGroupID,
        totalGroupCount,
        pos.userAxisBundleID,
        bundle_count,
      );

      const adjustedRatio = isCenterGap
        ? getRatioWithCenterGap(ratio, BOARD_SIZE, CENTER_SIZE)
        : ratio;

      return adjustedRatio * 100;
    };

    itemList.forEach((itemID) => {
      const x = getAxisPercent(
        horizontal,
        itemID,
        EVALUATION_GROUP_COUNT,
        true,
      );
      const y = getAxisPercent(vertical, itemID, EVALUATION_GROUP_COUNT, true);
      const pre = isResult
        ? getAxisPercent(preference, itemID, PREFERENCE_GROUP_COUNT, false)
        : null;

      if (x === null || y === null || (isResult && pre === null)) return;

      const isLiked = likedItemList?.includes(itemID) ?? false;

      const point: UserPoint = {
        id: itemID,
        horizontaPos: x,
        verticalPos: y,
        isLiked: isLiked,
        ...(isResult ? { preferenceSize: pre! } : {}),
      };

      points[itemID] = point;
      if (isLiked) likedPointsList.push(point);
    });

    return { points, likedPointsList };
  }, [vertical, horizontal, preference, itemList, likedItemList, BOARD_SIZE]);

  return result;
};

export default useGetBoardPoint;

const getRatioWithCenterGap = (
  origin: number,
  BOARD_SIZE: number,
  CENTER_SIZE: number,
) => {
  const clamped_ratio = Math.max(0, Math.min(1, origin)); // 0~1
  const CENTER_GAP_PX = Math.max(0, Math.min(CENTER_SIZE, BOARD_SIZE - 1e-6));
  const shrink_ratio =
    BOARD_SIZE > 0 ? (BOARD_SIZE - CENTER_GAP_PX) / BOARD_SIZE : 0;

  if (clamped_ratio < 0.5) {
    return clamped_ratio * shrink_ratio;
  }

  const center_half_ratio =
    BOARD_SIZE > 0 ? CENTER_GAP_PX / (2 * BOARD_SIZE) : 0;
  return 0.5 + center_half_ratio + (clamped_ratio - 0.5) * shrink_ratio;
};
