import type { BoardData, BoardPositionData, SeparatedBoardData } from "./type";

export type AxisModel = {
  slotToGroup: BoardData; // slotIndex -> groupIndex (separator는 음수 그대로)
};

type Params = {
  rowData: BoardData;
  colData: BoardData;
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

const useBoardData = ({ rowData, colData }: Params) => {
  const {
    dataCount: rowCount,
    separatedData: rowSeparatedData,
    position: rowPositionData,
  } = getPosition(rowData);

  const {
    dataCount: colCount,
    separatedData: colSeparatedData,
    position: colPositionData,
  } = getPosition(colData);

  return {
    rowData,
    rowCount,
    rowSeparatedData,
    rowPositionData,

    colData,
    colCount,
    colPositionData,
    colSeparatedData,
  };
};

export default useBoardData;
