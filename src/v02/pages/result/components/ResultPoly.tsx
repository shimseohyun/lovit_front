import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { UserPoint } from "@interfacesV02/data/user";

import { useMemo } from "react";

/* ✅ SVG 오버레이 */
const Shape = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: multiply;
`;

/* ✅ 도형 */
const Poly = styled.polygon`
  ${(p) => css`
    fill: ${p.theme.foregroundColors.mainLightest};
    stroke: ${p.theme.foregroundColors.mainLight};
  `}
  stroke-width:0.5;
  stroke-linejoin: round;
`;

/* ✅ 점 */
const Dot = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

type Parms = {
  points: UserPoint[];
};

const orderClockwise = (pts: UserPoint[]) => {
  const cx = pts.reduce((s, p) => s + p.verticalPos, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.horizontaPos, 0) / pts.length;

  return [...pts].sort(
    (a, b) =>
      Math.atan2(a.verticalPos - cy, a.horizontaPos - cx) -
      Math.atan2(b.verticalPos - cy, b.horizontaPos - cx),
  );
};

const ResultPoly = (parms: Parms) => {
  const { points } = parms;

  const toPolygonPoints = (pts: UserPoint[]) =>
    pts.map((p) => `${p.horizontaPos},${p.verticalPos}`).join(" ");

  const polygonPoints = useMemo(() => {
    if (points.length < 1) return "";
    return toPolygonPoints(orderClockwise(points));
  }, []);

  return (
    <>
      <Shape viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {polygonPoints !== "" && <Poly points={polygonPoints} />}
      </Shape>

      {points.map((p) => (
        <Dot
          key={p.id}
          style={{
            left: `${p.horizontaPos.toFixed(2)}px`,
            top: `${p.verticalPos.toFixed(2)}px`,
          }}
        />
      ))}
    </>
  );
};
export default ResultPoly;
