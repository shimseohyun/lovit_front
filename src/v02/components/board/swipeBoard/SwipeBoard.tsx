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
import AxisMarker from "./marker/AxisMarker";
import CurrentMarker from "./marker/CurrentMarker";
import { getItemSummary } from "@dataV02/itemSummary";
import type { AxisData } from "@interfacesV02/type";

type Parms = {
  boardSize: number;
  stepPX: number;
  slot: SlotDict;
  slotCount: SlotCount;
  dataDict: BoardAxisDict;

  dragAxis: AxisType | null;

  bind: SwipeBind;
  onPointerDown: any;
  onTransitionEnd: any;
};

const SwipeBoard = (parms: Parms) => {
  const {
    boardSize,
    stepPX,

    dragAxis,
    bind,
    onPointerDown,
    onTransitionEnd,

    slotCount,
    dataDict,
    slot,
  } = parms;

  const { boardInformation } = useBoardStaticContext();
  const { currentItemID } = useBoardStepContext();

  const isHorizontal = dataDict.HORIZONTAL !== undefined;
  const isVertical = dataDict.VERTICAL !== undefined;

  // 항상 드래그 상태를 유지
  const isSolo = !(isHorizontal && isVertical);

  const getTranslate = (slotIDX: number, axis: AxisType) => {
    return (
      boardSize / 2 + (slotCount[axis] / 2 - slotIDX) * stepPX - stepPX / 2
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
          icon={groupSummary.groupIcon}
        />
      );
    }
  };

  const axisList: AxisType[] = ["HORIZONTAL", "VERTICAL"];

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

      {axisList.map((axis, axisID) => {
        const data = dataDict[axis];
        if (data === undefined) return;

        const currentSlot = slot[axis] ?? 0;

        return (
          <S.BoardAxisWrpper
            key={axisID}
            onTransitionEnd={onTransitionEnd}
            $position={getTranslate(currentSlot, axis)}
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
        imgURL={getItemSummary(currentItemID).thumbnailURL}
        axis={isSolo ? (isHorizontal ? "HORIZONTAL" : "VERTICAL") : dragAxis}
      />
    </S.BoardContaienr>
  );
};

export default SwipeBoard;
