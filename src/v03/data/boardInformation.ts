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
    description: "이중에 하나쯤은 있겠지 ~ ⁺˚⋆୭🌸⋆⁺",
    thumbnailURL:
      "https://cdn.slist.kr/news/photo/202505/643758_1003458_3322.jpg",
    randomButtonURL:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fd2uhhi%2FdJMcaiJabuq%2FAAAAAAAAAAAAAAAAAAAAADKaXfftyvJZoFb8qxWHAmLp5rV_QNA6gLLkIAyfzROW%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3Da7jxYOlJXT2PBoR2oTaKmDSVasA%253D",
    boardInformation: FACE_BOARD_INFO,
    itemSummaryDict: BOY_SUMMARY_LIST,
    itemIDList: BOY_ITEM_ID_LIST_ALL,
    itemGroupDict: BOY_ITEM_GROUP_DICT,
  },
  1: {
    title: "남자 연예인에서 취향 찾기",
    description: "이중에 하나쯤은 있겠지 ~ ⁺˚⋆୭🌸⋆⁺",
    thumbnailURL:
      "https://cdn.slist.kr/news/photo/202505/643758_1003458_3322.jpg",
    randomButtonURL: "https://img.hankyung.com/photo/202509/01.41826625.1.jpg",
    boardInformation: FACE_BOARD_INFO,
    itemSummaryDict: GIRL_SUMMARY_LIST,
    itemIDList: GIRL_ITEM_ID_LIST_ALL,
    itemGroupDict: GIRL_ITEM_GROUP_DICT,
  },
};
