export type UseBoardSlotReturn = ReturnType<typeof useBoardSlot>;

import {
  type PreferenceSlot,
  type EvaluationSlot,
  type AxisType,
} from "@interfacesV02/type";
import { useState } from "react";

type GroupDict = Record<AxisType, number>;

const useBoardSlot = () => {
  const [evaluationGroup, setEvaluationGroup] = useState<GroupDict>();
  const getEvaluationGroup = (s: GroupDict) => {
    setEvaluationGroup(s);
  };
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
    evaluationGroup,
    getEvaluationGroup,
    evaluationSlot,
    setEvaluationSlot,
    preferenceSlot,
    setPreferenceSlot,
    resetSlot,
  };
};

export default useBoardSlot;
