import * as S from "./Board.styled";

import { useBoardStatic } from "../../hooks/board/BoardContext";
import useBoardSwipe from "../../hooks/board/useBoardSwipe";
import {
  colGroupLabel,
  rowGroupLabel,
} from "../../hooks/board/useBoardDescription";

const SwipeBoard = () => {
  const { config, rowData, colData } = useBoardStatic();
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
      <S.Cursor />

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
              <S.HorizontalSeparator>
                {colGroupLabel[c + 5]}
              </S.HorizontalSeparator>
            ) : (
              <S.Chip>{c}</S.Chip>
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
              <S.VerticalSeparator> {rowGroupLabel[r + 5]}</S.VerticalSeparator>
            ) : (
              <S.Chip>{r}</S.Chip>
            )}
          </S.AxisCell>
        ))}
      </S.AxisCol>
    </S.Wrapper>
  );
};

export default SwipeBoard;
