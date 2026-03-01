import type {
  BoardInformation,
  ItemGroupDict,
  ItemSummaryDict,
} from "@interfacesV03/data/system";

import { BOY_FACE_BOARD_INFO } from "./board/boy/boyFaceBoardInformation";
import {
  BOY_ITEM_ID_LIST_ALL,
  BOY_SUMMARY_LIST,
} from "./board/boy/boyItemSummary";
import type { ItemIDList } from "@interfacesV03/data/user";
import { BOY_ITEM_GROUP_DICT } from "./board/boy/boyItemGroup";

export type BoardDict = {
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;
  itemIDList: ItemIDList;
  itemGroupDict: ItemGroupDict;
};
export const BOARD_INFO_DICT: Record<number, BoardDict> = {
  0: {
    boardInformation: BOY_FACE_BOARD_INFO,
    itemSummaryDict: BOY_SUMMARY_LIST,
    itemIDList: BOY_ITEM_ID_LIST_ALL,
    itemGroupDict: BOY_ITEM_GROUP_DICT,
  },
};
