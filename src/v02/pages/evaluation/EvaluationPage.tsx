import EvaluationBoard from "@componentsV02/board/EvaluationBoard";
import { itemSummaryDummy } from "@dataV02/itemSummaryDummy";
import { BoardDataProvider } from "@hooksV02/data/context/BoardDataProvider";

const EvaluationPage = () => {
  const h = [[[0]], [[1]], [[2]], [[3]], [[4]], []];
  const v = [[[0]], [[2]], [[4]], [], [[1]], [[3]]];
  const p = [[], [[0]], [[2]], [], [[3, 4]], [], [], [[1]], [], [], []];

  return (
    <BoardDataProvider
      horizontalRough={h}
      verticalRough={v}
      preferenceRough={p}
      itemSummaryDict={itemSummaryDummy}
    >
      <EvaluationBoard />
    </BoardDataProvider>
  );
};

export default EvaluationPage;
