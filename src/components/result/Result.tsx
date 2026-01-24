import { useMemo } from "react";
import {
  useBoardState,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";
import * as S from "./Result.styled";
import TouchBoard from "@components/board/TouchBoard";

type Point = { id: number; x: number; y: number };

const orderClockwise = (pts: Point[]) => {
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;

  return [...pts].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx),
  );
};

const toPolygonPoints = (pts: Point[]) =>
  pts
    .map((p) => `${(p.x * 100).toFixed(2)},${(p.y * 100).toFixed(2)}`)
    .join(" ");

const Result = () => {
  const { config, rowPositionData, colPositionData, rowCount, colCount } =
    useBoardStatic();
  const { likeList } = useBoardState();

  const points: Point[] = [];

  likeList.map((id, i) => {
    console.log(likeList, rowPositionData);
    const rowPos =
      rowPositionData[id].group / 6 +
      ((rowPositionData[id].idx / (rowCount[rowPositionData[id].group] + 1)) *
        1) /
        6;
    const colPos =
      colPositionData[id].group / 6 +
      ((colPositionData[id].idx / (colCount[colPositionData[id].group] + 1)) *
        1) /
        6;
    points.push({ id: id, x: colPos, y: rowPos });
  });

  const polygonPoints = useMemo(() => {
    if (points.length < 1) return "";
    return toPolygonPoints(orderClockwise(points));
  }, []);

  console.log(points);
  return (
    <>
      <TouchBoard />
      <S.Cotnaienr size={config.screenWidth}>
        <S.Shape viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {polygonPoints !== "" && <S.Poly points={polygonPoints} />}
        </S.Shape>

        {points.map((p) => (
          <S.Dot
            key={p.id}
            style={{
              left: `${(p.x * 100).toFixed(2)}%`,
              top: `${(p.y * 100).toFixed(2)}%`,
            }}
          />
        ))}
      </S.Cotnaienr>
    </>
  );
};

export default Result;
