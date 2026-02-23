import type {
  BoardInformation,
  ItemSummaryDict,
} from "@interfacesV03/data/system";

import { BOY_FACE_BOARD_INFO } from "./board/boy/boyFaceBoardInformation";
import { BOY_SUMMARY_LIST } from "./board/boy/boyItemSummary";

export type BoardDict = {
  boardInformation: BoardInformation;
  itemSummary: ItemSummaryDict;
};
export const BOARD_INFO_DICT: Record<number, BoardDict> = {
  0: { boardInformation: BOY_FACE_BOARD_INFO, itemSummary: BOY_SUMMARY_LIST },
};
