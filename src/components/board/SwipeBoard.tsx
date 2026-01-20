import * as S from "./Board.styled";

import useBoardSwipe from "../../hooks/board/useBoardSwipe";
import {
  colGroupLabel,
  rowGroupLabel,
} from "../../hooks/board/useBoardDescription";
import { useBoardStatic } from "../../hooks/board/context/BoardContext";

import SwipeBoardMarkerHorizontal from "./marker/SwipeBoardMarkerHorizontal";
import SwipeBoardMarkerVertical from "./marker/SwipeBoardMarkerVertical";

const SwipeBoard = () => {
  const { config, rowData, colData, summaryData } = useBoardStatic();
  const { screenWidth, screenHeight, stepPx } = config;

  const { bind, onPointerDown, onTransitionEnd, translate, isAnimating } =
    useBoardSwipe();

  const rowCount = rowData.length;
  const colCount = colData.length;

  return (
    <S.Wrapper
      {...bind}
      onPointerDown={onPointerDown}
      width={screenWidth}
      height={screenHeight}
    >
      <S.VerticalAxis />
      <S.HorizontalAxis />

      <S.AxisRow
        onTransitionEnd={onTransitionEnd}
        count={colCount} // ✅ colData 길이
        stepPx={stepPx}
        x={translate.x}
        isAnimating={isAnimating}
      >
        {colData.map((c, colIndex) => (
          <S.AxisCell key={colIndex}>
            {c < 0 ? (
              <S.HorizontalSeparator key={c}>
                {/* {colGroupLabel[c + 5]} */}
              </S.HorizontalSeparator>
            ) : (
              <SwipeBoardMarkerHorizontal key={c} info={summaryData[c]} />
            )}
          </S.AxisCell>
        ))}
      </S.AxisRow>

      <S.AxisCol
        count={rowCount} // ✅ rowData 길이
        stepPx={stepPx}
        y={translate.y}
        isAnimating={isAnimating}
      >
        {rowData.map((r, rowIndex) => (
          <S.AxisCell key={rowIndex}>
            {r < 0 ? (
              <S.VerticalSeparator key={r}>
                {/* {rowGroupLabel[r + 5]} */}
              </S.VerticalSeparator>
            ) : (
              <SwipeBoardMarkerVertical key={r} info={summaryData[r]} />
            )}
          </S.AxisCell>
        ))}
      </S.AxisCol>

      <S.Cursor />
    </S.Wrapper>
  );
};

export default SwipeBoard;
