import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BoardContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;

  overflow: hidden;
  position: relative;

  flex-shrink: 0;

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

  background-color: gray;
  gap: 1px;

  grid-template-columns: ${(p) => withCenterHole(p.$cols, p.$holePx ?? 20)};
  grid-template-rows: ${(p) => withCenterHole(p.$rows, p.$holePx ?? 20)};
`;

export const GridItem = styled.div`
  cursor: pointer;
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const Marker = styled.div<{ $top: number; $left: number }>`
  touch-action: none;

  ${({ $left, $top }) => css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${$top}%;
    left: ${$left}%;
  `}

  background-color: black;
  color: white;
  text-align: center;

  width: 24px;
  height: 24px;
  border-radius: 24px;
`;
