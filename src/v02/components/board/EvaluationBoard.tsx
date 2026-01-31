import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import TouchEvaluationBoard from "./touchEvaluationBoard/TouchEvaluationBoard";
import SwipeEvaluationBoard from "./swipeBoard/SwipeEvaluationBoard";

const EvaluationBoard = () => {
  const { currentStep } = useBoardDataContext();

  const getBoard = () => {
    if (currentStep === "EVALUATION_TOUCH") return <TouchEvaluationBoard />;
    else if (currentStep === "EVALUATION_SWIPE")
      return <SwipeEvaluationBoard />;
    else if (currentStep === "PREFERENCE") return <></>;
  };
  return (
    <>
      <h1>제목</h1>
      {getBoard()}
    </>
  );
};
export default EvaluationBoard;
