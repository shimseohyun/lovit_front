import * as S from "./SwipeBoard.styled";

import useBoardSwipe from "@hooks/board/useBoardSwipe";

import { useBoardStatic } from "@hooks/board/context/BoardContext";

import SwipeBoardMarkerHorizontal from "./markers/SwipeBoardMarkerHorizontal";
import SwipeBoardMarkerVertical from "./markers/SwipeBoardMarkerVertical";
import SelectedSwipeBoardMarkerHorizontal from "./markers/SelectedSwipeBoardMarkerHorizontal";
import SelectedSwipeBoardMarkerVertical from "./markers/SelectedSwipeBoardMarkerVertical";

import { colGroupLabel, rowGroupLabel } from "@hooks/board/useBoardDescription";
import type { Summary } from "@interfaces/type";
import type { BoardData, SwipeAxis } from "@hooks/board/type";

type Parms = {
  currentItem: Summary;
};
const SwipeBoard = (parms: Parms) => {
  const { currentItem } = parms;
  const { config, rowData, colData, colCount, rowCount, summaryData } =
    useBoardStatic();

  const { screenWidth, screenHeight, stepPx } = config;

  const {
    bind,
    onPointerDown,
    onTransitionEnd,
    translate,
    isAnimating,
    isDragging,
    dragAxis,
  } = useBoardSwipe();

  type AxisData = {
    data: BoardData;
    count: number[];
    groupLabel: string[];
    translate: "x" | "y";
  };
  const axisData: Record<SwipeAxis, AxisData> = {
    vertical: {
      data: colData,
      groupLabel: colGroupLabel,
      count: colCount,
      translate: "y",
    },
    horizontal: {
      data: rowData,
      groupLabel: rowGroupLabel,
      count: rowCount,
      translate: "x",
    },
  };

  const axisList: SwipeAxis[] = ["horizontal", "vertical"];

  return (
    <>
      <S.Wrapper
        {...bind}
        onPointerDown={onPointerDown}
        width={screenWidth}
        height={screenHeight}
      >
        {axisList.map((axis) => {
          const data = axisData[axis];
          const countList = data["count"];

          return (
            <S.SwipeAxisContainer
              key={axis}
              $axis={axis}
              onTransitionEnd={onTransitionEnd}
              count={countList.length}
              stepPx={stepPx}
              size={translate[data["translate"]]}
              isAnimating={isAnimating}
            >
              <S.SwipeAxisDescriptionList $axis={axis}>
                {countList.map((count, i) => {
                  return (
                    <S.SwipeAxisDescription
                      $size={stepPx * (count + 1)}
                      $axis={axis}
                      key={`description-${axis}-${i}`}
                    >
                      <S.SwipeAxisDescriptionLabel
                        $axis={axis}
                        $currentAxis={dragAxis}
                      >
                        {data["groupLabel"][i]}
                      </S.SwipeAxisDescriptionLabel>
                    </S.SwipeAxisDescription>
                  );
                })}
              </S.SwipeAxisDescriptionList>

              {colData.map((id) => (
                <S.SwipeAxisMarkerContainer
                  $axis={axis}
                  $size={stepPx}
                  key={`marker-${axis}-${id}`}
                >
                  {id < 0 ? (
                    <S.SwipeAxisSeparator $axis={axis} />
                  ) : axis === "horizontal" ? (
                    <SwipeBoardMarkerHorizontal
                      key={id}
                      info={summaryData[id]}
                      isSelected={isDragging && dragAxis === axis}
                    />
                  ) : (
                    <SwipeBoardMarkerVertical
                      key={id}
                      info={summaryData[id]}
                      isSelected={isDragging && dragAxis === axis}
                    />
                  )}
                </S.SwipeAxisMarkerContainer>
              ))}
            </S.SwipeAxisContainer>
          );
        })}
      </S.Wrapper>

      {isDragging && dragAxis !== null ? (
        dragAxis === "horizontal" ? (
          <SelectedSwipeBoardMarkerHorizontal info={currentItem} />
        ) : (
          <SelectedSwipeBoardMarkerVertical info={currentItem} />
        )
      ) : (
        <S.Cursor />
      )}
    </>
  );
};

export default SwipeBoard;
