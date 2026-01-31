import Board from "@componentsV02/board/Board";
import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";
import { itemSummaryDummy } from "@dataV02/itemSummaryDummy";
import { BoardDataProvider } from "@hooksV02/data/context/BoardDataProvider";

const EvaluationPage = () => {
  // const h = [[[0]], [[1]], [[2]], [[3]], [[4]], []];
  // const v = [[[0]], [[2]], [[4]], [], [[1]], [[3]]];
  // const p = [[], [[0]], [[2]], [], [[3, 4]], [], [], [[1]], [], [], []];

  const h = [[], [[1], [2]], [], [], [], []];
  const v = [[], [[1], [2]], [], [], [], []];
  const p = [[], [], [[1, 2]], [], [], [], [], [], [], [], []];

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
