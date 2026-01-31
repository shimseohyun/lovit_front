import type { AxisType } from "@interfacesV02/type";
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
};

const SwipeBoard = (parms: Parms) => {
  const { dataList, axisList } = parms;
  const isSolo = dataList.length === 1;

  const {
    bind,
    onPointerDown,
    onTransitionEnd,
    translate,
    isAnimating,
    dragAxis,
  } = useBoardSwipe();

  const { boardSize, evaluationSlot, itemSummaryDict, stepPX } =
    useBoardDataContext();

  if (evaluationSlot === undefined) return;

  const renderAxisMarker = (
    axis: AxisType,
    v: UserAxisSlot,
    vIDX: number,
    data: AxisData,
  ) => {
    const isCurrent =
      evaluationSlot[axis === "HORIZONTAL" ? "horizontal" : "vertical"] ===
      vIDX;
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
    } else {
      const groupId = v.userAxisGroupID;
      const group =
        groupId !== undefined ? data.groupDict?.[groupId] : undefined;

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
    }
  };

  return (
    <>
      <S.BoardContaienr
        {...bind}
        onPointerDown={onPointerDown}
        $size={boardSize}
      >
        <S.BoardAxisContainer>
          {dragAxis !== "VERTICAL" && <S.BoardAxis $axis="HORIZONTAL" />}

          {dragAxis !== "HORIZONTAL" && <S.BoardAxis $axis="VERTICAL" />}
        </S.BoardAxisContainer>

        {dataList.map((data, axisIDX) => {
          const axis = axisList[axisIDX];

          const pos = axis === "HORIZONTAL" ? "x" : "y";
          return (
            <S.BoardAxisWrpper
              key={axis}
              onTransitionEnd={onTransitionEnd}
              $position={translate[pos]}
              $axis={axis}
              $isAnimating={isAnimating}
            >
              {data.slotList.map((v, vIDX) => (
                <S.BoardAxisItem
                  key={`${axis}-${v.slotID}`}
                  $size={stepPX}
                  $axis={axis}
                >
                  {renderAxisMarker(axis, v, vIDX, data)}
                </S.BoardAxisItem>
              ))}
            </S.BoardAxisWrpper>
          );
        })}
        <CurrentMarker axis={dragAxis} />
      </S.BoardContaienr>
    </>
  );
};

export default SwipeBoard;
