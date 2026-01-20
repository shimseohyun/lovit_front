import { useMemo } from "react";
import {
  useBoardActions,
  useBoardStatic,
} from "../../hooks/board/BoardContext";
import * as S from "./Board.styled";

type Piece = {
  id: number;
  r_pos: number; // cell 내부 row index
  c_pos: number; // cell 내부 col index
};

const TouchBoard = () => {
  const { rowCount, colCount, rowData, getIdPosition } = useBoardStatic();
  const { setInitialSlot } = useBoardActions();

  const rows = rowCount.length;
  const cols = colCount.length;

  // ✅ id들을 (r_group, c_group) 셀 단위로 묶어두기
  const pieces_by_cell = useMemo(() => {
    const map = new Map<string, Piece[]>();

    // rowData에서 separator(<0) 제외한 id만 수집
    const ids = rowData.filter((v) => v >= 0);

    for (const id of ids) {
      const pos = getIdPosition(id);
      if (!pos) continue;

      const r_group = pos.row.groupIndex;
      const c_group = pos.col.groupIndex;

      const key = `${r_group}-${c_group}`;
      const list = map.get(key) ?? [];

      list.push({
        id,
        r_pos: pos.row.indexInGroup,
        c_pos: pos.col.indexInGroup,
      });

      map.set(key, list);
    }

    // (옵션) 렌더 안정성을 위해 정렬
    for (const [key, list] of map.entries()) {
      list.sort((a, b) => a.r_pos - b.r_pos || a.c_pos - b.c_pos);
      map.set(key, list);
    }

    return map;
  }, [rowData, getIdPosition]);

  return (
    <S.BoardGrid $rows={rows} $cols={cols}>
      {Array.from({ length: rows }).map((_, r_idx) =>
        Array.from({ length: cols }).map((_, c_idx) => {
          const key = `${r_idx}-${c_idx}`;
          const pieces = pieces_by_cell.get(key) ?? [];

          return (
            <S.Cell key={key}>
              <S.PiecesGrid
                $rows={rowCount[r_idx] ?? 0}
                $cols={colCount[c_idx] ?? 0}
                onClick={() => setInitialSlot({ r: r_idx, c: c_idx })}
              >
                {pieces.map((p) => (
                  <S.PieceChip
                    key={p.id}
                    style={{
                      gridRowStart: p.r_pos + 1,
                      gridColumnStart: p.c_pos + 1,
                    }}
                  >
                    {p.id}
                  </S.PieceChip>
                ))}
              </S.PiecesGrid>
            </S.Cell>
          );
        }),
      )}
    </S.BoardGrid>
  );
};

export default TouchBoard;
