export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;

import { useState } from "react";

type BoardStep = "EVALUATION_TOUCH" | "EVALUATION_SWIPE" | "PREFERENCE";

type Parms = {
  pendingItemIDList: number[];
};

const useBoardStep = (parms: Parms) => {
  const { pendingItemIDList } = parms;

  const final = pendingItemIDList.length;
  const [currentItemIDX, setCurrentItemIDX] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<BoardStep>("EVALUATION_TOUCH");

  const [isFin, setIsFin] = useState<boolean>(final == currentItemIDX);

  const navigateStep = (step: BoardStep) => {
    setCurrentStep(step);
  };

  const navigateNextItemIDX = () => {
    const next = currentItemIDX + 1;

    if (next === final) {
      setIsFin(true);
    } else {
      setCurrentStep("EVALUATION_TOUCH");
    }
    setCurrentItemIDX(currentItemIDX + 1);
  };

  const setIsFinTrue = () => {
    setIsFin(true);
  };

  const currentItemID = pendingItemIDList[currentItemIDX] ?? 0;

  return {
    isFin,

    currentStep,
    currentItemID: currentItemID,
    currentItemIDX: currentItemIDX,

    navigateStep,
    navigateNextItemIDX,
    setIsFinTrue,
  };
};

export default useBoardStep;
