import type { PropsWithChildren } from "react";

import type { RoughAxisData } from "@interfacesV02/data/user";
import type { ItemSummaryDict } from "@interfacesV02/data/system";

import { type UseBoardDataReturn } from "@hooksV02/data/board/useBoardData";
import type { UseBoardSlotReturn } from "@hooksV02/data/board/useBoardSlot";
import type { UseBoardStepReturn } from "../board/useBoardStep";

export type ProviderParams = {
  itemSummaryDict?: ItemSummaryDict;
  horizontalRough?: RoughAxisData;
  verticalRough?: RoughAxisData;
  preferenceRough?: RoughAxisData;
};

export type BoardStaticValue = {
  itemSummaryDict: ItemSummaryDict;
  boardSize: number;
  stepPX: number;
} & UseBoardDataReturn &
  UseBoardSlotReturn &
  UseBoardStepReturn;

export type ProviderProps = PropsWithChildren<ProviderParams>;
