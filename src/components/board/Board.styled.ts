import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { SwipeDirection } from "../../hooks/board/type";

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
  z-index: 10;
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

const getPosition = (position: SwipeDirection) => {
  switch (position) {
    case "right":
      return css`
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
      `;
    case "up":
      return css`
        top: 4px;
        left: 50%;
        transform: translateX(-50%);
      `;
    case "left":
      return css`
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
      `;
    case "down":
      return css`
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
      `;
    default:
      return css``;
  }
};

export const Chip = styled.div<{
  position: SwipeDirection;
}>`
  z-index: 10;
  position: absolute;
  padding: 6px 8px;
  border-radius: 20px;
  font-size: 10px;
  background-color: #f2f4f6;
  ${(p) => getPosition(p.position)}
`;

export const VerticalAxis = styled.div`
  z-index: 10;
  height: 1px;
  width: 100%;
  background: #e6e8eb;

  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export const HorizontalAxis = styled.div`
  z-index: 10;
  width: 1px;
  height: 100%;
  background: #e6e8eb;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;
export const VerticalSeparator = styled.div`
  width: 4px;
  height: 1px;
  background: #e6e8eb;
  position: relative;
`;

export const HorizontalSeparator = styled.div`
  width: 1px;
  height: 4px;
  background: #e6e8eb;
  position: relative;
`;

export const VerticalSeparatorChip = styled.div`
  width: auto;
  white-space: nowrap;
  z-index: 9;
  position: absolute;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 8px;
  background-color: #f9fafb;
  color: #c2c5c9;
  transform: translateY(-50%);
  top: 50%;
  left: 8px;
  overflow: visible;
`;
export const HorizontalSeparatorChip = styled.div`
  width: auto;
  white-space: nowrap;
  z-index: 9;
  position: absolute;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 8px;
  background-color: #f9fafb;
  color: #c2c5c9;
  transform: translateX(-50%);
  bottom: 8px;
  left: 50%;
  overflow: visible;
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
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
`;

export const Button = styled.button`
  width: 360px;
  height: 44px;
  margin-top: 30px;

  background-color: black;
  color: white;
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

  background: #f2f4f6;
  gap: 1px;
`;

export const Cell = styled.div`
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
`;

export const PiecesGrid = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
`;

export const MicroCell = styled.div`
  background: #fff;

  display: grid;
  place-items: center;

  overflow: visible;
  min-width: 0;
  min-height: 0;
`;

export const MainPageTitleContainer = styled.div`
  padding-top: 24px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 16px;
`;

export const MainPageTitleImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 12px;
`;

export const MarkerContainer = styled.div`
  z-index: 10;
  position: absolute;
  transform: translate(-50%, -50%);
`;
