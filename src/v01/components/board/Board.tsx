import * as S from "./Board.styled";
import TouchBoard from "./TouchBoard";

import {
  BoardProvider,
  useBoardActions,
  useBoardState,
  useBoardStatic,
} from "@hooksV01/board/context/BoardContext";

import { dummyData } from "@dataV01/data";
import useBoardTotalData from "@hooksV01/board/useBoardTotalData";

import SwipeBoard from "./swipeBoard/SwipeBoard";
import BoardTitle from "./title/BoardTitle";
import uesViewport from "@hooksV01/viewport/useViewport";
import Selector from "@componentsV01/selector/Selector";
import BottomButton from "@componentsV01/button/BottomButton";
import OutlineButton from "@componentsV01/button/OutlineButton";
import FillButton from "@componentsV01/button/FillButton";
import type { Step } from "@hooksV01/board/type";
import Navigation from "@componentsV01/navigation/Navigation";

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
        <BoardTitle newDataID={newDataID} step={step} />
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
        <BoardTitle newDataID={newDataID} step={step} />

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
              {slot === undefined ? "그룹을 선택해주세요" : "여기로 할게요"}
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
      newData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
