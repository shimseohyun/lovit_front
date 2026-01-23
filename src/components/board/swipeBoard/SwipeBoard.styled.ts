import styled from "@emotion/styled";
import type { SwipeAxis } from "../../../hooks/board/type";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  position: relative;
  overflow: hidden;
  touch-action: none;
  user-select: none;
`;

export const Cursor = styled.div`
  pointer-events: none;

  z-index: 10;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  transform: translate(-50%, -50%);

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundStrongest};
  `}
`;

export const SwipeAxisDescriptionList = styled.div<{
  $axis: SwipeAxis;
}>`
  display: flex;
  position: absolute;

  ${({ $axis }) => {
    if ($axis == "horizontal") {
      return css`
        height: 100%;

        flex-direction: row;

        transform: translateY(-50%);
        top: 50%;
        left: -30px;
      `;
    }
    if ($axis == "vertical") {
      return css`
        width: 100%;

        flex-direction: column;

        transform: translateX(-50%);
        left: 50%;
        top: -30px;
      `;
    }
  }}
`;

export const SwipeAxisDescription = styled.div<{
  $axis: SwipeAxis;
  $size: number;
}>`
  box-sizing: border-box;
  position: relative;
  ${({ $axis, $size }) => {
    if ($axis == "horizontal") {
      return css`
        height: 100%;
        width: ${$size}px;
      `;
    }
    if ($axis == "vertical") {
      return css`
        width: 100%;
        height: ${$size}px;
      `;
    }
  }}
`;

export const SwipeAxisDescriptionLabel = styled.div<{
  $axis: SwipeAxis;
  $currentAxis: SwipeAxis | null;
}>`
  ${({ $axis }) => {
    if ($axis === "vertical") {
      return css`
        height: 100%;
        width: 20px;

        transform: translateX(-50%);
        opacity: 50%;
        top: 0;
        left: 50%;
        writing-mode: vertical-lr;
      `;
    } else if ($axis === "horizontal") {
      return css`
        width: 100%;
        height: 20px;

        transform: translateY(-50%);
        opacity: 50%;
        top: 50%;
        left: 0;
      `;
    }
  }}

  box-sizing: border-box;
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background-color: ${theme.foregroundColors.foregroundLighter};
    color: ${theme.fontColors.textLighter};
    ${theme.fonts.body4B}
  `}

  ${({ $currentAxis, $axis }) => {
    if ($axis === "vertical") {
      if ($currentAxis === null) {
        return css`
          /* left: calc(50% - 10px); */
        `;
      } else if ($currentAxis !== "vertical") {
        return css`
          display: none;
        `;
      } else {
        return css`
          /* left: calc(50% - 10px); */
          opacity: 70%;
        `;
      }
    }
    if ($axis === "horizontal") {
      if ($currentAxis === null) {
        return css`
          /* top: calc(50% + 10px); */
        `;
      } else if ($currentAxis !== "horizontal") {
        return css`
          display: none;
        `;
      } else {
        return css`
          /* top: calc(50% + 10px); */
          opacity: 70%;
        `;
      }
    }
  }}
`;

export const SwipeAxisContainer = styled.div<{
  $axis: SwipeAxis;
  count: number;
  stepPx: number;
  size: number;
  isAnimating: boolean;
}>`
  position: absolute;
  background-color: transparent;

  transition: ${({ isAnimating }) =>
    isAnimating ? "transform 220ms ease" : "none"};
  will-change: transform;
  display: flex;

  ${({ $axis, size, count, stepPx }) => {
    if ($axis === "vertical") {
      return css`
        left: 50%;
        top: 0;
        transform: translate3d(-50%, ${size}px, 0);

        width: 100%;
        height: ${count * stepPx}px;

        flex-direction: column;
      `;
    } else if ($axis === "horizontal") {
      return css`
        left: 0;
        top: 50%;
        transform: translate3d(${size}px, -50%, 0);

        width: ${count * stepPx}px;
        height: 100%;
        flex-direction: row;
      `;
    }
  }}
`;

export const SwipeAxisMarkerContainer = styled.div<{
  $axis: SwipeAxis;
  $size: number;
}>`
  display: grid;
  place-items: center;

  ${({ $axis, $size }) => {
    if ($axis == "horizontal") {
      return css`
        width: ${$size}px;
        height: 100%;
      `;
    }
    if ($axis == "vertical") {
      return css`
        height: ${$size}px;
        width: 100%;
      `;
    }
  }}
`;

export const SwipeAxisSeparator = styled.div<{
  $axis: SwipeAxis;
}>`
  position: relative;

  ${({ $axis }) => {
    if ($axis == "horizontal") {
      return css`
        width: 1px;
        height: 100%;
      `;
    }
    if ($axis == "vertical") {
      return css`
        width: 100%;
        height: 1px;
      `;
    }
  }}

  ${({ theme }) => css`
    background-color: ${theme.strokeColors.strokeLightest};
  `}
`;
