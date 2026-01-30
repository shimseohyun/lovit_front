import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType } from "@interfacesV02/type";

export const BoardContaienr = styled.div<{ $size: number }>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  position:relative;
  overflow: hidden;
  border: 1px solid black;
`;

export const BoardAxisWrpper = styled.div<{
  $position: number;
  $axis: AxisType;
}>`
  ${({ $position, $axis }) => {
    if ($axis === "HORIAONTAL") {
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
    if ($axis === "HORIAONTAL") {
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
