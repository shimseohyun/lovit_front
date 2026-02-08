import type {
  AxisType,
  BoardAxisDict,
  SlotCount,
  SlotDict,
} from "@interfacesV02/type";

import * as S from "./SwipeBoard.styled";

import type { UserAxisSlot } from "@interfacesV02/data/user";
import type { SwipeBind } from "@hooksV02/swipe/useSwipe";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/board/context/context";
import AxisMarker from "./components/AxisMarker";
import CurrentMarker from "./components/CurrentMarker";
import { getItemSummary } from "@dataV02/itemSummary";
import type { AxisData } from "@interfacesV02/type";

type Parms = {
  stepPX: number;
  slot: SlotDict;
  slotCount: SlotCount;
  dataDict: BoardAxisDict;

  dragAxis: AxisType | null;
  isSolo: boolean;
  bind: SwipeBind;
  onPointerDown: any;
  onTransitionEnd: any;
};

const SwipeBoard = (parms: Parms) => {
  const {
    stepPX,

    bind,
    dragAxis,
    onPointerDown,
    onTransitionEnd,
    isSolo,
    slotCount,
    dataDict,
    slot,
  } = parms;

  const axisList: AxisType[] = ["HORIZONTAL", "VERTICAL"];

  const { boardInformation } = useBoardStaticContext();
  const { currentItem } = useBoardStepContext();

  const getTranslate = (slotIDX: number, axis: AxisType) => {
    if (dataDict[axis] === undefined) return;

    return (
      (slotCount[axis] / 2 - (slotIDX - dataDict[axis].startIDX)) * stepPX -
      stepPX / 2
    );
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
        lastItemIDX !== undefined ? getItemSummary(lastItemIDX) : undefined;
      if (!item) return null;

      return (
        <AxisMarker
          isVisible={isVisible}
          isSelected={isSelected}
          isCurrent={isCurrent}
          axis={axis}
          type={v.slotType}
          label={item.name}
          // label={`${vIDX}`}
          imgURL={item.thumbnailURL}
        />
      );
    } else {
      const groupID = v.userAxisGroupID;
      const groupSummary =
        boardInformation.axisDict[data.type].groupSummary[groupID];

      return (
        <AxisMarker
          isVisible={isVisible}
          isSelected={isSelected}
          isCurrent={isCurrent}
          axis={axis}
          type={v.slotType}
          label={groupSummary.intensityLabel}
          // label={`${vIDX}`}
          icon={groupSummary.groupIcon}
          iconIntensity={groupSummary.iconIntensity}
        />
      );
    }
  };

  return (
    <S.BoardContaienr {...bind} onPointerDown={onPointerDown}>
      {axisList.map((axis, axisID) => {
        const data = dataDict[axis];
        if (data === undefined) return;

        const currentSlot = slot[axis] ?? 0;

        return (
          <S.BoardAxisWrpper
            key={axisID}
            onTransitionEnd={onTransitionEnd}
            $position={getTranslate(currentSlot, axis) ?? 0}
            $axis={axis}
            $isCurrent={isSolo || axis == dragAxis}
          >
            {(dragAxis === axis || dragAxis === null) && (
              <S.BoardAxis $axis={axis} />
            )}

            {data.slotList
              .slice(data.startIDX, data.endIDX + 1)
              .map((slotID, vIDX) => (
                <S.BoardAxisItem
                  key={`${axis}-${vIDX}`}
                  $size={stepPX}
                  $axis={axis}
                >
                  {renderAxisMarker(axis, data.slotDict[slotID], slotID, data)}
                </S.BoardAxisItem>
              ))}
          </S.BoardAxisWrpper>
        );
      })}

      <CurrentMarker
        imgURL={currentItem.thumbnailURL}
        axis={
          isSolo
            ? dataDict.HORIZONTAL !== undefined
              ? "HORIZONTAL"
              : "VERTICAL"
            : dragAxis
        }
      />
    </S.BoardContaienr>
  );
};

export default SwipeBoard;
