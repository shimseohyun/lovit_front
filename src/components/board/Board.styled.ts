import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { SwipeDirection } from "@hooks/board/type";

export const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  position: relative;
  overflow: hidden;
  touch-action: none;
  user-select: none;
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

export const BoardContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
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

export const PiecesGrid = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
`;

export const MarkerContainer = styled.div`
  z-index: 10;
  position: absolute;
  transform: translate(-50%, -50%);
`;
