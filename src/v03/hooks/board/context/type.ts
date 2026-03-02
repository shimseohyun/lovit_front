import type { PropsWithChildren } from "react";

import type {
  BoardInformation,
  ItemSummaryDict,
} from "@interfacesV03/data/system";

import type { UseBoardDataReturn } from "@hooksV03/board/context/useBoardData";
import type { UseBoardSlotReturn } from "@hooksV03/board/context/useBoardSlot";
import type { UseBoardStepReturn } from "@hooksV03/board/context/useBoardStep";

export type ProviderParams = {
  boardID: number;
  groupID?: number;
};

export type BoardStaticValue = {
  boardID: number;
  groupID?: number;
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;
  stepPX: number;
} & UseBoardDataReturn;

export type BoardSlotValue = UseBoardSlotReturn;
export type BoardStepValue = UseBoardStepReturn;

export type ProviderProps = PropsWithChildren<ProviderParams>;
