import * as S from "./EvaluationPage.styld";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";

import { BoardDataProvider } from "@hooksV02/board/context/BoardDataProvider";
import EvaluationButton from "./components/board/EvaluationButton";
import Board from "./components/board/Board";
import TestTool from "@componentsV02/test/TestTool";

const EvaluationPage = () => {
  const checkingItemList: number[] = [0, 1, 2, 3, 4];

  return (
    <BoardDataProvider
      boardInformation={FACE_BOARD_INFO}
      checkingItemList={checkingItemList}
    >
      <TestTool />
      <S.Container>
        <S.ViewPort>
          <Board />
        </S.ViewPort>

        <EvaluationButton />
      </S.Container>
    </BoardDataProvider>
  );
};

export default EvaluationPage;
