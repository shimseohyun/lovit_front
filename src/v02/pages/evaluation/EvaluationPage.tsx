import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import { itemSummaryDummy } from "@dataV02/itemSummaryDummy";
import { BoardDataProvider } from "@hooksV02/data/contextBoardData";

const EvaluationPage = () => {
  const h = [[[0]], [[1]], [[2]], [[3]], [[4]], []];
  const v = [[[0]], [[2]], [[4]], [], [[1]], [[3]]];

  return (
    <BoardDataProvider
      horizontalRough={h}
      verticalRough={v}
      itemSummaryDict={itemSummaryDummy}
    >
      <EvaluationBoard />
    </BoardDataProvider>
  );
};

export default EvaluationPage;
