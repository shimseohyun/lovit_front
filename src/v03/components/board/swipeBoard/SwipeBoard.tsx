import type {
  AxisData,
  AxisType,
  BoardAxisDict,
  BoardDirection,
  DirectionType,
  SlotCount,
  SlotDict,
} from "@interfacesV03/type";

import * as S from "./SwipeBoard.styled";

import type { UserAxisSlot } from "@interfacesV03/data/user";
import type { SwipeBind } from "@hooksV03/swipe/useSwipe";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV03/board/context/context";

import AxisMarker from "./components/AxisMarker";
import CurrentMarker from "./components/CurrentMarker";
import { getItemSummary } from "@dataV03/itemSummary";
import AxisMarkerLabel from "./components/AxisMarkerLabel";

type Params = {
  stepPX: number;
  slot: SlotDict;
  slotCount: SlotCount;
  dataDict: BoardAxisDict;

  dragAxis: AxisType | null;
  dragDirection: BoardDirection | null;
  isSolo: boolean;

  bind: SwipeBind;
  onPointerDown: any;
  onTransitionEnd: any;
};

const axisList: AxisType[] = ["HORIZONTAL", "VERTICAL"];

const SwipeBoard = (props: Params) => {
  const {
    stepPX,
    bind,
    dragAxis,
    onPointerDown,
    onTransitionEnd,
    isSolo,
    slotCount,
    dataDict,
    dragDirection,
    slot,
  } = props;

  const { boardInformation } = useBoardStaticContext();
  const { currentItem } = useBoardStepContext();

  const availableAxes = axisList.filter((axis) => dataDict[axis] !== undefined);

  const dragAxisUI: AxisType | null = isSolo
    ? dataDict.HORIZONTAL !== undefined
      ? "HORIZONTAL"
      : "VERTICAL"
    : dragAxis;

  const dragDirectionUI: DirectionType | null =
    dragAxisUI === null || dragDirection === null
      ? null
      : dragDirection[dragAxisUI];

  const getTranslatePx = (axis: AxisType, slotID: number) => {
    const data = dataDict[axis];
    if (!data) return 0;

    // 기존 로직 그대로 유지
    return (
      (slotCount[axis] / 2 - (slotID - data.startIDX)) * stepPX - stepPX / 2
    );
  };

  const getMarkerVisibility = (axis: AxisType, isCurrent: boolean) => {
    if (isSolo) return { isSelected: true, isVisible: true };

    const isSelected = dragAxis === axis;

    // 원래 식:
    // isSolo || (!(dragAxis === null && isCurrent) && (dragAxis === null || isSelected))
    if (dragAxis === null) return { isSelected, isVisible: !isCurrent };
    return { isSelected, isVisible: isSelected };
  };

  const renderAxisMarker = (
    axis: AxisType,
    axisData: AxisData,
    slotValue: UserAxisSlot,

    slotID: number,
  ) => {
    const currentSlotID = slot[axis] ?? 0;
    const currentSlotType = axisData.slotDict[currentSlotID].slotType;
    const isCurrent = currentSlotID === slotID;

    const { isSelected, isVisible } = getMarkerVisibility(axis, isCurrent);

    const isLabelVisible =
      currentSlotID - 1 === slotID || currentSlotID + 1 === slotID;

    const isLabelSelected =
      (currentSlotID - 1 === slotID && dragDirectionUI === "START") ||
      (currentSlotID + 1 === slotID && dragDirectionUI === "END");

    const groupID = slotValue.userAxisGroupID;
    const axisInfo = boardInformation.axisDict[axisData.type];
    const groupSummary = axisInfo?.groupSummary[groupID];
    const group = axisData.groupDict[groupID];

    if (
      slotValue.slotType === "ITEM_LIST" &&
      slotValue.userAxisBundleID != null
    ) {
      const bundle = axisData.bundleDict?.[slotValue.userAxisBundleID];
      const itemList = bundle?.itemList;
      const lastItemID = itemList?.[itemList.length - 1];

      const item = lastItemID != null ? getItemSummary(lastItemID) : undefined;
      if (!item) return null;

      return (
        <S.BoardAxisItem key={`${axis}-${slotID}`} $size={stepPX} $axis={axis}>
          <AxisMarkerLabel
            axis={dragAxisUI}
            direction={dragDirectionUI}
            label={`만큼\n${groupSummary.groupLabel}`}
            isVisible={isLabelVisible}
            isSelected={isLabelSelected}
          />
          <AxisMarker
            isVisible={isVisible}
            isSelected={isSelected}
            isWillCurrent={isLabelSelected}
            isCurrent={isCurrent}
            axis={axis}
            type={slotValue.slotType}
            label={item.name}
            imgURL={item.thumbnailURL}
          />
        </S.BoardAxisItem>
      );
    }

    if (!groupSummary || !group) return null;

    const direction: DirectionType = slotID < currentSlotID ? "START" : "END";

    const icon =
      boardInformation.axisDict[axisData.type].axisSide[
        axisData.type === "PREFERENCE"
          ? direction
          : slotValue.slotType == "START_LABEL"
            ? "START"
            : slotValue.slotType == "END_LABEL"
              ? "END"
              : direction
      ].icon;

    const comparisonLabel =
      boardInformation.axisDict[axisData.type].axisSide[
        currentSlotID > slotID ? "START" : "END"
      ].label;

    const label =
      groupSummary.iconIntensity === undefined
        ? undefined
        : groupSummary.intensityLabel;

    const isCurrentVisible =
      isVisible && currentSlotID - 2 <= slotID && slotID <= currentSlotID + 2;

    return (
      <S.BoardAxisItem key={`${axis}-${slotID}`} $size={stepPX} $axis={axis}>
        <AxisMarkerLabel
          isVisible={currentSlotType !== "CENTER_LABEL" && isLabelVisible}
          isSelected={isLabelSelected}
          axis={dragAxisUI}
          direction={dragDirectionUI}
          label={`보다\n${comparisonLabel}`}
        />
        <AxisMarker
          isVisible={isCurrentVisible}
          isSelected={isSelected}
          isCurrent={isCurrent}
          isWillCurrent={isCurrent}
          axis={axis}
          type={slotValue.slotType}
          label={slotValue.slotType === "BETWEEN" ? undefined : label}
          icon={icon}
          startIcon={
            boardInformation.axisDict[axisData.type].axisSide["START"].icon
          }
          endIcon={
            boardInformation.axisDict[axisData.type].axisSide["END"].icon
          }
        />
      </S.BoardAxisItem>
    );
  };

  return (
    <S.BoardContaienr {...bind} onPointerDown={onPointerDown}>
      {/* Axis line */}
      {availableAxes.map((axis) => {
        if (dragAxis !== null && dragAxis !== axis) return null;
        return <S.BoardAxis key={axis} $axis={axis} />;
      })}

      {/* Axis slots */}
      {availableAxes.map((axis) => {
        const data = dataDict[axis]!;
        const currentSlotID = slot[axis] ?? 0;

        return (
          <S.BoardAxisWrpper
            key={axis}
            onTransitionEnd={onTransitionEnd}
            $position={getTranslatePx(axis, currentSlotID)}
            $axis={axis}
            $isCurrent={isSolo || axis === dragAxis}
          >
            {data.slotList
              .slice(data.startIDX, data.endIDX + 1)
              .map((slotID) =>
                renderAxisMarker(axis, data, data.slotDict[slotID], slotID),
              )}
          </S.BoardAxisWrpper>
        );
      })}

      <CurrentMarker
        axis={dragAxisUI}
        direction={dragDirectionUI}
        imgURL={currentItem.thumbnailURL}
      />
    </S.BoardContaienr>
  );
};

export default SwipeBoard;
