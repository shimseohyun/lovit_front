import { useMemo } from "react";
import type { BoardData } from "./type";

export type AxisModel = {
  slotToGroup: BoardData; // slotIndex -> groupIndex (separator는 음수 그대로)
};

const buildAxisModel = (data: BoardData): AxisModel => {
  const slotToGroup: BoardData = [];

  // separator 기준 그룹 id (빈 그룹 포함)
  let groupId = 0;

  for (let slotIndex = 0; slotIndex < data.length; slotIndex += 1) {
    const value = data[slotIndex];

    // separator: 음수는 그대로 넣고, 다음 그룹으로 이동
    if (value < 0) {
      slotToGroup.push(value);
      groupId += 1;
      continue;
    }

    // item: 현재 groupId 매핑
    slotToGroup.push(groupId);
  }

  return { slotToGroup };
};

type Params = {
  rowData: BoardData;
  colData: BoardData;
};

const useBoardData = ({ rowData, colData }: Params) => {
  const model = useMemo(() => {
    const row = buildAxisModel(rowData);
    const col = buildAxisModel(colData);

    return {
      row,
      col,
    };
  }, [rowData, colData]);

  return {
    rowData,
    colData,

    rowSlotToGroup: model.row.slotToGroup,
    colSlotToGroup: model.col.slotToGroup,
  };
};

export default useBoardData;
