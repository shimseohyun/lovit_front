import type { Point } from "@hooks/board/type";

const horizontalResult = ["고양이", "", "강아지"];
const verticalResult = ["두부", "", "버터"];

type Parms = {
  points: Point[];
  screenSize: number;
};
const useGetResult = (parms: Parms) => {
  const { points, screenSize } = parms;

  let averageHorizontal = 0;
  let averageVertical = 0;

  points.forEach((point) => {
    averageHorizontal += point.x;
    averageVertical += point.y;
  });

  averageHorizontal = averageHorizontal / points.length;
  averageVertical = averageVertical / points.length;

  const size = screenSize / 3;
  const resultHorizontal = Math.floor(averageHorizontal / size);
  const resultVertical = Math.floor(averageVertical / size);

  return {
    label: verticalResult[resultVertical] + horizontalResult[resultHorizontal],
  };
};

export default useGetResult;
