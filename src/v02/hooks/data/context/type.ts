import type { PropsWithChildren } from "react";

import type { RoughAxisData } from "@interfacesV02/data/user";
import type {
  BoardInformation,
  ItemSummaryDict,
} from "@interfacesV02/data/system";

import type { UseBoardDataReturn } from "@hooksV02/data/board/useBoardData";
import type { UseBoardSlotReturn } from "@hooksV02/data/board/useBoardSlot";
import type { UseBoardStepReturn } from "../board/useBoardStep";

export type ProviderParams = {
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;

  horizontalRough?: RoughAxisData;
  verticalRough?: RoughAxisData;
  preferenceRough?: RoughAxisData;
};

export type BoardStaticValue = {
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;
  boardSize: number;
  stepPX: number;
} & UseBoardDataReturn;

export type BoardSlotValue = UseBoardSlotReturn;
export type BoardStepValue = UseBoardStepReturn;

export type ProviderProps = PropsWithChildren<ProviderParams>;
