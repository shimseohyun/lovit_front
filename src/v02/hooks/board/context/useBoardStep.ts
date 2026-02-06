export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;

import { useGetPendingItemList } from "@apisV02/firebase/domain/user";
import { useEffect, useState } from "react";

type BoardStep = "EVALUATION_TOUCH" | "EVALUATION_SWIPE" | "PREFERENCE";

type Parms = {
  maxCount?: number;
};

const useBoardStep = (parms: Parms) => {
  const { maxCount = 2 } = parms;
  const [isFin, setIsFin] = useState<boolean>(true);

  const { data, refetch: refetchPendingList } = useGetPendingItemList(maxCount);

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
    currentItemID: currentItemID,
    currentItemIDX: currentItemIDX,

    navigateStep,
    navigateNextItemIDX,
    setIsFinTrue,

    reset,
  };
};

export default useBoardStep;
