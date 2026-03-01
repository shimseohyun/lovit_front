export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;
import { maxItemCount } from "@constantsV03/auth";
import { getItemSummary } from "@dataV03/itemSummary";
import { useGetPendingItemList } from "@hooksV03/api/userBoardData";

import { useEffect, useState } from "react";

type BoardStep =
  | "EVALUATION_TOUCH"
  | "EVALUATION_SWIPE_HORIZONTAL"
  | "EVALUATION_SWIPE_VERTICAL"
  | "PREFERENCE";

type Parms = {
  boardID: number;
  groupID?: number;
};

const useBoardStep = (parms: Parms) => {
  const { boardID, groupID } = parms;

  const maxCount = maxItemCount;

  const [isFin, setIsFin] = useState<boolean>(true);

  const { data, isFetching } = useGetPendingItemList(
    maxCount,
    boardID,
    groupID,
  );

  const pendingItemIDList = data.list;
  const isLast = data.isLast;

  const [currentItemIDX, setCurrentItemIDX] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<BoardStep>("EVALUATION_TOUCH");

  const final = pendingItemIDList.length;

  useEffect(() => {
    setIsFin(final == currentItemIDX);
  }, [pendingItemIDList]);

  const navigateStep = (step: BoardStep) => {
    setCurrentStep(step);
  };

  const navigateNextItemIDX = () => {
    const next = currentItemIDX + 1;

    if (next === final) {
      setIsFin(true);
      setCurrentItemIDX(next);
    } else {
      setCurrentItemIDX(next);
      setCurrentStep("EVALUATION_TOUCH");
    }
  };

  const currentItemID = pendingItemIDList[currentItemIDX] ?? 0;

  const reset = () => {};

  return {
    isFin,
    isLast,

    currentStep,
    currentItem: getItemSummary(boardID, currentItemID),
    currentItemID: currentItemID,
    currentItemIDX: currentItemIDX,
    totalStepIDX: pendingItemIDList.length,

    navigateStep,
    navigateNextItemIDX,
    reset,

    isFetching,
  };
};

export default useBoardStep;
