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
import uesViewport from "@hooks/viewport/useViewport";
import Selector from "@components/selector/Selector";
import BottomButton from "@components/button/BottomButton";
import OutlineButton from "@components/button/OutlineButton";
import FillButton from "@components/button/FillButton";

type Parms = {
  confirmNext: (r: number, col: number) => void;
  newDataID: number;
  fin: boolean;
};

const BoardLayout = ({ confirmNext, newDataID, fin }: Parms) => {
  const { slot } = useBoardState();
  const { config } = useBoardStatic();
  const { reset } = useBoardActions();

  const onClickNextButton = () => {
    if (slot !== undefined) {
      confirmNext(slot.r, slot.c);
      reset();
    }
  };

  if (!fin) {
    return (
      <>
        <Selector />
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

      <BottomButton>
        <OutlineButton>좋아요</OutlineButton>
        <FillButton disabled={slot === undefined} onClick={onClickNextButton}>
          확인
        </FillButton>
      </BottomButton>
    </>
  );
};

const Board = () => {
  const size = uesViewport();
  const { row, col, confirmNext, currentIDX, fin } = useBoardTotalData({
    newData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  });

  return (
    <BoardProvider
      initialRow={row}
      initialCol={col}
      summaryData={dummyData}
      config={{
        stepPx: 70,
        screenHeight: size.width - 32,
        screenWidth: size.width - 32,
        minDistancePx: 10,
      }}
    >
      <BoardLayout confirmNext={confirmNext} newDataID={currentIDX} fin={fin} />
    </BoardProvider>
  );
};

export default Board;
