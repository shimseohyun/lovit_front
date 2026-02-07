export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;
import { getItemSummary } from "@dataV02/itemSummary";
import { useGetPendingItemList } from "@hooksV02/api/userBoardData";
import { useAuth } from "@hooksV02/auth/useAuth";
import { useEffect, useState } from "react";

type BoardStep = "EVALUATION_TOUCH" | "EVALUATION_SWIPE" | "PREFERENCE";

type Parms = {
  maxCount?: number;
};

const useBoardStep = (parms: Parms) => {
  const { maxCount = 8 } = parms;
  const [isFin, setIsFin] = useState<boolean>(true);

  const { user } = useAuth();
  const {
    data,
    isFetching,
    refetch: refetchPendingList,
  } = useGetPendingItemList(user?.uid, maxCount);

  const pendingItemIDList = data?.list ?? [];
  const isLast = data?.isLast ?? true;

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

  const setIsFinTrue = () => {
    setIsFin(true);
  };

  const reset = () => {
    setCurrentItemIDX(0);
    refetchPendingList();
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
    setIsFinTrue,
    isFetching,
    reset,
  };
};

export default useBoardStep;
