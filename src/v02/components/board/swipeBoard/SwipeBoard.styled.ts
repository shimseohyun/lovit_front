import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType } from "@interfacesV02/type";

export const BoardContaienr = styled.div<{ $size: number }>`
  touch-action: none;
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  position:relative;
  overflow: hidden;
`;

export const BoardAxisContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BoardAxis = styled.div<{
  $axis: AxisType;
}>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  ${({ $axis, ...p }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        width: 100%;
        height: 1px;
        background-color: ${p.theme.strokeColors.strokeLighter};
      `;
    } else {
      return css`
        height: 100%;
        width: 1px;
        background-color: ${p.theme.strokeColors.strokeLighter};
      `;
    }
  }}
`;

export const BoardAxisWrpper = styled.div<{
  $position: number;
  $axis: AxisType;
}>`
  pointer-events: none;
  transition:
    top 220ms ease,
    left 220ms ease;

  ${({ $position, $axis }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        position: absolute;
        transform: translateX(-50%);
        top: 0px;
        left: ${$position}px;
        width: auto;
        height: 100%;
        flex-direction: row;
      `;
    } else {
      return css`
        position: absolute;
        transform: translateY(-50%);
        left: 0px;
        top: ${$position}px;
        width: 100%;
        height: auto;
        flex-direction: column;
      `;
    }
  }}

  display: flex;

  flex-shrink: 0;
`;
export const BoardAxisItem = styled.div<{ $size: number; $axis: AxisType }>`
  ${({ $size, $axis }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        width: ${$size}px;
        height: 100%;
      `;
    } else {
      return css`
        height: ${$size}px;
        width: 100%;
      `;
    }
  }}

  display:flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;
