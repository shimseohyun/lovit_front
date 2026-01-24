import { useMemo } from "react";
import { useBoardStatic } from "@hooks/board/context/BoardContext";
import * as S from "./Result.styled";
import type { Point } from "@hooks/board/type";

const orderClockwise = (pts: Point[]) => {
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;

  return [...pts].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx),
  );
};

type Parms = {
  points: Point[];
};

const Result = (parms: Parms) => {
  const { points } = parms;
  const { config } = useBoardStatic();

  const toPolygonPoints = (pts: Point[]) =>
    pts
      .map(
        (p) =>
          `${(p.x / config.screenWidth) * 100},${(p.y / config.screenWidth) * 100}`,
      )
      .join(" ");

  const polygonPoints = useMemo(() => {
    if (points.length < 1) return "";
    return toPolygonPoints(orderClockwise(points));
  }, []);

  return (
    <>
      <S.Cotnaienr size={config.screenWidth}>
        <S.Shape viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {polygonPoints !== "" && <S.Poly points={polygonPoints} />}
        </S.Shape>

        {points.map((p) => (
          <S.Dot
            key={p.id}
            style={{
              left: `${p.x.toFixed(2)}px`,
              top: `${p.y.toFixed(2)}px`,
            }}
          />
        ))}
      </S.Cotnaienr>
    </>
  );
};

export default Result;
