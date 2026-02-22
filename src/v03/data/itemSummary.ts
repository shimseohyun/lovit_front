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
    category: "스트레이키즈",
    thumbnailURL: "/assets/item/idol/SKZ_FELIX.png",
  },
  11: {
    itemSummaryID: 11,
    name: "재민",
    category: "엔시티",
    thumbnailURL: "/assets/item/idol/NCT_JAEMIN.png",
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
  16: {
    itemSummaryID: 16,
    name: "이도현",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_LEEDOHYUN.jpg",
  },
  17: {
    itemSummaryID: 17,
    name: "신유",
    category: "투어스",
    thumbnailURL: "/assets/item/idol/TWS_SHINYU.jpg",
  },
  18: {
    itemSummaryID: 18,
    name: "상현",
    category: "알파드라이브원",
    thumbnailURL: "/assets/item/idol/ALPHADRIVEONE_SANGHYEON.jpg",
  },
  19: {
    itemSummaryID: 19,
    name: "제노",
    category: "엔시티",
    thumbnailURL: "/assets/item/idol/NCT_JENO.jpg",
  },
  20: {
    itemSummaryID: 20,
    name: "원우",
    category: "세븐틴",
    thumbnailURL: "/assets/item/idol/SVT_WONWOO.jpg",
  },
  21: {
    itemSummaryID: 21,
    name: "이준혁",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_LEEJUNHYUK.jpg",
  },
  22: {
    itemSummaryID: 22,
    name: "연준",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/idol/TXT_YEONJUN.jpg",
  },
  23: {
    itemSummaryID: 23,
    name: "성호",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/idol/BOYNEXTDOOR_SUNGHO.jpg",
  },
  24: {
    itemSummaryID: 24,
    name: "영훈",
    category: "더보이즈",
    thumbnailURL: "/assets/item/idol/THEBOYZ_YOUNGHUN.jpg",
  },
  25: {
    itemSummaryID: 25,
    name: "민규",
    category: "세븐틴",
    thumbnailURL: "/assets/item/idol/SVT_MINGYU.jpg",
  },
  26: {
    itemSummaryID: 26,
    name: "최립우",
    category: "가수",
    thumbnailURL: "/assets/item/idol/SINGER_CHUEILIYU.jpg",
  },
  27: {
    itemSummaryID: 27,
    name: "황민현",
    category: "뉴이스트, 워너원",
    thumbnailURL: "/assets/item/idol/ACTOR_HWANGMINHYUN.jpg",
  },
  28: {
    itemSummaryID: 28,
    name: "뷔",
    category: "방탄소년단",
    thumbnailURL: "/assets/item/idol/BTS_V.jpg",
  },
  29: {
    itemSummaryID: 29,
    name: "수빈",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/idol/TXT_SUBIN.jpg",
  },
  30: {
    itemSummaryID: 30,
    name: "진영",
    category: "B1A4",
    thumbnailURL: "/assets/item/idol/B1A4_JINYOUNG.jpg",
  },
  31: {
    itemSummaryID: 31,
    name: "강동원",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_GANGDONGWON.jpg",
  },
  32: {
    itemSummaryID: 32,
    name: "동현",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_DONGHYUN.jpg",
  },
  33: {
    itemSummaryID: 33,
    name: "한진",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/idol/BOYNEXTDOOR_HANJIN.jpg",
  },
  34: {
    itemSummaryID: 34,
    name: "정해인",
    category: "배우",
    thumbnailURL: "/assets/item/idol/ACTOR_HUNGHAEIN.jpg",
  },
  35: {
    itemSummaryID: 35,
    name: "도훈",
    category: "투어스",
    thumbnailURL: "/assets/item/idol/TWS_DOHOON.jpg",
  },
  36: {
    itemSummaryID: 36,
    name: "명재현",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/idol/BOYNEXTDOOR_JAEHYUN.jpg",
  },
  37: {
    itemSummaryID: 38,
    name: "정한",
    category: "세븐틴",
    thumbnailURL: "/assets/item/idol/SVT_JEONGHAN.jpg",
  },
  38: {
    itemSummaryID: 38,
    name: "성찬",
    category: "라이즈",
    thumbnailURL: "/assets/item/idol/RIIZE_SUNGCHAN.jpg",
  },
  39: {
    itemSummaryID: 38,
    name: "안신",
    category: "알파드라이브원",
    thumbnailURL: "/assets/item/idol/ALPHADRIVEONE_ANXIN.jpg",
  },
};
