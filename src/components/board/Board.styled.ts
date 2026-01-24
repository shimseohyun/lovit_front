import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { SwipeAxis, SwipeDirection } from "@hooks/board/type";

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
  position: absolute;
  padding: 6px 8px;
  border-radius: 20px;
  font-size: 10px;
  background-color: #f2f4f6;
  ${(p) => getPosition(p.position)}
`;

export const BoardContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;

  overflow: hidden;
  position: relative;

  ${(p) => css`
    box-shadow: 0 0 0 1px ${p.theme.strokeColors.strokeLight};
  `}
`;
const withCenterHole = (count: number, holePx: number) => {
  // count는 기존 row/col 개수
  // 결과는 count+1개 트랙 (가운데만 holePx)
  const total = count + 1;
  const mid = Math.floor(total / 2);

  return Array.from({ length: total }, (_, i) =>
    i === mid ? `${holePx}px` : "1fr",
  ).join(" ");
};

export const BoardGrid = styled.div<{
  $rows: number;
  $cols: number;
  $holePx?: number;
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

  grid-template-columns: ${(p) => withCenterHole(p.$cols, p.$holePx ?? 20)};
  grid-template-rows: ${(p) => withCenterHole(p.$rows, p.$holePx ?? 20)};
`;

export const PiecesGrid = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const MarkerContainer = styled.div`
  width: 1px;
  height: 1px;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%);
`;

// axis description
export const SwipeAxisDescriptionList = styled.div<{
  $axis: SwipeAxis;
}>`
  pointer-events: none;
  position: absolute;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  ${({ $axis }) => {
    if ($axis == "horizontal") {
      return css`
        flex-direction: row;
      `;
    }
    if ($axis == "vertical") {
      return css`
        flex-direction: column;
      `;
    }
  }}
`;

export const SwipeAxisCenter = styled.div`
  width: 20px;
  height: 20px;
`;

// axis description
export const SwipeAxisLine = styled.div<{
  $axis: SwipeAxis;
}>`
  pointer-events: none;

  ${(p) => css`
    background-color: ${p.theme.strokeColors.strokeLightest};
  `}

  ${({ $axis }) => {
    if ($axis == "horizontal") {
      return css`
        width: 1px;
        height: 100%;
      `;
    }
    if ($axis == "vertical") {
      return css`
        height: 1px;
        width: 100%;
      `;
    }
  }}
`;

export const SwipeAxisDescriptionLabel = styled.div<{
  $axis: SwipeAxis;
}>`
  pointer-events: none;
  flex-grow: 1;

  ${({ $axis, ...p }) => {
    if ($axis === "vertical") {
      return css`
        width: 20px;
        writing-mode: vertical-lr;
      `;
    } else if ($axis === "horizontal") {
      return css`
        height: 20px;

        border-right: 0.5px solid ${p.theme.strokeColors.strokeLightest};
      `;
    }
  }}

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background-color: ${theme.foregroundColors.foregroundLighter};
    color: ${theme.fontColors.textLighter};
    ${theme.fonts.body4B}
  `}
`;
