import * as S from "./EvaluationPage.styld";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";

import { BoardDataProvider } from "@hooksV02/data/context/BoardDataProvider";
import EvaluationButton from "./components/board/EvaluationButton";
import Board from "./components/board/Board";

const EvaluationPage = () => {
  const h = [[], [], [], [], [], []];
  const v = [[], [], [], [], [], []];
  const p = [[], [], [], [], [], [], [], [], [], [], []];
  const checkingItemList: number[] = [0, 1, 2, 3, 4];

  // const h = [[[0]], [], [[1, 2]], [], [], []];
  // const v = [[[0]], [], [], [[1]], [], [[2]]];
  // const p = [[[0]], [], [[1]], [], [], [], [], [], [], [], [[2]]];
  // const checkingItemList: number[] = [3];

  return (
    <BoardDataProvider
      boardInformation={FACE_BOARD_INFO}
      horizontalRough={h}
      verticalRough={v}
      preferenceRough={p}
      checkingItemList={checkingItemList}
    >
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
