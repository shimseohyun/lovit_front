import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Cotnaienr = styled.div<{ size: number }>`
  position: absolute;

  position: relative;
  overflow: hidden;

  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `}
`;

/* ✅ SVG 오버레이 */
export const Shape = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

/* ✅ 도형 */
export const Poly = styled.polygon`
  fill: rgba(255, 0, 0, 0.12);
  stroke: rgba(255, 0, 0, 0.65);
  stroke-width: 0.8; /* viewBox(0~100) 기준 */
  stroke-linejoin: round;
`;

/* ✅ 점 */
export const Dot = styled.div`
  position: absolute;

  transform: translate(-50%, -50%);
`;
