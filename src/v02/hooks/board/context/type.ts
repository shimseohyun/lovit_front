import type { PropsWithChildren } from "react";

import type { BoardInformation } from "@interfacesV02/data/system";

import type { UseBoardDataReturn } from "@hooksV02/board/context/useBoardData";
import type { UseBoardSlotReturn } from "@hooksV02/board/context/useBoardSlot";
import type { UseBoardStepReturn } from "@hooksV02/board/context/useBoardStep";

export type ProviderParams = {
  boardInformation: BoardInformation;
};

export type BoardStaticValue = {
  boardInformation: BoardInformation;
  stepPX: number;
} & UseBoardDataReturn;

export type BoardSlotValue = UseBoardSlotReturn;
export type BoardStepValue = UseBoardStepReturn;

export type ProviderProps = PropsWithChildren<ProviderParams>;
