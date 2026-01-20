import { useMemo } from "react";
import type { BoardData, SeparatedBoardData } from "./type";

type Parms = {
  rowData: BoardData;
  colData: BoardData;
};

type AxisPosition = {
  groupIndex: number;
  indexInGroup: number;
  slotIndex: number; // raw axisList index (separator 포함)
};

export type IdPosition = {
  id: number;
  row: AxisPosition;
  col: AxisPosition;
};

const buildAxis = (data: BoardData) => {
  const separatedData: SeparatedBoardData = [];
  const positionById = new Map<number, AxisPosition>();

  let temp: number[] = [];
  let groupIndex = 0;
  let indexInGroup = 0;

  const flush = () => {
    // 빈 그룹은 버림 (연속 separator 등)
    if (temp.length === 0) return;

    separatedData.push(temp);
    temp = [];
    groupIndex += 1;
    indexInGroup = 0;
  };

  data.forEach((value, slotIndex) => {
    // separator 규칙: value < 0
    if (value < 0) {
      flush();
      return;
    }

    temp.push(value);

    positionById.set(value, {
      groupIndex,
      indexInGroup,
      slotIndex,
    });

    indexInGroup += 1;
  });

  flush();

  return { separatedData, positionById };
};

const buildIdPositionMap = (
  rowPosById: Map<number, AxisPosition>,
  colPosById: Map<number, AxisPosition>,
) => {
  const idPositionMap = new Map<number, IdPosition>();

  for (const [id, row] of rowPosById.entries()) {
    const col = colPosById.get(id);
    if (!col) continue;

    idPositionMap.set(id, { id, row, col });
  }

  return idPositionMap;
};

const getCount = (data: SeparatedBoardData) => {
  let count: number[] = [];
  data.forEach((item) => {
    count.push(item.length);
  });
  return count;
};

const getGroupNumber = (data: BoardData) => {
  let groupNumber: BoardData = [];
  let groupID = 0;
  data.forEach((item) => {
    if (item < 0) {
      groupNumber.push(item);
      groupID++;
    } else {
      groupNumber.push(groupID);
    }
  });

  return groupNumber;
};

const useBoardData = (parms: Parms) => {
  const { rowData, colData } = parms;

  const rowAxis = useMemo(() => buildAxis(rowData), [rowData]);
  const colAxis = useMemo(() => buildAxis(colData), [colData]);

  const rowCount = getCount(rowAxis.separatedData);
  const colCount = getCount(colAxis.separatedData);

  const rowSlotToGroup = getGroupNumber(rowData);
  const colSlotToGroup = getGroupNumber(colData);

  const idPositionMap = useMemo(
    () => buildIdPositionMap(rowAxis.positionById, colAxis.positionById),
    [rowAxis.positionById, colAxis.positionById],
  );

  const getIdPosition = (id: number) => idPositionMap.get(id) ?? null;

  const getCenterSlot = (target: number, data: SeparatedBoardData) => {
    let slot = 0;
    for (let i = 0; i < target; i++) {
      slot += data[i].length + 1;
    }
    slot += Math.floor(data[target].length / 2);
    return slot;
  };

  return {
    rowData,
    colData,

    rowSeparatedData: rowAxis.separatedData,
    colSeparatedData: colAxis.separatedData,
    rowSlotToGroup,
    colSlotToGroup,
    rowCount,
    colCount,

    idPositionMap,

    getCenterSlot,
    getIdPosition,
  };
};

export default useBoardData;
