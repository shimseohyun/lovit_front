import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";
import type { UserPoint } from "@interfacesV03/data/user";

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
  stroke-width: 0.5;
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

/**
 * 점들을 중심 기준으로 시계방향 정렬
 * - x: horizontaPos
 * - y: verticalPos
 */
const orderClockwise = (pts: UserPoint[]) => {
  if (pts.length <= 2) return [...pts];

  const cx = pts.reduce((s, p) => s + p.horizontaPos, 0) / pts.length; // ✅ x 평균
  const cy = pts.reduce((s, p) => s + p.verticalPos, 0) / pts.length; // ✅ y 평균

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
            // ✅ SVG(viewBox 0~100)와 동일한 좌표계로 맞추기 (0~100)
            left: `${p.horizontaPos.toFixed(2)}%`,
            top: `${p.verticalPos.toFixed(2)}%`,
          }}
        />
      ))}
    </>
  );
};

export default ResultPoly;
