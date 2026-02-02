export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;

import type { EvaluationSlot } from "@interfacesV02/type";
import { useState } from "react";

type BoardStep = "EVALUATION_TOUCH" | "EVALUATION_SWIPE" | "PREFERENCE";

type Parms = {
  checkingItemList: number[];
  setEvaluationSlot: (slot?: EvaluationSlot) => void;
};

const useBoardStep = (parms: Parms) => {
  const { setEvaluationSlot, checkingItemList } = parms;

  const final = checkingItemList.length;
  const [currentItemIDX, setCurrentItemIDX] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<BoardStep>("EVALUATION_TOUCH");

  const [isFin, setIsFin] = useState<boolean>(final == currentItemIDX);

  const navigateEvaluationSwipe = (slot: EvaluationSlot) => {
    setEvaluationSlot(slot);
    setCurrentStep("EVALUATION_SWIPE");
  };

  const navigatePreference = () => {
    setCurrentStep("PREFERENCE");
  };

  const confrimCurrentStep = () => {
    const next = currentItemIDX + 1;
    if (next === final) {
      setIsFin(true);
      setEvaluationSlot();
    } else {
      setCurrentItemIDX(currentItemIDX + 1);
      setCurrentStep("EVALUATION_TOUCH");
      setEvaluationSlot();
    }
  };

  const quitAllStep = () => {
    setIsFin(true);
  };

  const currentItemID = checkingItemList[currentItemIDX] ?? 0;

  return {
    isFin,
    currentStep,
    currentItemID: currentItemID,
    navigateEvaluationSwipe,
    navigatePreference,
    confrimCurrentStep,
    quitAllStep,
  };
};

export default useBoardStep;
