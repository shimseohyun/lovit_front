import * as S from "./Board.styled";
import TouchBoard from "./TouchBoard";
import SwipeBoard from "./SwipeBoard";
import {
  BoardProvider,
  useBoardState,
} from "../../hooks/board/context/BoardContext";

import { dummyData, initialCol, initialRow } from "../../dummy/data";

const BoardLayout = () => {
  const { slot, title } = useBoardState();

  return (
    <>
      <S.MainPageTitleContainer>
        <span>가나다는</span>
        <span>{title === "" || !title ? "어떤 영화인가요?" : title}</span>
      </S.MainPageTitleContainer>
      <S.BoardContainer>
        {slot === undefined ? <TouchBoard /> : <SwipeBoard />}
      </S.BoardContainer>
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
