export type UseBoardStepReturn = ReturnType<typeof useBoardStep>;

import type { EvaluationSlot } from "@interfacesV02/type";
import { useState } from "react";

type BoardStep = "EVALUATION_TOUCH" | "EVALUATION_SWIPE" | "PREFERENCE";

type Parms = {
  setEvaluationSlot: (slot?: EvaluationSlot) => void;
  itemListLength: number;
};

const useBoardStep = (parms: Parms) => {
  const { setEvaluationSlot, itemListLength } = parms;

  const [currentItemID, setCurrentItemID] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<BoardStep>("EVALUATION_TOUCH");

  const [isFin, setIsFin] = useState<boolean>(itemListLength == currentItemID);

  const navigateEvaluationSwipe = (slot: EvaluationSlot) => {
    setEvaluationSlot(slot);
    setCurrentStep("EVALUATION_SWIPE");
  };

  const navigatePreference = () => {
    setCurrentStep("PREFERENCE");
  };

  const confrimCurrentStep = () => {
    setCurrentStep("PREFERENCE");
    setCurrentItemID(currentItemID + 1);
    setEvaluationSlot();
  };

  const quitAllStep = () => {
    setIsFin(true);
  };
  return {
    isFin,
    currentStep,
    currentItemID,
    navigateEvaluationSwipe,
    navigatePreference,
    confrimCurrentStep,
    quitAllStep,
  };
};

export default useBoardStep;
