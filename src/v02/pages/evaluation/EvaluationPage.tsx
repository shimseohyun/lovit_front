import * as S from "./EvaluationPage.styld";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";
import { itemSummaryDummy } from "@dataV02/itemSummaryDummy";
import { BoardDataProvider } from "@hooksV02/data/context/BoardDataProvider";
import EvaluationButton from "./components/board/EvaluationButton";
import Board from "./components/board/Board";

const EvaluationPage = () => {
  const h = [[], [], [], [], [], []];
  const v = [[], [], [], [], [], []];
  const p = [[], [], [], [], [], [], [], [], [], [], []];

  const checkingItemList = [0, 1, 2, 3, 4];

  return (
    <BoardDataProvider
      boardInformation={FACE_BOARD_INFO}
      horizontalRough={h}
      verticalRough={v}
      preferenceRough={p}
      itemSummaryDict={itemSummaryDummy}
      checkingItemList={checkingItemList}
    >
      <S.Container>
        <S.ViewPort>
          {/* 보드 */}
          <Board />
          {/* 보드 */}
        </S.ViewPort>

        <EvaluationButton />
      </S.Container>
    </BoardDataProvider>
  );
};

export default EvaluationPage;
