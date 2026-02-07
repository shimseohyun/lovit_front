import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";

import { BoardDataProvider } from "@hooksV02/board/context/BoardDataProvider";
import EvaluationPageContent from "./components/EvaluationPageContent";

const EvaluationPage = () => {
  return (
    <BoardDataProvider boardInformation={FACE_BOARD_INFO}>
      <EvaluationPageContent />
    </BoardDataProvider>
  );
};

export default EvaluationPage;
