import useBoardCell from "../../hooks/board/useBoardCell";
import * as S from "./Board.styled";

const TouchBoard = () => {
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
              <S.PieceChip
                key={p.id}
                style={{
                  gridRowStart: p.row_start,
                  gridColumnStart: p.col_start,
                }}
              >
                {p.id}
              </S.PieceChip>
            ))}
          </S.PiecesGrid>
        </S.Cell>
      ))}
    </S.BoardGrid>
  );
};

export default TouchBoard;
