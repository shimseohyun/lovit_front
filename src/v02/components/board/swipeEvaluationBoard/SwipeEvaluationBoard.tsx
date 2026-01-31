import type { AxisType } from "@interfacesV02/type";
import AxisMarker from "./marker/AxisMarker";
import * as S from "./SwipeEvaluationBoard.styled";
import { useBoardDataContext } from "@hooksV02/data/contextBoardData";
import useBoardSwipe from "@hooksV02/board/useBoardSwipe";
import CurrentMarker from "./marker/CurrentMarker";

const axisList = ["VERTICAL", "HORIZONTAL"] as AxisType[];

const SwipeEvaluationBoard = () => {
  const {
    bind,

    onPointerDown,
    onTransitionEnd,
    translate,
    isAnimating,
    dragAxis,
  } = useBoardSwipe();

  const {
    boardSize,
    vertical,
    horizontal,
    boardSlot,
    itemSummaryDict,
    stepPX,
  } = useBoardDataContext();

  if (boardSlot === undefined) return;

  const axisByType: Record<
    AxisType,
    { data: typeof vertical; position: "x" | "y" }
  > = {
    VERTICAL: { data: vertical, position: "y" },
    HORIZONTAL: { data: horizontal, position: "x" },
  };

  const renderAxisMarker = (
    axis: AxisType,
    v: (typeof vertical.slotList)[number],
    vIDX: number,
  ) => {
    const axisData = axisByType[axis].data;

    const isCurrent =
      boardSlot[axis === "HORIZONTAL" ? "horizontal" : "vertical"] === vIDX;
    const isVisible =
      !(dragAxis === null && isCurrent) &&
      (dragAxis === null || dragAxis === axis);

    if (v.slotType === "ITEM_LIST" && v.userAxisBundleID !== undefined) {
      const bundle = axisData.bundleDict?.[v.userAxisBundleID];
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
        groupId !== undefined ? axisData.groupDict?.[groupId] : undefined;

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

        {axisList.map((axis) => {
          const axisData = axisByType[axis].data;

          return (
            <S.BoardAxisWrpper
              key={axis}
              onTransitionEnd={onTransitionEnd}
              $position={translate[axisByType[axis].position]}
              $axis={axis}
              $isAnimating={isAnimating}
            >
              {axisData.slotList.map((v, vIDX) => (
                <S.BoardAxisItem
                  key={`${axis}-${v.slotID}`}
                  $size={stepPX}
                  $axis={axis}
                >
                  {renderAxisMarker(axis, v, vIDX)}
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

export default SwipeEvaluationBoard;
