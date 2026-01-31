import { memo } from "react";
import type { AxisType } from "@interfacesV02/type";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";
import type { UserAxisSlot } from "@interfacesV02/data/user";
import AxisMarker from "./marker/AxisMarker";
import CurrentMarker from "./marker/CurrentMarker";
import * as S from "./SwipeBoard.styled";

type ViewProps = {
  boardSize: number;
  stepPX: number;
  slotCount: number;

  dataList: AxisData[];
  axisList: AxisType[];

  // ✅ SlotDict 대신 axis별 현재 slot 번호만 받으면 비교가 쉬워져요
  currentH: number;
  currentV: number;

  dragAxis: AxisType | null;

  bind: any; // useBoardSwipe의 bind 타입 있으면 그걸로 교체
  onPointerDown: any;
  onTransitionEnd: any;

  itemSummaryDict: Record<number, { name: string; thumbnailURL: string }>;
};

const getTranslate = (
  boardSize: number,
  slotCount: number,
  stepPX: number,
  slotIDX: number,
) => boardSize / 2 + (slotCount / 2 - slotIDX) * stepPX - stepPX / 2;

const SwipeBoard = memo(function SwipeBoard(props: ViewProps) {
  const {
    boardSize,
    stepPX,
    slotCount,
    dataList,
    axisList,
    currentH,
    currentV,
    dragAxis,
    bind,
    onPointerDown,
    onTransitionEnd,
    itemSummaryDict,
  } = props;

  const isHorizontal = axisList.includes("HORIZONTAL");
  const isVertical = axisList.includes("VERTICAL");

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
        const currentSlot = axis === "HORIZONTAL" ? currentH : currentV;

        return (
          <AxisLane
            key={`Lane-${axis}-${axisIDX}`}
            axis={axis}
            data={data}
            currentSlot={currentSlot}
            boardSize={boardSize}
            stepPX={stepPX}
            slotCount={slotCount}
            dragAxis={dragAxis}
            onTransitionEnd={onTransitionEnd}
            itemSummaryDict={itemSummaryDict}
          />
        );
      })}

      <CurrentMarker axis={dragAxis} />
    </S.BoardContaienr>
  );
});

type AxisLaneProps = {
  axis: AxisType;
  data: AxisData;
  currentSlot: number;
  boardSize: number;
  stepPX: number;
  slotCount: number;
  dragAxis: AxisType | null;
  onTransitionEnd: any;
  itemSummaryDict: Record<number, { name: string; thumbnailURL: string }>;
};

// ✅ 축 단위 memo: 다른 축 slot이 바뀌면 이 축은 스킵 가능
const AxisLane = memo(
  function AxisLane(props: AxisLaneProps) {
    const {
      axis,
      data,
      currentSlot,
      boardSize,
      stepPX,
      slotCount,
      dragAxis,
      onTransitionEnd,
      itemSummaryDict,
    } = props;

    const position = getTranslate(boardSize, slotCount, stepPX, currentSlot);

    return (
      <S.BoardAxisWrpper
        onTransitionEnd={onTransitionEnd}
        $position={position}
        $axis={axis}
      >
        {data.slotList.map((slotID, vIDX) => (
          <S.BoardAxisItem
            key={`Item-${axis}-${slotID}`}
            $size={stepPX}
            $axis={axis}
          >
            <AxisCell
              axis={axis}
              slotData={data.slotDict[slotID]}
              vIDX={vIDX}
              currentSlot={currentSlot}
              dragAxis={dragAxis}
              itemSummaryDict={itemSummaryDict}
              groupDict={data.groupDict}
              bundleDict={data.bundleDict}
            />
          </S.BoardAxisItem>
        ))}
      </S.BoardAxisWrpper>
    );
  },
  (prev, next) =>
    prev.axis === next.axis &&
    prev.data === next.data &&
    prev.currentSlot === next.currentSlot &&
    prev.dragAxis === next.dragAxis &&
    prev.boardSize === next.boardSize &&
    prev.stepPX === next.stepPX &&
    prev.slotCount === next.slotCount &&
    prev.onTransitionEnd === next.onTransitionEnd &&
    prev.itemSummaryDict === next.itemSummaryDict,
);

type AxisCellProps = {
  axis: AxisType;
  slotData: UserAxisSlot;
  vIDX: number;
  currentSlot: number;
  dragAxis: AxisType | null;

  itemSummaryDict: Record<number, { name: string; thumbnailURL: string }>;
  groupDict?: any;
  bundleDict?: any;
};

// ✅ 칸 단위 memo: currentSlot 바뀌어도 “이전/현재 칸”만 props 변화 → 나머지 스킵
const AxisCell = memo(
  function AxisCell(props: AxisCellProps) {
    const {
      axis,
      slotData,
      vIDX,
      currentSlot,
      dragAxis,
      itemSummaryDict,
      groupDict,
      bundleDict,
    } = props;

    const isCurrent = currentSlot === vIDX;
    const isVisible =
      !(dragAxis === null && isCurrent) &&
      (dragAxis === null || dragAxis === axis);

    if (
      slotData.slotType === "ITEM_LIST" &&
      slotData.userAxisBundleID !== undefined
    ) {
      const bundle = bundleDict?.[slotData.userAxisBundleID];
      const itemList = bundle?.itemList as number[] | undefined;
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
          type={slotData.slotType}
          label={item.name}
          imgURL={item.thumbnailURL}
        />
      );
    }

    const groupId = slotData.userAxisGroupID;
    const group = groupId !== undefined ? groupDict?.[groupId] : undefined;
    if (!group) return null;

    return (
      <AxisMarker
        isVisible={isVisible}
        isSelected={dragAxis === axis}
        isCurrent={isCurrent}
        axis={axis}
        type={slotData.slotType}
        label={`${group.intensityLevel} ${group.axisSide}`}
      />
    );
  },
  (prev, next) =>
    prev.axis === next.axis &&
    prev.slotData === next.slotData &&
    prev.vIDX === next.vIDX &&
    prev.currentSlot === next.currentSlot &&
    prev.dragAxis === next.dragAxis &&
    prev.itemSummaryDict === next.itemSummaryDict &&
    prev.groupDict === next.groupDict &&
    prev.bundleDict === next.bundleDict,
);

export default SwipeBoard;
