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

type Params = {
  stepPX: number;
  slot: SlotDict;
  slotCount: SlotCount;
  dataDict: BoardAxisDict;

  dragAxis: AxisType | null;
  dragDirection: BoardDirection;
  isSolo: boolean;

  bind: SwipeBind;
  onPointerDown: any;
  onTransitionEnd: any;
};

const axisList: AxisType[] = ["HORIZONTAL", "VERTICAL"];
const directionList: DirectionType[] = ["START", "END"];

const SwipeBoard = (props: Params) => {
  const {
    stepPX,
    bind,
    dragAxis,
    dragDirection,
    onPointerDown,
    onTransitionEnd,
    isSolo,
    slotCount,
    dataDict,
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

  const getTranslatePx = (axis: AxisType, slotId: number) => {
    const data = dataDict[axis];
    if (!data) return 0;

    // 기존 로직 그대로 유지
    return (
      (slotCount[axis] / 2 - (slotId - data.startIDX)) * stepPX - stepPX / 2
    );
  };

  const buildChipInfo = (axis: AxisType | null) => {
    if (axis === null) return undefined;

    const data = dataDict[axis];
    if (!data) return undefined;

    const axisInfo = boardInformation.axisDict[data.type];
    if (!axisInfo) return undefined;

    return {
      START: {
        icon: axisInfo.axisSide.START.icon,
        colorLighter: axisInfo.axisSide.START.labelColor,
        colorLightest: axisInfo.axisSide.START.groupColor,
      },
      END: {
        icon: axisInfo.axisSide.END.icon,
        colorLighter: axisInfo.axisSide.END.labelColor,
        colorLightest: axisInfo.axisSide.END.groupColor,
      },
    };
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
    viewIndex: number,
    slotId: number,
  ) => {
    const currentSlotId = slot[axis] ?? 0;
    const isCurrent = currentSlotId === slotId;

    const { isSelected, isVisible } = getMarkerVisibility(axis, isCurrent);

    // 1) ITEM_LIST
    if (
      slotValue.slotType === "ITEM_LIST" &&
      slotValue.userAxisBundleID != null
    ) {
      const bundle = axisData.bundleDict?.[slotValue.userAxisBundleID];
      const itemList = bundle?.itemList;
      const lastItemId = itemList?.[itemList.length - 1];

      const item = lastItemId != null ? getItemSummary(lastItemId) : undefined;
      if (!item) return null;

      return (
        <S.BoardAxisItem key={`${axis}-${slotId}`} $size={stepPX} $axis={axis}>
          {" "}
          <AxisMarker
            isVisible={isVisible}
            isSelected={isSelected}
            isCurrent={isCurrent}
            axis={axis}
            type={slotValue.slotType}
            label={item.name}
            imgURL={item.thumbnailURL}
          />
        </S.BoardAxisItem>
      );
    }

    // 2) GROUP / etc
    const groupId = slotValue.userAxisGroupID;
    const axisInfo = boardInformation.axisDict[axisData.type];
    const groupSummary = axisInfo?.groupSummary[groupId];
    const group = axisData.groupDict[groupId];

    if (!groupSummary || !group) return null;

    const defaultIconIntensity =
      (groupSummary.axisSide === "START" && viewIndex === 0) ||
      (groupSummary.axisSide === "END" &&
        viewIndex === group.bundleList.length * 2)
        ? 100
        : 20;

    const iconIntensity = groupSummary.iconIntensity ?? defaultIconIntensity;
    const label =
      groupSummary.iconIntensity === undefined
        ? undefined
        : groupSummary.intensityLabel;

    return (
      <S.BoardAxisItem key={`${axis}-${slotId}`} $size={stepPX} $axis={axis}>
        <AxisMarker
          isVisible={isVisible}
          isSelected={isSelected}
          isCurrent={isCurrent}
          axis={axis}
          type={slotValue.slotType}
          label={label}
          icon={groupSummary.groupIcon}
          iconIntensity={iconIntensity}
        />
      </S.BoardAxisItem>
    );
  };

  const currentDirection =
    dragAxisUI === null ? null : dragDirection[dragAxisUI];

  return (
    <S.BoardContaienr {...bind} onPointerDown={onPointerDown}>
      {/* Blur */}
      {availableAxes.flatMap((axis) => {
        const data = dataDict[axis]!;
        const axisInfo = boardInformation.axisDict[data.type];
        if (!axisInfo) return [];

        return directionList.map((dir) => (
          <S.BoardBlur
            key={`${axis}-${dir}`}
            style={{
              opacity: dragAxis === axis && dragDirection[axis] === dir ? 1 : 0,
            }}
            $axis={axis}
            $direction={dir}
            $color={axisInfo.axisSide[dir].labelColor}
          />
        ));
      })}

      {/* Axis line */}
      {availableAxes.map((axis) => {
        if (dragAxis !== null && dragAxis !== axis) return null;
        return <S.BoardAxis key={axis} $axis={axis} />;
      })}

      {/* Axis slots */}
      {availableAxes.map((axis) => {
        const data = dataDict[axis]!;
        const currentSlotId = slot[axis] ?? 0;

        return (
          <S.BoardAxisWrpper
            key={axis}
            onTransitionEnd={onTransitionEnd}
            $position={getTranslatePx(axis, currentSlotId)}
            $axis={axis}
            $isCurrent={isSolo || axis === dragAxis}
          >
            {data.slotList
              .slice(data.startIDX, data.endIDX + 1)
              .map((slotId, viewIndex) =>
                renderAxisMarker(
                  axis,
                  data,
                  data.slotDict[slotId],
                  viewIndex,
                  slotId,
                ),
              )}
          </S.BoardAxisWrpper>
        );
      })}

      {/* Center marker */}
      <CurrentMarker
        axis={dragAxisUI}
        direction={currentDirection}
        chipInfo={buildChipInfo(dragAxisUI)}
        imgURL={currentItem.thumbnailURL}
      />
    </S.BoardContaienr>
  );
};

export default SwipeBoard;
