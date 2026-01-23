import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { SwipeAxis, SwipeDirection } from "../../hooks/board/type";

export const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

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
  width: 100%;
  height: 1px;
  background: #f2f4f6;
  position: relative;
`;

export const HorizontalSeparator = styled.div`
  width: 1px;
  height: 100%;
  background: #f2f4f6;
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
  background-color: transparent;
  left: 0;
  top: 50%;
  transform: translate3d(${({ x }) => x}px, -50%, 0);
  transition: ${({ isAnimating }) =>
    isAnimating ? "transform 220ms ease" : "none"};
  will-change: transform;

  width: ${({ count, stepPx }) => count * stepPx}px;
  height: 100%;
  display: flex;
`;

export const AxisCol = styled.div<{
  count: number;
  stepPx: number;
  y: number;
  isAnimating: boolean;
}>`
  position: absolute;
  background-color: transparent;
  left: 50%;
  top: 0;
  transform: translate3d(-50%, ${({ y }) => y}px, 0);
  transition: ${({ isAnimating }) =>
    isAnimating ? "transform 220ms ease" : "none"};
  will-change: transform;

  width: 100%;
  height: ${({ count, stepPx }) => count * stepPx}px;
  display: flex;
  flex-direction: column;
`;

export const HorizontalCell = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const VerticalCell = styled.div<{ $size: number }>`
  width: 100%;
  height: ${({ $size }) => $size}px;
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

export const BoardContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2); /* blur=0, spread=2px */
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
  padding-top: 10px;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const MainPageTitleImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

export const MainPageTitle = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MainPageTitleChip = styled.div`
  padding: 4px 10px;
  border-radius: 80px;
  background: #f9fafb;
`;

export const MarkerContainer = styled.div`
  z-index: 10;
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const VerticalAreaList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;

  transform: translateX(-50%);
  left: 50%;
  top: -30px;
`;
export const HorizontalAreaList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  left: -30px;
`;

export const VerticalArea = styled.div<{
  $height: number;
  $opacity: number;
}>`
  box-sizing: border-box;
  width: 100%;
  height: ${(p) => p.$height}px;

  position: relative;
`;

export const HorizontalArea = styled.div<{
  $height: number;
  $opacity: number;
}>`
  box-sizing: border-box;
  height: 100%;
  width: ${(p) => p.$height}px;

  position: relative;
`;

export const VerticalAreaChip = styled.div<{
  $direction: SwipeAxis | null;
}>`
  box-sizing: border-box;
  padding: 8px;
  width: 20px;
  height: 100%;

  background-color: #f9fafb;
  font-size: 8px;

  position: absolute;
  transform: translateX(-50%);
  opacity: 50%;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $direction }) => {
    if ($direction === null) {
      return css`
        left: calc(50% - 10px);
      `;
    } else if ($direction !== "vertical") {
      return css`
        display: none;
      `;
    } else {
      return css`
        left: calc(50% - 10px);
        opacity: 70%;
      `;
    }
  }}
`;

export const HorizontalAreaChip = styled.div<{ $direction: SwipeAxis | null }>`
  width: 100%;
  height: 20px;

  background-color: #f9fafb;
  font-size: 8px;

  position: absolute;

  transform: translateY(-50%);
  opacity: 50%;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $direction }) => {
    if ($direction === null) {
      return css`
        top: calc(50% + 10px);
      `;
    } else if ($direction !== "horizontal") {
      return css`
        display: none;
      `;
    } else {
      return css`
        top: calc(50% + 10px);
        opacity: 70%;
      `;
    }
  }}
`;
