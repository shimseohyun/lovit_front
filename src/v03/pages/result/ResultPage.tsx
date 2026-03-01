import { ResultProvider } from "./context/ResultProvider";

import { Navigate } from "react-router-dom";
import ResultPageContent from "./components/ResultPageContent";
import useCheckBoard from "@routersV03/checkingBoard";

// /result/:boardID
const ResultPage = () => {
  const { isTrue, boardID } = useCheckBoard();

  if (isTrue)
    return (
      <ResultProvider boardID={boardID}>
        <ResultPageContent />
      </ResultProvider>
    );
  else {
    return <Navigate to={"/"} replace={true} />;
  }
};

export default ResultPage;
