import type {
  BoardInformation,
  ItemGroupDict,
  ItemSummaryDict,
} from "@interfacesV03/data/system";

import {
  BOY_ITEM_ID_LIST_ALL,
  BOY_SUMMARY_LIST,
} from "./board/boy/boyItemSummary";
import type { ItemIDList } from "@interfacesV03/data/user";
import { BOY_ITEM_GROUP_DICT } from "./board/boy/boyItemGroup";

import { GIRL_ITEM_GROUP_DICT } from "./board/girl/girlItemGroup";
import {
  GIRL_ITEM_ID_LIST_ALL,
  GIRL_SUMMARY_LIST,
} from "./board/girl/girlItemSummary";
import { FACE_BOARD_INFO } from "./board/faceBoardInformation";

export type BoardDict = {
  title: string;
  description: string;
  thumbnailURL: string;
  randomButtonURL: string;
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;
  itemIDList: ItemIDList;
  itemGroupDict: ItemGroupDict;
};
export const BOARD_INFO_DICT: Record<number, BoardDict> = {
  0: {
    title: "남자 연예인에서 취향 찾기",
    description: "버터 강아지? 두부 고양이? 내 취향은 어느쪽일까...?",
    thumbnailURL: "/assets/item/boy/_BOARD.jpg",
    randomButtonURL: "/assets/item/boy/_ALL.jpg",
    boardInformation: FACE_BOARD_INFO,
    itemSummaryDict: BOY_SUMMARY_LIST,
    itemIDList: BOY_ITEM_ID_LIST_ALL,
    itemGroupDict: BOY_ITEM_GROUP_DICT,
  },
  1: {
    title: "여자 연예인에서 취향 찾기",
    description: "버터 강아지? 두부 고양이? 내 취향은 어느쪽일까...?",
    thumbnailURL: "",
    randomButtonURL: "",
    boardInformation: FACE_BOARD_INFO,
    itemSummaryDict: GIRL_SUMMARY_LIST,
    itemIDList: GIRL_ITEM_ID_LIST_ALL,
    itemGroupDict: GIRL_ITEM_GROUP_DICT,
  },
};
