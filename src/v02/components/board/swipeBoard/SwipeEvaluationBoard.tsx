import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import SwipeBoard from "./SwipeBoard";

const SwipeEvaluationBoard = () => {
  const { vertical, horizontal } = useBoardDataContext();
  return (
    <SwipeBoard
      dataList={[vertical, horizontal]}
      axisList={["VERTICAL", "HORIZONTAL"]}
    />
  );
};

export default SwipeEvaluationBoard;
