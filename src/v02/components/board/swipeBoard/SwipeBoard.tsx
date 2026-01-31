import { useEffect } from "react";

import type { AxisType, BoardDirection, SlotDict } from "@interfacesV02/type";
import AxisMarker from "./marker/AxisMarker";
import * as S from "./SwipeBoard.styled";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import useBoardSwipe from "@hooksV02/board/useBoardSwipe";
import CurrentMarker from "./marker/CurrentMarker";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";
import type { UserAxisSlot } from "@interfacesV02/data/user";

type Parms = {
  dataList: AxisData[];
  axisList: AxisType[];
  initialH?: number;
  initialV?: number;

  // ✅ slot이 바뀔 때마다 부모로 전달
  onSlotChange?: (slot: SlotDict, direction: BoardDirection) => void;
};

const SwipeBoard = (parms: Parms) => {
  const { dataList, axisList, initialH, initialV, onSlotChange } = parms;

  if (dataList.length === 0 || axisList.length === 0) return null;

  const slotCount = dataList[0].slotList.length;

  const isHorizontal = axisList.includes("HORIZONTAL");
  const isVertical = axisList.includes("VERTICAL");

  const { boardSize, itemSummaryDict, stepPX } = useBoardDataContext();

  const {
    bind,
    slot,
    onPointerDown,
    onTransitionEnd,
    dragAxis,
    dragDirection,
  } = useBoardSwipe({
    slotCount,
    stepPX,
    initialH,
    initialV,
    isHorizontal,
    isVertical,
  });

  // ✅ slot이 바뀔 때마다 부모로 push
  useEffect(() => {
    if (dragDirection && onSlotChange) onSlotChange(slot, dragDirection);
  }, [slot, onSlotChange]);

  const getTranslate = (slotIDX: number) => {
    return boardSize / 2 + (slotCount / 2 - slotIDX) * stepPX - stepPX / 2;
  };

  const renderAxisMarker = (
    axis: AxisType,
    v: UserAxisSlot,
    vIDX: number,
    data: AxisData,
  ) => {
    const currentSlot = slot[axis] ?? 0;
    const isCurrent = currentSlot === vIDX;

    const isVisible =
      !(dragAxis === null && isCurrent) &&
      (dragAxis === null || dragAxis === axis);

    if (v.slotType === "ITEM_LIST" && v.userAxisBundleID !== undefined) {
      const bundle = data.bundleDict?.[v.userAxisBundleID];
      const itemList = bundle?.itemList;
      const lastItemIDX = itemList?.[itemList.length - 1];

      const item =
        lastItemIDX !== undefined ? itemSummaryDict[lastItemIDX] : undefined;
      if (!item) return null;

      return (
        <AxisMarker
          isVisible={isVisible}
          isSelected={dragAxis === axis}
          isCurrent={isCurrent}
          axis={axis}
          type={v.slotType}
          label={item.name}
          imgURL={item.thumbnailURL}
        />
      );
    }

    const groupId = v.userAxisGroupID;
    const group = groupId !== undefined ? data.groupDict?.[groupId] : undefined;
    if (!group) return null;

    return (
      <AxisMarker
        isVisible={isVisible}
        isSelected={dragAxis === axis}
        isCurrent={isCurrent}
        axis={axis}
        type={v.slotType}
        label={`${group.intensityLevel} ${group.axisSide}`}
      />
    );
  };

  return (
    <S.BoardContaienr {...bind} onPointerDown={onPointerDown} $size={boardSize}>
      <S.BoardAxisContainer>
        {isHorizontal && dragAxis !== "VERTICAL" && (
          <S.BoardAxis $axis="HORIZONTAL" />
        )}

        {isVertical && dragAxis !== "HORIZONTAL" && (
          <S.BoardAxis $axis="VERTICAL" />
        )}
      </S.BoardAxisContainer>

      {dataList.map((data, axisIDX) => {
        const axis = axisList[axisIDX];
        const currentSlot = slot[axis] ?? 0;

        return (
          <S.BoardAxisWrpper
            key={axis}
            onTransitionEnd={onTransitionEnd}
            $position={getTranslate(currentSlot)}
            $axis={axis}
          >
            {data.slotList.map((slotID, vIDX) => (
              <S.BoardAxisItem
                key={`${axis}-${vIDX}`}
                $size={stepPX}
                $axis={axis}
              >
                {renderAxisMarker(axis, data.slotDict[slotID], vIDX, data)}
              </S.BoardAxisItem>
            ))}
          </S.BoardAxisWrpper>
        );
      })}

      <CurrentMarker axis={dragAxis} />
    </S.BoardContaienr>
  );
};

export default SwipeBoard;
