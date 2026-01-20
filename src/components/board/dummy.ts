type DataPosition = {
  id: number;
  rPos: number;
  cPos: number;
  rIdx: number;
  cIdx: number;
};

type CellInfo = {
  data: DataPosition[];
  rCount: number;
  cCount: number;
};

export const build_cell_info_object = (
  row: number[][],
  col: number[][],
): Record<string, CellInfo> => {
  const row_len = row.length;
  const col_len = col.length;

  // ✅ 같은 rIdx면 rCount가 동일해야 함 (row[rIdx]의 길이 기반)
  const r_count_by_row = row.map((arr) => Math.max(arr.length, 1));

  // ✅ 같은 cIdx면 cCount가 동일해야 함 (col[cIdx]의 길이 기반)
  const c_count_by_col = col.map((arr) => Math.max(arr.length, 1));

  // ✅ 모든 셀(6x6)을 미리 만들어두면 렌더링이 깔끔해짐
  const cell_obj: Record<string, CellInfo> = {};
  for (let rIdx = 0; rIdx < row_len; rIdx += 1) {
    for (let cIdx = 0; cIdx < col_len; cIdx += 1) {
      const key = `${rIdx}-${cIdx}`;
      cell_obj[key] = {
        data: [],
        rCount: r_count_by_row[rIdx],
        cCount: c_count_by_col[cIdx],
      };
    }
  }

  // ✅ id 기준으로 row/col 정보 join
  const by_id = new Map<number, Partial<DataPosition>>();

  row.forEach((arr, rIdx) => {
    arr.forEach((id, rPos) => {
      const prev = by_id.get(id) ?? {};
      by_id.set(id, { ...prev, id, rIdx, rPos });
    });
  });

  col.forEach((arr, cIdx) => {
    arr.forEach((id, cPos) => {
      const prev = by_id.get(id) ?? {};
      by_id.set(id, { ...prev, id, cIdx, cPos });
    });
  });

  // ✅ join 된 데이터들을 각 셀에 push (rCount/cCount는 이미 고정값)
  for (const p of by_id.values()) {
    if (
      p.id == null ||
      p.rIdx == null ||
      p.cIdx == null ||
      p.rPos == null ||
      p.cPos == null
    )
      continue;

    const key = `${p.rIdx}-${p.cIdx}`;

    cell_obj[key].data.push({
      id: p.id,
      rIdx: p.rIdx,
      cIdx: p.cIdx,
      rPos: p.rPos,
      cPos: p.cPos,
    });
  }

  // ✅ 셀 내부 정렬: rPos -> cPos -> id
  Object.keys(cell_obj).forEach((key) => {
    cell_obj[key].data.sort(
      (a, b) => a.rPos - b.rPos || a.cPos - b.cPos || a.id - b.id,
    );
  });

  return cell_obj;
};
