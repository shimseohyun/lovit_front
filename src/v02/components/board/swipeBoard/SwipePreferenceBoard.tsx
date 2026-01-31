import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import SwipeBoard from "./SwipeBoard";

const SwipePreferenceBoard = () => {
  const { preference } = useBoardDataContext();
  return <SwipeBoard dataList={[preference]} axisList={["HORIZONTAL"]} />;
};

export default SwipePreferenceBoard;
