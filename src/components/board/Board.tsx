import * as S from "./Board.styled";
import TouchBoard from "./TouchBoard";

import {
  BoardProvider,
  useBoardActions,
  useBoardState,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";

import { dummyData } from "@data/data";
import useBoardTotalData from "@hooks/board/useBoardTotalData";

import SwipeBoard from "./swipeBoard/SwipeBoard";
import BoardTitle from "./title/BoardTitle";

type Parms = {
  confirmNext: (r: number, col: number) => void;
  newDataID: number;
  fin: boolean;
};

const BoardLayout = ({ confirmNext, newDataID, fin }: Parms) => {
  const { slot } = useBoardState();
  const { config } = useBoardStatic();
  const { reset } = useBoardActions();

  if (fin) {
    return (
      <>
        <S.BoardContainer $size={config.screenWidth}>
          <TouchBoard />
        </S.BoardContainer>
      </>
    );
  }

  return (
    <>
      <BoardTitle newDataID={newDataID} />

      <S.BoardContainer $size={config.screenWidth}>
        <S.VerticalAxis />
        <S.HorizontalAxis />

        {slot === undefined ? (
          <TouchBoard />
        ) : (
          <SwipeBoard currentItem={dummyData[newDataID]} />
        )}
      </S.BoardContainer>
      {slot !== undefined && (
        <S.Button
          onClick={() => {
            confirmNext(slot.r, slot.c);
            reset();
          }}
        >
          확인
        </S.Button>
      )}
    </>
  );
};

const Board = () => {
  const { row, col, confirmNext, currentIDX, fin } = useBoardTotalData({
    newData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  });

  return (
    <BoardProvider initialRow={row} initialCol={col} summaryData={dummyData}>
      <BoardLayout confirmNext={confirmNext} newDataID={currentIDX} fin={fin} />
    </BoardProvider>
  );
};

export default Board;
