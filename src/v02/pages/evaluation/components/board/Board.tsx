import { useBoardStepContext } from "@hooksV02/board/context/context";

import TouchEvaluationBoard from "./TouchEvaluationBoard";
import SwipeEvaluationBoard from "./SwipeEvaluationBoard";
import SwipePreferenceBoard from "./SwipePreferenceBoard";
import Result from "./Result";

const Board = () => {
  const { currentStep, isFin } = useBoardStepContext();

  const getBoard = () => {
    if (isFin) return <Result />;

    // 끝나지 않음
    if (currentStep === "EVALUATION_TOUCH") return <TouchEvaluationBoard />;
    else if (currentStep === "EVALUATION_SWIPE")
      return <SwipeEvaluationBoard />;
    else if (currentStep === "PREFERENCE") return <SwipePreferenceBoard />;
  };

  return getBoard();
};
export default Board;
