import { useBoardStatic } from "../../hooks/board/context/BoardContext";
import useBoardCell from "../../hooks/board/useBoardCell";
import * as S from "./Board.styled";
import TouchBoardMarker from "./marker/TouchBoardMarker";

const TouchBoard = () => {
  const { summaryData } = useBoardStatic();
  const { rows, cols, cells, onCellClick } = useBoardCell();

  return (
    <S.BoardGrid $rows={rows} $cols={cols}>
      {cells.map((cell) => (
        <S.Cell key={cell.key}>
          <S.PiecesGrid
            $rows={cell.piece_rows}
            $cols={cell.piece_cols}
            onClick={() => onCellClick(cell.rIDX, cell.cIDX)}
          >
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
      ))}
    </S.BoardGrid>
  );
};

export default TouchBoard;
