import * as S from "./Board.styled";
import TouchBoard from "./TouchBoard";
import SwipeBoard from "./SwipeBoard";
import {
  BoardProvider,
  useBoardActions,
  useBoardState,
  useBoardStatic,
} from "../../hooks/board/context/BoardContext";

import { dummyData } from "../../dummy/data";
import useBoardTotalData from "../../hooks/board/useBoardTotalData";
import type { Summary } from "../../type/type";

type Parms = {
  confirmNext: (r: number, col: number) => void;
  newDataID: number;
  fin: boolean;
};

const BoardLayout = ({ confirmNext, newDataID, fin }: Parms) => {
  const { slot, title } = useBoardState();
  const { summaryData, config } = useBoardStatic();
  const { reset } = useBoardActions();

  const newData: Summary = summaryData[newDataID];

  if (fin) {
    return (
      <>
        <S.BoardContainer $size={config.screenWidth}>
          <TouchBoard />
        </S.BoardContainer>
      </>
    );
  }

  const getTitle = () => {
    if (title === undefined) {
      return <S.MainPageTitle>어디에 속하나요?</S.MainPageTitle>;
    }

    if (title.groupName !== undefined) {
      return (
        <S.MainPageTitle>
          <S.MainPageTitleChip>{title.groupName}</S.MainPageTitleChip>예요
        </S.MainPageTitle>
      );
    } else if (title.comparisonID !== undefined) {
      return (
        <S.MainPageTitle>
          <S.MainPageTitleChip>
            {summaryData[title.comparisonID].name}
          </S.MainPageTitleChip>
          보다{" "}
          <S.MainPageTitleChip>{title.comparisonLabel}</S.MainPageTitleChip>
          예요
        </S.MainPageTitle>
      );
    }
  };

  return (
    <>
      <S.MainPageTitleContainer>
        <S.MainPageTitleImg src={newData.thumbnaeilURL} />
        <span>{newData.name}</span>
        <span>{getTitle()}</span>
      </S.MainPageTitleContainer>
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
