import { useBoardStaticContext } from "@hooksV02/board/context/context";
import useGetBoardPoint from "./useGetBoardPoint";
import type { ResultType } from "@interfacesV02/type";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const CUT_1 = 100 / 3; // 33.333...
const CUT_2 = (100 / 3) * 2; // 66.666...

const getResult = (p: number): ResultType => {
  const x = clamp(p, 0, 100);

  if (x < CUT_1) return "START";
  if (x < CUT_2) return "MIDDLE";
  return "END";
};

const useGetBoardResult = () => {
  const { itemList } = useBoardStaticContext();
  const { horizontalPoints, verticalPoints, preferncePoints } =
    useGetBoardPoint();

  let verticalSum = 0;
  let horizontalSum = 0;
  let weightSum = 0;

  for (const itemID of itemList) {
    const h = horizontalPoints[itemID];
    const v = verticalPoints[itemID];
    const p = preferncePoints[itemID];

    const weight = p.percentage; // 0~100이라고 가정
    verticalSum += v.percentage * weight;
    horizontalSum += h.percentage * weight;
    weightSum += weight;
  }

  const vAverage = weightSum > 0 ? verticalSum / weightSum : 0;
  const hAverage = weightSum > 0 ? horizontalSum / weightSum : 0;

  const vResult: ResultType = getResult(vAverage);
  const hResult: ResultType = getResult(hAverage);

  return {
    vertical: vAverage,
    horizontal: hAverage,
    verticalResult: vResult,
    horizontalResult: hResult,
  };
};

export default useGetBoardResult;
