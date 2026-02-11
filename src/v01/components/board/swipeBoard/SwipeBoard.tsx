import * as S from "./SwipeBoard.styled";

import useBoardSwipe from "@hooksV01/board/useBoardSwipe";

import {
  useBoardState,
  useBoardStatic,
} from "@hooksV01/board/context/BoardContext";

import SwipeBoardMarkerHorizontal from "./markers/SwipeBoardMarkerHorizontal";
import SwipeBoardMarkerVertical from "./markers/SwipeBoardMarkerVertical";
import SelectedSwipeBoardMarkerHorizontal from "./markers/SelectedSwipeBoardMarkerHorizontal";
import SelectedSwipeBoardMarkerVertical from "./markers/SelectedSwipeBoardMarkerVertical";

import {
  horizontalGroupLabel,
  verticalGroupLabel,
} from "@hooksV01/board/useBoardDescription";
import type { Summary } from "@interfacesV01/type";
import type { BoardData, SwipeAxis } from "@hooksV01/board/type";
import React from "react";

type Parms = {
  currentItem: Summary;
};
const SwipeBoard = (parms: Parms) => {
  const { currentItem } = parms;
  const {
    config,
    verticalData,
    horizontalData,
    horizontalCount,
    verticalCount,

    verticalPositionData,
    horizontalPositionData,
    summaryData,
  } = useBoardStatic();

  const { slot } = useBoardState();
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
      data: verticalData,
      groupLabel: verticalGroupLabel,
      count: verticalCount,
      translate: "y",
    },
    horizontal: {
      data: horizontalData,
      groupLabel: horizontalGroupLabel,
      count: horizontalCount,
      translate: "x",
    },
  };

  const axisList: SwipeAxis[] = ["horizontal", "vertical"];

  const currentHorizontalGroup = () => {
    if (slot === undefined) return;

    const slotNum = horizontalData[slot.c];

    let groupNum = 0;
    if (slotNum < 0) {
      groupNum = slotNum + 5;
    } else if (slotNum === undefined) {
      groupNum = horizontalGroupLabel.length - 1;
    } else {
      groupNum = horizontalPositionData[slotNum].group;
    }
    return horizontalGroupLabel[groupNum];
  };

  const currentVerticalGroup = () => {
    if (slot === undefined) return;

    const slotNum = verticalData[slot.r];

    let groupNum = 0;
    if (slotNum < 0) {
      groupNum = slotNum + 5;
    } else if (slotNum === undefined) {
      groupNum = verticalGroupLabel.length - 1;
    } else {
      groupNum = verticalPositionData[slotNum].group;
    }

    return verticalGroupLabel[groupNum];
  };

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
              <S.SwipeAxisDescriptionList $stepPx={stepPx} $axis={axis}>
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

              {axisData[axis].data.map((id, i) => (
                <React.Fragment key={i}>
                  <S.SwipeAxisDot
                    $axis={axis}
                    $size={i * stepPx}
                    style={{
                      display: `${dragAxis === null || dragAxis === axis ? "grid" : "none"}`,
                    }}
                  />
                  {i === axisData[axis].data.length - 1 && (
                    <S.SwipeAxisDot
                      style={{
                        display: `${dragAxis === null || dragAxis === axis ? "grid" : "none"}`,
                      }}
                      $axis={axis}
                      $size={(i + 1) * stepPx}
                    />
                  )}
                  <S.SwipeAxisMarkerContainer
                    $axis={axis}
                    $size={stepPx}
                    key={`marker-${axis}-${id}`}
                    style={{
                      display: `${dragAxis === null || dragAxis === axis ? "grid" : "none"}`,
                    }}
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
                </React.Fragment>
              ))}
            </S.SwipeAxisContainer>
          );
        })}
      </S.Wrapper>

      {isDragging && dragAxis !== null ? (
        dragAxis === "horizontal" ? (
          <>
            <S.VerticalAxis />

            <SelectedSwipeBoardMarkerHorizontal info={currentItem} />
          </>
        ) : (
          <>
            <S.HorizontalAxis />
            <SelectedSwipeBoardMarkerVertical info={currentItem} />
          </>
        )
      ) : (
        <>
          <S.VerticalAxis />
          <S.HorizontalAxis />
          <S.Cursor />
        </>
      )}

      <S.SwipeInfo>
        <div>{currentVerticalGroup()}</div>
        <div>{currentHorizontalGroup()}</div>
      </S.SwipeInfo>
    </>
  );
};

export default SwipeBoard;
