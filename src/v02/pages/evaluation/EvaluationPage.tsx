import Board from "@componentsV02/board/Board";
import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";
import { itemSummaryDummy } from "@dataV02/itemSummaryDummy";
import { BoardDataProvider } from "@hooksV02/data/context/BoardDataProvider";

const EvaluationPage = () => {
  const h = [[], [], [], [], [], []];
  const v = [[], [], [], [], [], []];
  const p = [[], [], [], [], [], [], [], [], [], [], []];

  return (
    <BoardDataProvider
      boardInformation={FACE_BOARD_INFO}
      horizontalRough={h}
      verticalRough={v}
      preferenceRough={p}
      itemSummaryDict={itemSummaryDummy}
    >
      <Board />
    </BoardDataProvider>
  );
};

export default EvaluationPage;
