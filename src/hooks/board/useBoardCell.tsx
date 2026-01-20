import { useCallback } from "react";
import { useBoardActions, useBoardStatic } from "./context/BoardContext";

type PieceVm = {
  id: number;
  row_start: number;
  col_start: number;
};

type CellVm = {
  key: string;
  rIDX: number;
  cIDX: number;
  piece_rows: number;
  piece_cols: number;
  pieces: PieceVm[];
};

const useBoardCell = () => {
  const { rowCount, colCount, idPositionMap } = useBoardStatic();
  const { setInitialSlot } = useBoardActions();

  const rows = rowCount.length;
  const cols = colCount.length;

  const cells: CellVm[] = [];
  const idx_of = (r: number, c: number) => r * cols + c;

  // 1) cells 먼저 1번 생성
  for (let rIDX = 0; rIDX < rows; rIDX += 1) {
    for (let cIDX = 0; cIDX < cols; cIDX += 1) {
      cells.push({
        key: `${rIDX}-${cIDX}`,
        rIDX,
        cIDX,
        piece_rows: rowCount[rIDX] ?? 0,
        piece_cols: colCount[cIDX] ?? 0,
        pieces: [],
      });
    }
  }

  // 2) idPositionMap 1번 순회하면서 바로 cells에 꽂기
  for (const [id, pos] of idPositionMap.entries()) {
    const r = pos.row.groupIndex;
    const c = pos.col.groupIndex;
    const i = idx_of(r, c);

    if (i < 0 || i >= cells.length) continue;

    cells[i].pieces.push({
      id,
      row_start: pos.row.indexInGroup + 1,
      col_start: pos.col.indexInGroup + 1,
    });
  }

  // 3) 정렬이 필요하면 cells를 1번만 훑어서 정렬
  for (const cell of cells) {
    if (cell.pieces.length <= 1) continue;
    cell.pieces.sort(
      (a, b) => a.row_start - b.row_start || a.col_start - b.col_start,
    );
  }

  const onCellClick = useCallback(
    (r: number, c: number) => setInitialSlot({ r, c }),
    [setInitialSlot],
  );

  return { rows, cols, cells, onCellClick };
};

export default useBoardCell;
