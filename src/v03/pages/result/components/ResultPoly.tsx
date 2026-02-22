import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import type { UserPoint } from "@interfacesV03/data/user";

const Shape = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: multiply;
`;

const Poly = styled.polygon`
  ${(p) => css`
    fill: ${p.theme.foregroundColors.mainLightest};
    stroke: ${p.theme.foregroundColors.mainLight};
  `}
  stroke-width: 0.5;
  stroke-linejoin: round;
`;

const Dot = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

type Parms = {
  points: UserPoint[];
};

const orderClockwise = (pts: UserPoint[]) => {
  if (pts.length <= 2) return [...pts];

  const cx = pts.reduce((s, p) => s + p.horizontaPos, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.verticalPos, 0) / pts.length;

  return [...pts].sort((a, b) => {
    const aa = Math.atan2(a.verticalPos - cy, a.horizontaPos - cx);
    const bb = Math.atan2(b.verticalPos - cy, b.horizontaPos - cx);
    return aa - bb;
  });
};

const ResultPoly = ({ points }: Parms) => {
  const toPolygonPoints = (pts: UserPoint[]) =>
    pts.map((p) => `${p.horizontaPos},${p.verticalPos}`).join(" ");

  const polygonPoints = useMemo(() => {
    if (points.length < 3) return "";
    return toPolygonPoints(orderClockwise(points));
  }, [points]);

  return (
    <>
      <Shape viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {polygonPoints !== "" && <Poly points={polygonPoints} />}
      </Shape>

      {points.map((p) => (
        <Dot
          key={p.id}
          style={{
            left: `${p.horizontaPos.toFixed(2)}%`,
            top: `${p.verticalPos.toFixed(2)}%`,
          }}
        />
      ))}
    </>
  );
};

export default ResultPoly;
