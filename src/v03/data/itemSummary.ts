import type { ItemSummaryDict } from "@interfacesV03/data/system";
import type { ItemIDList } from "@interfacesV03/data/user";

export const getItemCount = () => Object.keys(IDOL_SUMMAR_LIST).length;
export const getItemSummary = (itemID: number) => IDOL_SUMMAR_LIST[itemID];
export const getItemIDList = (): ItemIDList => {
  return Object.keys(IDOL_SUMMAR_LIST).map(Number);
};

const IDOL_SUMMAR_LIST: ItemSummaryDict = {
  0: {
    itemSummaryID: 0,
    name: "재현",
    category: "엔시티",
    thumbnailURL: "/assets/item/idol/NCT_JAEHYUN.png",
  },
  1: {
    itemSummaryID: 1,
    name: "박보검",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_PARKBOGUM.png",
  },
  2: {
    itemSummaryID: 2,
    name: "태산",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/idol/BOYNEXTDOOR_TAESAN.png",
  },
  3: {
    itemSummaryID: 3,
    name: "박지훈",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_PARKJIHUN.png",
  },
  4: {
    itemSummaryID: 4,
    name: "원빈",
    category: "라이즈",
    thumbnailURL: "/assets/item/idol/RIIZE_WONBIN.png",
  },
  5: {
    itemSummaryID: 5,
    name: "주연",
    category: "더보이즈",
    thumbnailURL: "/assets/item/idol/THEBOYZ_JUYEON.png",
  },
  6: {
    itemSummaryID: 6,
    name: "하현상",
    category: "가수",
    thumbnailURL: "/assets/item/idol/SINGER_HAHYUNSANG.png",
  },
  7: {
    itemSummaryID: 7,
    name: "민호",
    category: "샤이니",
    thumbnailURL: "/assets/item/idol/SHINEE_MINHO.png",
  },
  8: {
    itemSummaryID: 8,
    name: "건호",
    category: "코르티스",
    thumbnailURL: "/assets/item/idol/CORTIS_KEONHO.png",
  },
  9: {
    itemSummaryID: 9,
    name: "도경수",
    category: "엑소",
    thumbnailURL: "/assets/item/idol/EXO_DO.png",
  },
  10: {
    itemSummaryID: 10,
    name: "필릭스",
    category: "스트레이 키즈",
    thumbnailURL: "/assets/item/idol/SKZ_FELIX.png",
  },
  11: {
    itemSummaryID: 11,
    name: "재민",
    category: "엔시티",
    thumbnailURL: "/assets/item/idol/NCT_JAEHYUN.png",
  },
  12: {
    itemSummaryID: 12,
    name: "진",
    category: "방탄소년단",
    thumbnailURL: "/assets/item/idol/BTS_JIN.png",
  },
  13: {
    itemSummaryID: 13,
    name: "서강준",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_SEOGANGJUN.png",
  },
  14: {
    itemSummaryID: 14,
    name: "영케이",
    category: "데이식스",
    thumbnailURL: "/assets/item/idol/DAY6_YOUNGK.png",
  },
  15: {
    itemSummaryID: 15,
    name: "엘",
    category: "인피니트",
    thumbnailURL: "/assets/item/idol/INFINITE_L.png",
  },
};

// 여돌
// const IDOL_SUMMAR_LIST: ItemSummaryDict = {
//   0: {
//     itemSummaryID: 0,
//     name: "아이린",
//     category: "레드벨벳",
//     thumbnailURL: "/assets/item/idol/redvelvet_0.webp",
//   },
//   1: {
//     itemSummaryID: 1,
//     name: "슬기",
//     category: "레드벨벳",
//     thumbnailURL: "/assets/item/idol/redvelvet_1.webp",
//   },
//   2: {
//     itemSummaryID: 2,
//     name: "웬디",
//     category: "레드벨벳",
//     thumbnailURL: "/assets/item/idol/redvelvet_2.webp",
//   },
//   3: {
//     itemSummaryID: 3,
//     name: "조이",
//     category: "레드벨벳",
//     thumbnailURL: "/assets/item/idol/redvelvet_3.webp",
//   },
//   4: {
//     itemSummaryID: 4,
//     name: "예리",
//     category: "레드벨벳",
//     thumbnailURL: "/assets/item/idol/redvelvet_4.webp",
//   },
// };
