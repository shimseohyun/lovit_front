import { useBoardStepContext } from "@hooksV03/board/context/context";

import TouchEvaluationBoard from "./TouchEvaluationBoard";
import SwipeEvaluationBoard from "./SwipeEvaluationBoard";
import SwipePreferenceBoard from "./SwipePreferenceBoard";

import Fin from "./Fin";
import FullSpinner from "@componentsV03/spinner/Spinner";

const Board = () => {
  const { currentStep, isFin, isFetching } = useBoardStepContext();

  const getBoard = () => {
    if (isFetching) return <FullSpinner />;

    if (isFin) return <Fin />;

    if (currentStep === "EVALUATION_TOUCH") return <TouchEvaluationBoard />;
    else if (currentStep === "EVALUATION_SWIPE")
      return <SwipeEvaluationBoard />;
    else if (currentStep === "PREFERENCE") return <SwipePreferenceBoard />;
  };

  return getBoard();
};
export default Board;
