import type { AxisType, SlotDict } from "@interfacesV02/type";

import * as S from "./SwipeBoard.styled";

import CurrentMarker from "./marker/CurrentMarker";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";
import type { UserAxisSlot } from "@interfacesV02/data/user";
import type { SwipeBind } from "@hooksV02/swipe/useSwipe";
import AxisMarker from "./marker/AxisMarker";

type Parms = {
  boardSize: number;
  stepPX: number;
  slotCount: number;

  dataList: AxisData[];
  axisList: AxisType[];

  slot: SlotDict;

  dragAxis: AxisType | null;

  bind: SwipeBind;
  onPointerDown: any;
  onTransitionEnd: any;

  itemSummaryDict: Record<number, { name: string; thumbnailURL: string }>;
};

const SwipeBoard = (parms: Parms) => {
  const {
    boardSize,
    stepPX,
    slotCount,
    dataList,
    axisList,
    slot,
    dragAxis,
    bind,
    onPointerDown,
    onTransitionEnd,
    itemSummaryDict,
  } = parms;

  // 항상 드래그 상태를 유지
  const isSolo = dataList.length === 1;
  const isHorizontal = axisList.includes("HORIZONTAL");
  const isVertical = axisList.includes("VERTICAL");

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
    const isSelected = isSolo || dragAxis === axis;

    const isVisible =
      isSolo ||
      (!(dragAxis === null && isCurrent) && (dragAxis === null || isSelected));

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
          isSelected={isSelected}
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
        isSelected={isSelected}
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

      <CurrentMarker
        axis={isSolo ? (isHorizontal ? "HORIZONTAL" : "VERTICAL") : dragAxis}
      />
    </S.BoardContaienr>
  );
};

export default SwipeBoard;
