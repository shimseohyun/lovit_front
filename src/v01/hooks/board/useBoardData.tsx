import type {
  BoardData,
  BoardPositionData,
  Point,
  SeparatedBoardData,
} from "./type";

export type AxisModel = {
  slotToGroup: BoardData; // slotIndex -> groupIndex (separator는 음수 그대로)
};

type Params = {
  verticalData: BoardData;
  horizontalData: BoardData;
  boardSize: number;
};

const getPosition = (data: BoardData) => {
  let separatedData: SeparatedBoardData = [];
  let dataCount: number[] = [];
  let temp: number[] = [];
  let position: BoardPositionData = {};
  let currentPosition = 0;
  let idx = 1;

  data.forEach((item, i) => {
    if (item < 0) {
      currentPosition++;
      separatedData.push(temp);
      dataCount.push(temp.length);
      temp = [];
      idx = 1;
    } else {
      temp.push(item);
      position[item] = { group: currentPosition, idx: idx };
      idx++;
    }
    if (i === data.length - 1) {
      currentPosition++;
      separatedData.push(temp);
      dataCount.push(temp.length);
    }
  });

  return { dataCount, separatedData, position };
};

const useBoardData = ({ verticalData, horizontalData, boardSize }: Params) => {
  const {
    dataCount: verticalCount,
    separatedData: verticalSeparatedData,
    position: verticalPositionData,
  } = getPosition(verticalData);

  const {
    dataCount: horizontalCount,
    separatedData: horizontalSeparatedData,
    position: horizontalPositionData,
  } = getPosition(horizontalData);

  const currentData = verticalData.filter((x) => x >= 0);
  const getPoints = (data: number[], boardSize: number) => {
    const points: Point[] = [];

    data.map((id) => {
      const vertical = verticalPositionData[id];
      const horizontal = horizontalPositionData[id];

      const padding = 20;
      const gap = (boardSize - padding) / 6;

      if (vertical === undefined || horizontal === undefined) return;
      let verticalPos =
        (vertical.group > 2 ? padding : 0) +
        gap * vertical.group +
        (vertical.idx / (verticalCount[vertical.group] + 1)) * gap;

      let horizontalPos =
        (horizontal.group > 2 ? padding : 0) +
        gap * horizontal.group +
        (horizontal.idx / (horizontalCount[horizontal.group] + 1)) * gap;

      points.push({
        id: id,
        y: verticalPos,
        x: horizontalPos,
      });
    });
    return points;
  };

  return {
    verticalData,
    verticalCount,
    verticalSeparatedData,
    verticalPositionData,

    horizontalData,
    horizontalCount,
    horizontalPositionData,
    horizontalSeparatedData,
    getPoints,
    points: getPoints(currentData, boardSize),
  };
};

export default useBoardData;
