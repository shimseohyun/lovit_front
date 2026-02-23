import { ResultProvider } from "./context/ResultProvider";

import { useParams } from "react-router-dom";
import { BOARD_INFO_DICT } from "@dataV03/boardInformation";
import ResultPageContent from "./components/ResultPageContent";

// /result/:boardID
const ResultPage = () => {
  const { boardID } = useParams<{ boardID: string }>();
  const parsedID = Number(boardID);
  const board = Number.isInteger(parsedID) ? BOARD_INFO_DICT[parsedID] : null;
  if (board === null) return;

  return (
    <ResultProvider boardID={parsedID}>
      <ResultPageContent />
    </ResultProvider>
  );
};

export default ResultPage;
