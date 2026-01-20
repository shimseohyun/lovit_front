import { useCallback, useMemo } from "react";
import type { BoardData } from "./type";
import { buildAxisModel, type AxisPosition } from "./utils/buildAxisModel";

export type IdPosition = {
  id: number;
  row: AxisPosition;
  col: AxisPosition;
};

type Params = {
  rowData: BoardData;
  colData: BoardData;
};

const build_id_position_map = (
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

const useBoardData = ({ rowData, colData }: Params) => {
  const model = useMemo(() => {
    const row = buildAxisModel(rowData);
    const col = buildAxisModel(colData);

    return {
      row,
      col,
      idPositionMap: build_id_position_map(row.positionById, col.positionById),
    };
  }, [rowData, colData]);

  const getIdPosition = useCallback(
    (id: number) => model.idPositionMap.get(id) ?? null,
    [model.idPositionMap],
  );

  // ✅ center slot도 미리 계산해놨으니 O(1)
  const getRowCenterSlot = useCallback(
    (target: number) => {
      const t = Math.max(
        0,
        Math.min(target, model.row.centerSlotByGroup.length - 1),
      );
      return model.row.centerSlotByGroup[t] ?? 0;
    },
    [model.row.centerSlotByGroup],
  );

  const getColCenterSlot = useCallback(
    (target: number) => {
      const t = Math.max(
        0,
        Math.min(target, model.col.centerSlotByGroup.length - 1),
      );
      return model.col.centerSlotByGroup[t] ?? 0;
    },
    [model.col.centerSlotByGroup],
  );

  return {
    rowData,
    colData,

    rowSeparatedData: model.row.separatedData,
    colSeparatedData: model.col.separatedData,

    rowSlotToGroup: model.row.slotToGroup,
    colSlotToGroup: model.col.slotToGroup,

    rowCount: model.row.count,
    colCount: model.col.count,

    idPositionMap: model.idPositionMap,

    getIdPosition,
    getRowCenterSlot,
    getColCenterSlot,
  };
};

export default useBoardData;
