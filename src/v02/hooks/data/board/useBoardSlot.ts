export type UseBoardSlotReturn = ReturnType<typeof useBoardSlot>;

import { type PreferenceSlot, type EvaluationSlot } from "@interfacesV02/type";
import { useCallback, useState } from "react";

const useBoardSlot = () => {
  const [evaluationSlot, setEvaluationSlotState] = useState<
    EvaluationSlot | undefined
  >();

  const setEvaluationSlot = useCallback(
    (slot?: EvaluationSlot) => setEvaluationSlotState(slot),
    [setEvaluationSlotState],
  );

  const [preferenceSlot, setPreferenceSlotState] = useState<
    PreferenceSlot | undefined
  >();

  const setPreferenceSlot = useCallback(
    (slot?: PreferenceSlot) => setPreferenceSlotState(slot),
    [setPreferenceSlotState],
  );

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
