import * as S from "./Board.styled";

import useBoardSwipe from "../../hooks/board/useBoardSwipe";

import { useBoardStatic } from "../../hooks/board/context/BoardContext";

import SwipeBoardMarkerHorizontal from "./marker/SwipeBoardMarkerHorizontal";
import SwipeBoardMarkerVertical from "./marker/SwipeBoardMarkerVertical";
import SelectedSwipeBoardMarkerHorizontal from "./marker/SelectedSwipeBoardMarkerHorizontal";
import SelectedSwipeBoardMarkerVertical from "./marker/SelectedSwipeBoardMarkerVertical copy";
import { dummyData } from "../../dummy/data";
import type { BoardData, SeparatedBoardData } from "../../hooks/board/type";
import {
  colGroupLabel,
  colGroupLabel2,
  rowGroupLabel2,
} from "../../hooks/board/useBoardDescription";

type BoardPosition = { group: number; idx: number };

const SwipeBoard = () => {
  const { config, rowData, colData, summaryData } = useBoardStatic();

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

  const rowCount = rowData.length;
  const colCount = colData.length;

  const rowPos: Record<number, BoardPosition> = {};
  const colPos: Record<number, BoardPosition> = {};

  const getSeparatedData = (
    data: BoardData,
    pos: Record<number, BoardPosition>,
  ) => {
    let newData: SeparatedBoardData = [];
    let dataCount: number[] = [];
    let temp: number[] = [];

    data.forEach((item, idx) => {
      if (item < 0) {
        newData.push(temp);
        dataCount.push(temp.length);
        temp = [];
      } else {
        pos[item] = {
          idx: temp.length + 1,
          group: newData.length,
        };
        temp.push(item);
      }
      if (idx === data.length - 1) {
        newData.push(temp);
        dataCount.push(temp.length);
        temp = [];
      }
    });

    return { newData, dataCount };
  };

  const { newData: rowSeparated, dataCount: rowCountList } = getSeparatedData(
    rowData,
    rowPos,
  );
  const { newData: colSeparated, dataCount: colCountList } = getSeparatedData(
    colData,
    colPos,
  );

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
          count={colCount} // ✅ colData 길이
          stepPx={stepPx}
          x={translate.x}
          isAnimating={isAnimating}
        >
          <S.HorizontalAreaList>
            {[0, 1, 2, 3, 4, 5].map((r, i) => {
              return (
                <S.HorizontalArea
                  $height={60 * (colCountList[r] + 1)}
                  $opacity={(r / 6) * 100}
                >
                  <S.HorizontalAreaChip $direction={dragAxis}>
                    {colGroupLabel2[r]}
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
          count={rowCount}
          stepPx={stepPx}
          y={translate.y}
          isAnimating={isAnimating}
        >
          <S.VerticalAreaList>
            {[0, 1, 2, 3, 4, 5].map((c, i) => {
              return (
                <S.VerticalArea
                  $opacity={(c / 6) * 100}
                  $height={60 * (rowCountList[c] + 1)}
                >
                  <S.VerticalAreaChip $direction={dragAxis}>
                    {rowGroupLabel2[c]}
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
          <SelectedSwipeBoardMarkerHorizontal info={dummyData[0]} />
        ) : (
          <SelectedSwipeBoardMarkerVertical info={dummyData[0]} />
        )
      ) : (
        <S.Cursor />
      )}
    </>
  );
};

export default SwipeBoard;
