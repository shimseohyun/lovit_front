import { useBoardStepContext } from "@hooksV02/data/context/context";

import TouchEvaluationBoard from "./TouchEvaluationBoard";
import SwipeEvaluationBoard from "./SwipeEvaluationBoard";
import SwipePreferenceBoard from "./SwipePreferenceBoard";

const Board = () => {
  const { currentStep, isFin } = useBoardStepContext();

  const getBoard = () => {
    if (isFin) return <div>결과</div>;
    if (currentStep === "EVALUATION_TOUCH") return <TouchEvaluationBoard />;
    else if (currentStep === "EVALUATION_SWIPE")
      return <SwipeEvaluationBoard />;
    else if (currentStep === "PREFERENCE") return <SwipePreferenceBoard />;
  };

  return <>{getBoard()}</>;
};
export default Board;
