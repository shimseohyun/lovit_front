import type { Point } from "@hooksV01/board/type";

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

  const size = screenSize / 3;

  let isNeutralHorizontal = true;
  let isNeutralVertical = true;

  points.forEach((point) => {
    isNeutralHorizontal = point.x > size && point.x < size * 2;
    isNeutralVertical = point.y > size && point.y < size * 2;

    averageHorizontal += point.x;
    averageVertical += point.y;
  });

  averageHorizontal = averageHorizontal / points.length;
  averageVertical = averageVertical / points.length;

  const resultHorizontal = Math.floor(averageHorizontal / size);
  const resultVertical = Math.floor(averageVertical / size);
  let label = "";
  let img = "";

  console.log(
    resultHorizontal,
    resultVertical,
    isNeutralHorizontal,
    isNeutralVertical,
  );
  if (resultHorizontal === 1 && resultVertical === 1) {
    if (isNeutralHorizontal && isNeutralVertical) {
      label = "균형잡힌 미남이 좋아";
      img = `/assets/result/face/${resultVertical}_${resultHorizontal}__1.png`;
    } else {
      label = "미남이면 다 좋아";
      img = `/assets/result/face/${resultVertical}_${resultHorizontal}__0.png`;
    }
  } else {
    const spacing = resultVertical === 1 ? "" : " ";

    label =
      verticalResult[resultVertical] +
      spacing +
      horizontalResult[resultHorizontal] +
      " 콜랙터";

    img = `/assets/result/face/${resultVertical}_${resultHorizontal}.png`;
  }

  console.log(label, img, "");
  return {
    label: label,
    img: img,
  };
};

export default useGetResult;
