import {
  useBoardActions,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";

import * as S from "./Board.styled";
import TouchBoardMarker from "./marker/TouchBoardMarker";

const TouchBoard = () => {
  const {
    summaryData,
    verticalSeparatedData,
    horizontalSeparatedData,
    verticalPositionData,
    horizontalPositionData,
    verticalCount,
    horizontalCount,
  } = useBoardStatic();

  const { setSlot } = useBoardActions();

  const onCellClick = (row: number, col: number) => {
    let rSlot = 0;

    let cSlot = 0;
    for (let r = 0; r < row; r++) {
      rSlot += verticalSeparatedData[r].length + 1;
    }
    rSlot += Math.floor(verticalSeparatedData[row].length / 2);
    for (let c = 0; c < col; c++) {
      cSlot += horizontalSeparatedData[c].length + 1;
    }
    cSlot += Math.floor(horizontalSeparatedData[col].length / 2);

    setSlot({ r: rSlot, c: cSlot });
  };

  return (
    <S.BoardGrid $rows={6} $cols={6}>
      {verticalCount.map((rCount, r) =>
        horizontalCount.map((cCount, c) => {
          return (
            <S.PiecesGrid key={`${r}-${c}`} onClick={() => onCellClick(r, c)}>
              {horizontalSeparatedData[c].map((item, i) => {
                if (verticalPositionData[item].group === r)
                  return (
                    <S.MarkerContainer
                      key={i}
                      style={{
                        top:
                          (verticalPositionData[item].idx / (rCount + 1)) *
                            100 +
                          "%",
                        left:
                          (horizontalPositionData[item].idx / (cCount + 1)) *
                            100 +
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
