import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType } from "@interfacesV03/type";

const withCenterHole = (count: number, holePx: number) => {
  // count는 기존 row/col 개수
  // 결과는 count+1개 트랙 (가운데만 holePx)
  const total = count + 1;
  const mid = Math.floor(total / 2);

  return Array.from({ length: total }, (_, i) =>
    i === mid ? `${holePx}px` : "1fr",
  ).join(" ");
};

export const BoardContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;

  overflow: hidden;
  position: relative;

  flex-shrink: 0;
  /* margin-left: -1px;
  margin-right: -1px; */

  padding: 1px;
  ${(p) => css`
    border: 1px solid ${p.theme.strokeColors.strokeLighter};

    background-color: ${p.theme.strokeColors.strokeLightest};
  `}
`;

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

  gap: 1px;

  grid-template-columns: ${(p) => withCenterHole(p.$cols, p.$holePx ?? 20)};
  grid-template-rows: ${(p) => withCenterHole(p.$rows, p.$holePx ?? 20)};
`;

export const GridItem = styled.div<{ $isAble: boolean }>`
  ${({ $isAble }) =>
    $isAble &&
    css`
      cursor: pointer;
    `}

  background-color: white;
  width: 100%;
  height: 100%;
`;

export const Ceter = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const Label = styled.div<{
  $axis: AxisType;
}>`
  pointer-events: none;
  flex-grow: 1;

  width: 100%;
  height: 100%;

  ${({ $axis }) => {
    if ($axis === "VERTICAL") {
      return css`
        padding: 0px 6px;
      `;
    } else if ($axis === "HORIZONTAL") {
      return css`
        padding: 4px 0px;
        white-space: nowrap;
      `;
    }
  }}

  text-align: center;
  overflow: hidden;
  word-break: break-all;
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
