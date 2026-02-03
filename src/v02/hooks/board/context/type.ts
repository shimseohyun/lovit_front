import type { PropsWithChildren } from "react";

import type { BoardInformation } from "@interfacesV02/data/system";

import type { UseBoardDataReturn } from "@hooksV02/board/context/useBoardData";
import type { UseBoardSlotReturn } from "@hooksV02/board/context/useBoardSlot";
import type { UseBoardStepReturn } from "@hooksV02/board/context/useBoardStep";
import type { EvaluationSlot, PreferenceSlot } from "@interfacesV02/type";

export type ProviderParams = {
  checkingItemList: number[];
  boardInformation: BoardInformation;
};

export type BoardStaticValue = {
  pushItem: (e: EvaluationSlot, p: PreferenceSlot) => void;
  boardInformation: BoardInformation;
  boardSize: number;
  stepPX: number;
} & UseBoardDataReturn;

export type BoardSlotValue = UseBoardSlotReturn;
export type BoardStepValue = UseBoardStepReturn;

export type ProviderProps = PropsWithChildren<ProviderParams>;
