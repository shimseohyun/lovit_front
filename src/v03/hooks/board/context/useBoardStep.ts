export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;
import { maxItemCount } from "@constantsV03/auth";
import { getItemSummary } from "@dataV03/itemSummary";
import { useGetPendingItemList } from "@hooksV03/api/userBoardData";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useEffect, useState } from "react";

type BoardStep = "EVALUATION_TOUCH" | "EVALUATION_SWIPE" | "PREFERENCE";

type Parms = {
  maxCount?: number;
};

const useBoardStep = (parms: Parms) => {
  const { maxCount = maxItemCount } = parms;

  const [isFin, setIsFin] = useState<boolean>(true);

  const { user } = useAuth();

  const { data, isFetching } = useGetPendingItemList(user?.uid, maxCount);

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

  return {
    isFin,
    isLast,

    currentStep,
    currentItem: getItemSummary(currentItemID),
    currentItemID: currentItemID,
    currentItemIDX: currentItemIDX,
    totalStepIDX: pendingItemIDList.length,

    navigateStep,
    navigateNextItemIDX,

    isFetching,
  };
};

export default useBoardStep;
