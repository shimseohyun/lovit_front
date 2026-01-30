import type { AxisType } from "@interfacesV02/type";
import AxisMarker from "./marker/AxisMarker";
import * as S from "./SwipeEvaluationBoard.styled";
import { useBoardDataContext } from "@hooksV02/data/contextBoardData";

const AXES = ["VERTICAL", "HORIAONTAL"] as const satisfies readonly AxisType[];

const SwipeEvaluationBoard = () => {
  const { boardSize, boardSlot, vertical, horizontal, itemSummaryDict } =
    useBoardDataContext();

  if (boardSlot === undefined) return null;

  const axisByType: Record<AxisType, typeof vertical> = {
    VERTICAL: vertical,
    HORIAONTAL: horizontal,
  };

  const renderAxisMarker = (
    axis: AxisType,
    v: (typeof vertical.slotList)[number],
  ) => {
    const axisData = axisByType[axis];

    if (v.slotType === "ITEM_LIST" && v.userAxisBundleID !== undefined) {
      const bundle = axisData.bundleDict?.[v.userAxisBundleID];
      const itemList = bundle?.itemList;
      const lastItemIDX = itemList?.[itemList.length - 1];

      const item =
        lastItemIDX !== undefined ? itemSummaryDict[lastItemIDX] : undefined;
      if (!item) return null;

      return (
        <AxisMarker
          isSelected={false}
          axis={axis}
          type={v.slotType}
          label={item.name}
          imgURL={item.thumbnailURL}
        />
      );
    } else {
      const groupId = v.userAxisGroupID;
      const group =
        groupId !== undefined ? axisData.groupDict?.[groupId] : undefined;
      if (!group) return null;

      return (
        <AxisMarker
          isSelected={false}
          axis={axis}
          type={v.slotType}
          label={`${group.intensityLevel} ${group.axisSide}`}
        />
      );
    }
  };

  return (
    <S.BoardContaienr $size={boardSize}>
      {AXES.map((axis) => {
        const axisData = axisByType[axis];

        return (
          <S.BoardAxisWrpper key={axis} $position={80} $axis={axis}>
            {axisData.slotList.map((v) => (
              <S.BoardAxisItem
                key={`${axis}-${v.slotID}`}
                $size={80}
                $axis={axis}
              >
                {renderAxisMarker(axis, v)}
              </S.BoardAxisItem>
            ))}
          </S.BoardAxisWrpper>
        );
      })}
    </S.BoardContaienr>
  );
};

export default SwipeEvaluationBoard;
