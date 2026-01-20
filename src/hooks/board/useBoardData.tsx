import { useCallback, useMemo } from "react";

import type { BoardData, SeparatedBoardData } from "./type";

type Params = {
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

const buildSlotToGroup = (data: BoardData) => {
  const slotToGroup: BoardData = [];
  let groupId = 0;

  data.forEach((item) => {
    if (item < 0) {
      slotToGroup.push(item); // separator는 음수 값 그대로 보존 (라벨 인덱싱에 사용)
      groupId += 1;
      return;
    }
    slotToGroup.push(groupId);
  });

  return slotToGroup;
};

const useBoardData = (params: Params) => {
  const { rowData, colData } = params;

  const rowAxis = useMemo(() => buildAxis(rowData), [rowData]);
  const colAxis = useMemo(() => buildAxis(colData), [colData]);

  const rowSeparatedData = rowAxis.separatedData;
  const colSeparatedData = colAxis.separatedData;

  const rowCount = useMemo(
    () => rowSeparatedData.map((group) => group.length),
    [rowSeparatedData],
  );

  const colCount = useMemo(
    () => colSeparatedData.map((group) => group.length),
    [colSeparatedData],
  );

  const rowSlotToGroup = useMemo(() => buildSlotToGroup(rowData), [rowData]);
  const colSlotToGroup = useMemo(() => buildSlotToGroup(colData), [colData]);

  const idPositionMap = useMemo(
    () => buildIdPositionMap(rowAxis.positionById, colAxis.positionById),
    [rowAxis.positionById, colAxis.positionById],
  );

  const getIdPosition = useCallback(
    (id: number) => idPositionMap.get(id) ?? null,
    [idPositionMap],
  );

  const getCenterSlot = useCallback(
    (target: number, data: SeparatedBoardData) => {
      if (data.length === 0) return 0;

      const t = Math.max(0, Math.min(target, data.length - 1));

      let slot = 0;
      for (let i = 0; i < t; i += 1) {
        slot += data[i].length + 1;
      }
      slot += Math.floor(data[t].length / 2);
      return slot;
    },
    [],
  );

  return {
    rowData,
    colData,

    rowSeparatedData,
    colSeparatedData,
    rowSlotToGroup,
    colSlotToGroup,
    rowCount,
    colCount,

    // 필요하면 외부에서도 맵에 접근할 수 있도록 유지
    idPositionMap,

    getCenterSlot,
    getIdPosition,
  };
};

export default useBoardData;
