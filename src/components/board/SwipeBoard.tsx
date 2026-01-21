import * as S from "./Board.styled";

import useBoardSwipe from "../../hooks/board/useBoardSwipe";

import { useBoardStatic } from "../../hooks/board/context/BoardContext";

import SwipeBoardMarkerHorizontal from "./marker/SwipeBoardMarkerHorizontal";
import SwipeBoardMarkerVertical from "./marker/SwipeBoardMarkerVertical";
import SelectedSwipeBoardMarkerHorizontal from "./marker/SelectedSwipeBoardMarkerHorizontal";
import SelectedSwipeBoardMarkerVertical from "./marker/SelectedSwipeBoardMarkerVertical copy";

import {
  colGroupLabel,
  rowGroupLabel,
} from "../../hooks/board/useBoardDescription";
import type { Summary } from "../../type/type";

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

  return (
    <>
      <S.Wrapper
        {...bind}
        onPointerDown={onPointerDown}
        width={screenWidth}
        height={screenHeight}
      >
        {/* horizontal */}

        <S.AxisRow
          onTransitionEnd={onTransitionEnd}
          count={colData.length} // ✅ colData 길이
          stepPx={stepPx}
          x={translate.x}
          isAnimating={isAnimating}
        >
          <S.HorizontalAreaList>
            {[0, 1, 2, 3, 4, 5].map((r, i) => {
              return (
                <S.HorizontalArea
                  key={i}
                  $height={60 * (colCount[r] + 1)}
                  $opacity={(r / 6) * 100}
                >
                  <S.HorizontalAreaChip $direction={dragAxis}>
                    {colGroupLabel[r]}
                  </S.HorizontalAreaChip>
                </S.HorizontalArea>
              );
            })}
          </S.HorizontalAreaList>

          {colData.map((c, colIndex) => (
            <S.HorizontalCell key={colIndex}>
              {c < 0 ? (
                <S.HorizontalSeparator />
              ) : (
                <SwipeBoardMarkerHorizontal
                  key={c}
                  info={summaryData[c]}
                  isSelected={isDragging && dragAxis === "horizontal"}
                />
              )}
            </S.HorizontalCell>
          ))}
        </S.AxisRow>

        <S.AxisCol
          count={rowData.length}
          stepPx={stepPx}
          y={translate.y}
          isAnimating={isAnimating}
        >
          <S.VerticalAreaList>
            {[0, 1, 2, 3, 4, 5].map((c, i) => {
              return (
                <S.VerticalArea
                  key={i}
                  $opacity={(c / 6) * 100}
                  $height={60 * (rowCount[c] + 1)}
                >
                  <S.VerticalAreaChip $direction={dragAxis}>
                    {rowGroupLabel[c]}
                  </S.VerticalAreaChip>
                </S.VerticalArea>
              );
            })}
          </S.VerticalAreaList>

          {rowData.map((r, rowIndex) => (
            <S.VerticalCell key={rowIndex}>
              {r < 0 ? (
                <>
                  <S.VerticalSeparator />
                </>
              ) : (
                <SwipeBoardMarkerVertical
                  key={r}
                  info={summaryData[r]}
                  isSelected={isDragging && dragAxis === "vertical"}
                />
              )}
            </S.VerticalCell>
          ))}
        </S.AxisCol>
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
