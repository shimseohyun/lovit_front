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
import Navigation from "@components/navigation/Navigation";

type Parms = {
  confirmNext: (r: number, col: number) => void;
  newDataID: number;
  step: Step;
  getStep: (s: Step) => void;
};

const BoardLayout = ({ confirmNext, newDataID, step, getStep }: Parms) => {
  const { slot, likeDic } = useBoardState();
  const { config } = useBoardStatic();
  const { reset, setLike } = useBoardActions();

  const onClickNextButton = () => {
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

  if (step === "RESULT") {
    return (
      <S.PageContainer>
        <Navigation />
        <BoardTitle newDataID={newDataID} />
        <S.BoardContainer $size={config.screenWidth}>
          <TouchBoard step={"RESULT"} />
        </S.BoardContainer>
      </S.PageContainer>
    );
  }

  if (step === "LIKED") {
    return (
      <S.FixedPageContainer>
        <Navigation />
        <Selector getStep={getStep} />
      </S.FixedPageContainer>
    );
  }

  if (step === "BOARD")
    return (
      <S.FixedPageContainer>
        <Navigation />
        <BoardTitle newDataID={newDataID} />

        <S.BoardContainer $size={config.screenWidth}>
          {slot === undefined ? (
            <TouchBoard step={"BOARD"} />
          ) : (
            <SwipeBoard currentItem={dummyData[newDataID]} />
          )}
        </S.BoardContainer>

        <BottomButton>
          <OutlineButton
            onClick={onClickLikeButton}
            isSelected={likeDic[newDataID]}
          >
            {!likeDic[newDataID] ? (
              <img src="/assets/icons/heart_stroke.svg" />
            ) : (
              <img src="/assets/icons/heart_fill.svg" />
            )}

            <span>마음에 들어요</span>
          </OutlineButton>
          <FillButton disabled={slot === undefined} onClick={onClickNextButton}>
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              {slot === undefined ? "4분면에서 선택해주세요" : "확인"}
            </div>
          </FillButton>
        </BottomButton>
      </S.FixedPageContainer>
    );
};

const Board = () => {
  const size = uesViewport();
  const { row, col, confirmNext, currentIDX, step, getStep } =
    useBoardTotalData({
      newData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    });

  return (
    <BoardProvider
      initialRow={row}
      initialCol={col}
      summaryData={dummyData}
      config={{
        stepPx: 70,
        screenHeight: size.width - 24,
        screenWidth: size.width - 24,
        minDistancePx: 10,
      }}
    >
      <BoardLayout
        confirmNext={confirmNext}
        newDataID={currentIDX}
        step={step}
        getStep={getStep}
      />
    </BoardProvider>
  );
};

export default Board;
