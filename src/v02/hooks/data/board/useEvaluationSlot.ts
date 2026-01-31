export type UseEvaluationSlotReturn = ReturnType<typeof useEvaluationSlot>;

import type { EvaluationSlot } from "@interfacesV02/type";
import { useCallback, useState } from "react";

const useEvaluationSlot = () => {
  const [evaluationSlot, setEvaluationSlotState] = useState<
    EvaluationSlot | undefined
  >();

  const setEvaluationSlot = useCallback(
    (slot?: EvaluationSlot) => setEvaluationSlotState(slot),
    [setEvaluationSlotState],
  );

  return { evaluationSlot, setEvaluationSlot };
};

export default useEvaluationSlot;
