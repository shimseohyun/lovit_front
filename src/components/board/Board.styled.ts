import styled from "@emotion/styled";

export const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  touch-action: none;
  user-select: none;
`;

export const Cursor = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  pointer-events: none;
`;

export const Rail = styled.div<{
  gridCount: number;
  stepPx: number;
  x: number;
  y: number;
  isAnimating: boolean;
}>`
  width: ${({ gridCount, stepPx }) => gridCount * stepPx}px;
  height: ${({ gridCount, stepPx }) => gridCount * stepPx}px;

  display: grid;
  grid-template-columns: repeat(
    ${({ gridCount }) => gridCount},
    ${({ stepPx }) => stepPx}px
  );
  grid-auto-rows: ${({ stepPx }) => stepPx}px;

  transform: translate3d(${({ x }) => x}px, ${({ y }) => y}px, 0);
  transition: ${({ isAnimating }) =>
    isAnimating ? "transform 220ms ease" : "none"};
  will-change: transform;
`;

export const Chip = styled.div`
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 16px;
`;

export const VerticalSeparator = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.9);
`;

export const HorizontalSeparator = styled.div`
  width: 1px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.9);
`;

export const AxisRow = styled.div<{
  count: number;
  stepPx: number;
  x: number;
  isAnimating: boolean;
}>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate3d(${({ x }) => x}px, -50%, 0);
  transition: ${({ isAnimating }) =>
    isAnimating ? "transform 220ms ease" : "none"};
  will-change: transform;

  width: ${({ count, stepPx }) => count * stepPx}px;
  height: ${({ stepPx }) => stepPx}px;
  display: flex;
`;

export const AxisCol = styled.div<{
  count: number;
  stepPx: number;
  y: number;
  isAnimating: boolean;
}>`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate3d(-50%, ${({ y }) => y}px, 0);
  transition: ${({ isAnimating }) =>
    isAnimating ? "transform 220ms ease" : "none"};
  will-change: transform;

  width: ${({ stepPx }) => stepPx}px;
  height: ${({ count, stepPx }) => count * stepPx}px;
  display: flex;
  flex-direction: column;
`;

export const AxisCell = styled.div`
  width: 100px;
  height: 100px;
  display: grid;
  place-items: center;
`;

export const Button = styled.button`
  width: 360px;
  height: 44px;
  transform: translateX(-50%);

  bottom: 20px;
  left: 50%;
`;

export const BoardContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid gray;
  overflow: hidden;
  position: relative;
`;
export const BoardGrid = styled.div<{
  $rows: number;
  $cols: number;
}>`
  position: absolute;

  transform: translate(-50%, -50%);
  transform-origin: center;
  top: 50%;
  left: 50%;

  width: 100%;
  height: 100%;

  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(${(p) => p.$cols}, 1fr);
  grid-template-rows: repeat(${(p) => p.$rows}, 1fr);

  background: #ddd;
  gap: 1px;
`;

export const Cell = styled.div`
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
`;

export const PiecesGrid = styled.div<{ $rows: number; $cols: number }>`
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: visible;

  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols}, minmax(0, 1fr));
  grid-template-rows: repeat(${(p) => p.$rows}, minmax(0, 1fr));

  min-width: 0;
  min-height: 0;
  place-items: center; /* 가로+세로 중앙 */
`;

export const MicroCell = styled.div`
  background: #fff;

  display: grid;
  place-items: center;

  overflow: visible;
  min-width: 0;
  min-height: 0;
`;

export const PieceChip = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  display: grid;
  place-items: center;
  font-size: 12px;
  z-index: 1;
`;

export const Marker = styled.div`
  z-index: 2;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 40px;

  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
`;

export const MainPageTitleContainer = styled.div`
  padding-top: 24px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  font-size: 24px;
`;
