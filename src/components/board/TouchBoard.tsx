import {
  useBoardActions,
  useBoardStatic,
} from "../../hooks/board/context/BoardContext";
import type { BoardData, SeparatedBoardData } from "../../hooks/board/type";

import * as S from "./Board.styled";
import TouchBoardMarker from "./marker/TouchBoardMarker";

type BoardPosition = { group: number; idx: number };

const TouchBoard = () => {
  const { summaryData, rowData, colData } = useBoardStatic();
  const { setSlot } = useBoardActions();

  const rowPos: Record<number, BoardPosition> = {};
  const colPos: Record<number, BoardPosition> = {};

  const getSeparatedData = (
    data: BoardData,
    pos: Record<number, BoardPosition>,
  ) => {
    let newData: SeparatedBoardData = [];
    let dataCount: number[] = [];
    let temp: number[] = [];

    data.forEach((item, idx) => {
      if (item < 0) {
        newData.push(temp);
        dataCount.push(temp.length);
        temp = [];
      } else {
        pos[item] = {
          idx: temp.length + 1,
          group: newData.length,
        };
        temp.push(item);
      }
      if (idx === data.length - 1) {
        newData.push(temp);
        dataCount.push(temp.length);
        temp = [];
      }
    });

    return { newData, dataCount };
  };

  const { newData: rowSeparated, dataCount: rowCount } = getSeparatedData(
    rowData,
    rowPos,
  );
  const { newData: colSeparated, dataCount: colCount } = getSeparatedData(
    colData,
    colPos,
  );

  const onCellClick = (row: number, col: number) => {
    let rSlot = 0;
    let cSlot = 0;
    for (let r = 0; r < row; r++) {
      rSlot += rowSeparated[r].length + 1;
    }
    rSlot += Math.floor(rowSeparated[row].length / 2);
    for (let c = 0; c < col; c++) {
      cSlot += colSeparated[c].length + 1;
    }
    cSlot += Math.floor(colSeparated[col].length / 2);

    setSlot({ r: rSlot, c: cSlot });
  };

  return (
    <S.BoardGrid $rows={6} $cols={6}>
      {[0, 1, 2, 3, 4, 5].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => {
          return (
            <S.PiecesGrid key={`${r}-${c}`} onClick={() => onCellClick(r, c)}>
              {colSeparated[c]?.map((i) => {
                if (rowPos[i].group === r)
                  return (
                    <S.MarkerContainer
                      key={i}
                      style={{
                        top:
                          (rowPos[i].idx / (rowCount[rowPos[i].group] + 1)) *
                            100 +
                          "%",
                        left:
                          (colPos[i].idx / (colCount[colPos[i].group] + 1)) *
                            100 +
                          "%",
                      }}
                    >
                      <TouchBoardMarker info={summaryData[i]} />
                    </S.MarkerContainer>
                  );
              })}
            </S.PiecesGrid>
          );
        }),
      )}

      {/* {cells.map((cell) => (
        <S.Cell key={cell.key}>
          <S.PiecesGrid onClick={() => onCellClick(cell.rIDX, cell.cIDX)}>
            {cell.pieces.map((p) => (
              <div
                style={{
                  gridRowStart: p.row_start,
                  gridColumnStart: p.col_start,
                }}
              >
                <TouchBoardMarker key={p.id} info={summaryData[p.id]} />
              </div>
            ))}
          </S.PiecesGrid>
        </S.Cell>
      ))} */}
    </S.BoardGrid>
  );
};

export default TouchBoard;
