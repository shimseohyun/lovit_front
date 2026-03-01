import { BoardDataProvider } from "@hooksV03/board/context/BoardDataProvider";
import EvaluationPageContent from "./components/EvaluationPageContent";

import useCheckBoard from "@routersV03/checkingBoard";
import { Navigate } from "react-router-dom";

// /evaluate/:boardID/:groupID
const EvaluationPage = () => {
  const { isTrue, boardID, groupID } = useCheckBoard();

  if (isTrue)
    return (
      <>
        <BoardDataProvider boardID={boardID} groupID={groupID}>
          <EvaluationPageContent />
        </BoardDataProvider>
      </>
    );
  else {
    return <Navigate to={"/"} replace={true} />;
  }
};

export default EvaluationPage;
