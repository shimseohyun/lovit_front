import * as S from "./EvaluationPage.styld";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";

import { BoardDataProvider } from "@hooksV02/board/context/BoardDataProvider";
import EvaluationButton from "./components/board/EvaluationButton";
import Board from "./components/board/Board";
import TestTool from "@componentsV02/test/TestTool";
import useGetPendingItemIDList from "@hooksV02/data/useGetPendingItemIDList";
import Navigation from "@componentsV02/navigation/Navigation";
import { useGetUserBoardData } from "@hooksV02/apis/user/user";

const EvaluationPage = () => {
  const { isLoading, data } = useGetUserBoardData();

  if (isLoading) {
    console.log(data);
    return <div>로딩중</div>;
  }

  const { pendingItemIDList } = useGetPendingItemIDList();
  return (
    <BoardDataProvider
      boardInformation={FACE_BOARD_INFO}
      pendingItemIDList={pendingItemIDList}
    >
      <TestTool />
      <S.Container>
        <Navigation />
        <S.ViewPort>
          <Board />
        </S.ViewPort>

        <EvaluationButton />
      </S.Container>
    </BoardDataProvider>
  );
};

export default EvaluationPage;
