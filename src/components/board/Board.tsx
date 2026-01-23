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
import type { Step } from "@hooks/board/type";

type Parms = {
  confirmNext: (r: number, col: number) => void;
  newDataID: number;
  step: Step;
};

const BoardLayout = ({ confirmNext, newDataID, step }: Parms) => {
  const { slot, likeDic, likeList } = useBoardState();
  const { config } = useBoardStatic();
  const { reset, setLike } = useBoardActions();

  const onClickNextButton = () => {
    console.log(newDataID, likeDic, likeList);
    const liked = likeDic[newDataID] === undefined ? false : likeDic[newDataID];
    setLike(newDataID, liked);

    if (slot !== undefined) {
      confirmNext(slot.r, slot.c);
      reset();
    }
  };

  const onClickLikeButton = () => {
    const liked = likeDic[newDataID] === undefined ? true : !likeDic[newDataID];
    setLike(newDataID, liked);
  };

  if (step === "LIKED") {
    return (
      <>
        <Selector />
      </>
    );
  }

  if (step === "RESULT") {
    return <></>;
  }

  if (step === "BOARD")
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
          <OutlineButton onClick={onClickLikeButton}>
            {!likeDic[newDataID] ? "" : "안 "} 좋아요
          </OutlineButton>
          <FillButton disabled={slot === undefined} onClick={onClickNextButton}>
            확인
          </FillButton>
        </BottomButton>
      </>
    );
};

const Board = () => {
  const size = uesViewport();
  const { row, col, confirmNext, currentIDX, step } = useBoardTotalData({
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
      <BoardLayout
        confirmNext={confirmNext}
        newDataID={currentIDX}
        step={step}
      />
    </BoardProvider>
  );
};

export default Board;
