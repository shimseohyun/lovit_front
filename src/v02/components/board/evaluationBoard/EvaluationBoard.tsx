import { useBoardDataContext } from "@hooksV02/data/contextBoardData";
import TouchEvaluationBoard from "../touchEvaluationBoard/TouchEvaluationBoard";
import SwipeEvaluationBoard from "../swipeEvaluationBoard/SwipeEvaluationBoard";

const EvaluationBoard = () => {
  const { boardSlot } = useBoardDataContext();
  return (
    <>
      <h1>제목</h1>

      {boardSlot === undefined ? (
        <TouchEvaluationBoard />
      ) : (
        <SwipeEvaluationBoard />
      )}
    </>
  );
};
export default EvaluationBoard;
