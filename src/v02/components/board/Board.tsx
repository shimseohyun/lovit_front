import * as S from "./Board.styled";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";

import TouchEvaluationBoard from "./touchEvaluationBoard/TouchEvaluationBoard";
import SwipeEvaluationBoard from "./swipeBoard/SwipeEvaluationBoard";
import SwipePreferenceBoard from "./swipeBoard/SwipePreferenceBoard";

const Board = () => {
  const { currentStep } = useBoardDataContext();

  const getBoard = () => {
    if (currentStep === "EVALUATION_TOUCH") return <TouchEvaluationBoard />;
    else if (currentStep === "EVALUATION_SWIPE")
      return <SwipeEvaluationBoard />;
    else if (currentStep === "PREFERENCE") return <SwipePreferenceBoard />;
  };
  return <S.FixedPageContainer>{getBoard()}</S.FixedPageContainer>;
};
export default Board;
