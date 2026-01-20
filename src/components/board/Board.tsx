import * as S from "./Board.styled";
import TouchBoard from "./TouchBoard";
import SwipeBoard from "./SwipeBoard";
import {
  BoardProvider,
  useBoardState,
} from "../../hooks/board/context/BoardContext";

import { dummyData, initialCol, initialRow, newData } from "../../dummy/data";

const BoardLayout = () => {
  const { slot, title } = useBoardState();

  return (
    <>
      <S.MainPageTitleContainer>
        <S.MainPageTitleImg src={newData.thumbnaeilURL} />
        <span>{newData.name}</span>
        <span>{title === "" || !title ? "어디에 속하나요?" : title}</span>
      </S.MainPageTitleContainer>
      <S.BoardContainer>
        <S.VerticalAxis />
        <S.HorizontalAxis />
        <S.Chip position="up">두부</S.Chip>
        <S.Chip position="down">버터</S.Chip>
        <S.Chip position="left">고양이</S.Chip>
        <S.Chip position="right">강아지</S.Chip>

        {slot === undefined ? <TouchBoard /> : <SwipeBoard />}
      </S.BoardContainer>
      {slot !== undefined && <S.Button>확인</S.Button>}
    </>
  );
};

const Board = () => {
  return (
    <BoardProvider
      initialRow={initialRow}
      initialCol={initialCol}
      summaryData={dummyData}
    >
      <BoardLayout />
    </BoardProvider>
  );
};

export default Board;
