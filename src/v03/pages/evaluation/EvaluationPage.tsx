import { BoardDataProvider } from "@hooksV03/board/context/BoardDataProvider";
import EvaluationPageContent from "./components/EvaluationPageContent";
import { useParams } from "react-router-dom";
import { BOARD_INFO_DICT } from "@dataV03/boardInformation";

// /evaluate/:boardID
const EvaluationPage = () => {
  const { boardID } = useParams<{ boardID: string }>();
  const parsedID = Number(boardID);
  const board = Number.isInteger(parsedID) ? BOARD_INFO_DICT[parsedID] : null;
  if (board === null) return;

  return (
    <BoardDataProvider boardID={parsedID}>
      <EvaluationPageContent />
    </BoardDataProvider>
  );
};

export default EvaluationPage;
