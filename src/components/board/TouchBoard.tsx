import {
  useBoardActions,
  useBoardStatic,
} from "../../hooks/board/context/BoardContext";

import * as S from "./Board.styled";
import TouchBoardMarker from "./marker/TouchBoardMarker";

const TouchBoard = () => {
  const {
    summaryData,
    rowSeparatedData,
    colSeparatedData,
    rowPositionData,
    colPositionData,
    rowCount,
    colCount,
  } = useBoardStatic();

  const { setSlot } = useBoardActions();

  const onCellClick = (row: number, col: number) => {
    let rSlot = 0;

    let cSlot = 0;
    for (let r = 0; r < row; r++) {
      rSlot += rowSeparatedData[r].length + 1;
    }
    rSlot += Math.floor(rowSeparatedData[row].length / 2);
    for (let c = 0; c < col; c++) {
      cSlot += colSeparatedData[c].length + 1;
    }
    cSlot += Math.floor(colSeparatedData[col].length / 2);

    setSlot({ r: rSlot, c: cSlot });
  };

  return (
    <S.BoardGrid $rows={6} $cols={6}>
      {rowCount.map((rCount, r) =>
        colCount.map((cCount, c) => {
          return (
            <S.PiecesGrid key={`${r}-${c}`} onClick={() => onCellClick(r, c)}>
              {colSeparatedData[c].map((item, i) => {
                if (rowPositionData[item].group === r)
                  return (
                    <S.MarkerContainer
                      key={i}
                      style={{
                        top:
                          (rowPositionData[item].idx / (rCount + 1)) * 100 +
                          "%",
                        left:
                          (colPositionData[item].idx / (cCount + 1)) * 100 +
                          "%",
                      }}
                    >
                      <TouchBoardMarker info={summaryData[item]} />
                    </S.MarkerContainer>
                  );
              })}
            </S.PiecesGrid>
          );
        }),
      )}
    </S.BoardGrid>
  );
};

export default TouchBoard;
