export type UseBoardSlotReturn = ReturnType<typeof useBoardSlot>;

import { type PreferenceSlot, type EvaluationSlot } from "@interfacesV02/type";
import { useState } from "react";

const useBoardSlot = () => {
  const [evaluationSlot, setEvaluationSlotState] = useState<
    EvaluationSlot | undefined
  >();

  const setEvaluationSlot = (slot?: EvaluationSlot) =>
    setEvaluationSlotState(slot);

  const [preferenceSlot, setPreferenceSlotState] = useState<
    PreferenceSlot | undefined
  >();

  const setPreferenceSlot = (slot?: PreferenceSlot) =>
    setPreferenceSlotState(slot);

  const resetSlot = () => {
    setEvaluationSlot(undefined);
    setPreferenceSlot(undefined);
  };

  return {
    evaluationSlot,
    setEvaluationSlot,
    preferenceSlot,
    setPreferenceSlot,
    resetSlot,
  };
};

export default useBoardSlot;
