import * as S from "./Board.styled";
import TouchBoard from "./TouchBoard";
import SwipeBoard from "./SwipeBoard";
import { BoardProvider, useBoardState } from "../../hooks/board/BoardContext";

const initialRow = [0, 1, 2, -5, 3, 4, -4, 5, -3, 6, -2, 7, 8, -1, 9];
const initialCol = [0, 1, 2, -5, 3, 4, -4, 5, -3, 6, -2, 7, 8, -1, 9];

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
    <BoardProvider initialRow={initialRow} initialCol={initialCol}>
      <BoardLayout />
    </BoardProvider>
  );
};

export default Board;
