import type { ItemSummaryDict } from "@interfacesV03/data/system";

export const BOY_ITEM_ID_LIST_ALL = [
  0, // 재현
  1, // 박보검 (배우)
  2, // 태산
  3, // 박지훈 (배우)
  4, // 원빈
  5, // 주연
  6, // 하현상
  7, // 민호
  8, // 건호
  9, // 도경수
  10, // 필릭스
  11, // 재민
  12, // 진
  13, // 서강준 (배우)
  14, // 영케이
  15, // 엘
  16, // 이도현 (배우)
  17, // 신유
  18, // 상현
  19, // 제노
  20, // 원우
  21, // 이준혁 (배우)
  22, // 연준
  23, // 성호
  24, // 영훈
  25, // 민규
  26, // 최립우
  27, // 황민현
  28, // 뷔
  29, // 수빈
  30, // 진영
  31, // 강동원 (배우)
  32, // 동현 (배우)
  33, // 한진
  34, // 정해인 (배우)
  35, // 도훈
  36, // 명재현
  37, // 정한
  38, // 성찬
  39, // 안신
];

export const BOY_SUMMARY_LIST: ItemSummaryDict = {
  // actor
  1: {
    itemSummaryID: 1,
    name: "박보검",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_PARKBOGUM.jpg",
  },
  3: {
    itemSummaryID: 3,
    name: "박지훈",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_PARKJIHUN.jpg",
  },
  13: {
    itemSummaryID: 13,
    name: "서강준",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_SEOGANGJUN.jpg",
  },
  16: {
    itemSummaryID: 16,
    name: "이도현",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_LEEDOHYUN.jpg",
  },
  21: {
    itemSummaryID: 21,
    name: "이준혁",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_LEEJUNHYUK.jpg",
  },
  31: {
    itemSummaryID: 31,
    name: "강동원",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_GANGDONGWON.jpg",
  },
  32: {
    itemSummaryID: 32,
    name: "동현",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_DONGHYUN.jpg",
  },
  34: {
    itemSummaryID: 34,
    name: "정해인",
    category: "배우",
    thumbnailURL: "/assets/item/boy/ACTOR_JUNGHAEIN.jpg", // ✅ 오타 수정 (HUNG -> JUNG)
  },
  // actor =====

  // singer =====
  6: {
    itemSummaryID: 6,
    name: "하현상",
    category: "가수",
    thumbnailURL: "/assets/item/boy/SINGER_HAHYUNSANG.jpg",
  },
  // singer =====

  // nct ========
  0: {
    itemSummaryID: 0,
    name: "재현",
    category: "엔시티",
    thumbnailURL: "/assets/item/boy/NCT127_JAEHYUN.jpg",
  },
  11: {
    itemSummaryID: 11,
    name: "재민",
    category: "엔시티",
    thumbnailURL: "/assets/item/boy/NCTDREAM_JAEMIN.jpg",
  },
  19: {
    itemSummaryID: 19,
    name: "제노",
    category: "엔시티",
    thumbnailURL: "/assets/item/boy/NCTDREAM_JENO.jpg",
  },
  // nct ========

  // ✅ boynextdoor ======
  23: {
    itemSummaryID: 23,
    name: "성호",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/boy/BOYNEXTDOOR_SUNGHO.jpg",
  },
  100: {
    itemSummaryID: 100,
    name: "리우",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/boy/BOYNEXTDOOR_RIWOO.jpg",
  },
  36: {
    itemSummaryID: 36,
    name: "명재현",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/boy/BOYNEXTDOOR_JAEHYUN.jpg",
  },
  2: {
    itemSummaryID: 2,
    name: "태산",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/boy/BOYNEXTDOOR_TAESAN.jpg",
  },
  101: {
    itemSummaryID: 101,
    name: "이한",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/boy/BOYNEXTDOOR_LEEHAN.jpg",
  },
  102: {
    itemSummaryID: 102,
    name: "운학",
    category: "보이넥스트도어",
    thumbnailURL: "/assets/item/boy/BOYNEXTDOOR_WOONHAK.jpg",
  },
  // boynextdoor ======

  // ✅ riize ============

  103: {
    itemSummaryID: 103, // ✅ key와 동일
    name: "쇼타로",
    category: "라이즈",
    thumbnailURL: "/assets/item/boy/RIIZE_SHOTARO.jpg",
  },
  104: {
    itemSummaryID: 104, // ✅ key와 동일
    name: "은석",
    category: "라이즈",
    thumbnailURL: "/assets/item/boy/RIIZE_EUNSEOK.jpg",
  },
  38: {
    itemSummaryID: 38,
    name: "성찬",
    category: "라이즈",
    thumbnailURL: "/assets/item/boy/RIIZE_SUNGCHAN.jpg",
  },
  4: {
    itemSummaryID: 4,
    name: "원빈",
    category: "라이즈",
    thumbnailURL: "/assets/item/boy/RIIZE_WONBIN.jpg",
  },
  105: {
    itemSummaryID: 105, // ✅ key와 동일
    name: "소희",
    category: "라이즈",
    thumbnailURL: "/assets/item/boy/RIIZE_SOHEE.jpg",
  },
  106: {
    itemSummaryID: 106, // ✅ key와 동일
    name: "엔톤",
    category: "라이즈",
    thumbnailURL: "/assets/item/boy/RIIZE_ANTON.jpg",
  },
  // riize ============

  // ✅ tws ==============
  17: {
    itemSummaryID: 17,
    name: "신유",
    category: "투어스",
    thumbnailURL: "/assets/item/boy/TWS_SHINYU.jpg",
  },
  35: {
    itemSummaryID: 35,
    name: "도훈",
    category: "투어스",
    thumbnailURL: "/assets/item/boy/TWS_DOHOON.jpg",
  },
  107: {
    itemSummaryID: 107,
    name: "영재",
    category: "투어스",
    thumbnailURL: "/assets/item/boy/TWS_YOUNGJAE.jpg",
  },
  33: {
    itemSummaryID: 33,
    name: "한진",
    category: "투어스",
    thumbnailURL: "/assets/item/boy/TWS_HANJIN.jpg",
  },

  108: {
    itemSummaryID: 108, // ✅ key와 동일
    name: "지훈",
    category: "투어스",
    thumbnailURL: "/assets/item/boy/TWS_JIHOON.jpg",
  },
  109: {
    itemSummaryID: 109, // ✅ key와 동일
    name: "경민",
    category: "투어스",
    thumbnailURL: "/assets/item/boy/TWS_KYUNGMIN.jpg",
  },
  // tws ==============

  // ✅ svt ==============
  110: {
    itemSummaryID: 110, // ✅ key와 동일
    name: "에스쿱스",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_SCOUPS.jpg",
  },
  37: {
    itemSummaryID: 37,
    name: "정한",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_JEONGHAN.jpg",
  },
  111: {
    itemSummaryID: 111, // ✅ key와 동일
    name: "조슈아",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_JOSHUA.jpg",
  },
  112: {
    itemSummaryID: 112, // ✅ key와 동일
    name: "준",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_JUN.jpg",
  },
  113: {
    itemSummaryID: 113, // ✅ key와 동일
    name: "호시",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_HOSHI.jpg",
  },
  20: {
    itemSummaryID: 20,
    name: "원우",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_WONWOO.jpg",
  },
  114: {
    itemSummaryID: 114, // ✅ key와 동일
    name: "우지",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_WOOZI.jpg",
  },
  115: {
    itemSummaryID: 115, // ✅ key와 동일
    name: "디에잇",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_THEEIGHT.jpg",
  },
  25: {
    itemSummaryID: 25,
    name: "민규",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_MINGYU.jpg",
  },
  116: {
    itemSummaryID: 116, // ✅ key와 동일
    name: "도겸",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_DK.jpg",
  },
  117: {
    itemSummaryID: 117, // ✅ key와 동일
    name: "승관",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_SEUNGKWAN.jpg",
  },
  118: {
    itemSummaryID: 118, // ✅ key와 동일
    name: "버논",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_VERNON.jpg",
  },
  119: {
    itemSummaryID: 119, // ✅ key와 동일
    name: "디노",
    category: "세븐틴",
    thumbnailURL: "/assets/item/boy/SVT_DINO.jpg",
  },
  // svt ==============

  //tbz ===============
  5: {
    itemSummaryID: 5,
    name: "주연",
    category: "더보이즈",
    thumbnailURL: "/assets/item/boy/THEBOYZ_JUYEON.jpg",
  },
  24: {
    itemSummaryID: 24,
    name: "영훈",
    category: "더보이즈",
    thumbnailURL: "/assets/item/boy/THEBOYZ_YOUNGHUN.jpg",
  },
  //tbz ===============

  // shinee ===========
  7: {
    itemSummaryID: 7,
    name: "민호",
    category: "샤이니",
    thumbnailURL: "/assets/item/boy/SHINEE_MINHO.jpg",
  },
  // shinee ===========

  // txt ==============
  29: {
    itemSummaryID: 29,
    name: "수빈",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/boy/TXT_SUBIN.jpg",
  },
  22: {
    itemSummaryID: 22,
    name: "연준",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/boy/TXT_YEONJUN.jpg",
  },
  120: {
    itemSummaryID: 120, // ✅ key와 동일
    name: "범규",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/boy/TXT_BEOMGYU.jpg",
  },
  121: {
    itemSummaryID: 121, // ✅ key와 동일
    name: "태현",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/boy/TXT_TAEHYUN.jpg",
  },
  122: {
    itemSummaryID: 122, // ✅ key와 동일
    name: "휴닝카이",
    category: "투모로우바이투게더",
    thumbnailURL: "/assets/item/boy/TXT_HUENINGKAI.jpg",
  },
  // txt ==============

  // bts ==============
  28: {
    itemSummaryID: 28,
    name: "뷔",
    category: "방탄소년단",
    thumbnailURL: "/assets/item/boy/BTS_V.jpg",
  },

  12: {
    itemSummaryID: 12,
    name: "진",
    category: "방탄소년단",
    thumbnailURL: "/assets/item/boy/BTS_JIN.jpg",
  },
  // bts ==============

  // cortis ===========
  8: {
    itemSummaryID: 8,
    name: "건호",
    category: "코르티스",
    thumbnailURL: "/assets/item/boy/CORTIS_KEONHO.jpg",
  },
  // cortis ===========

  // exo ==============
  123: {
    itemSummaryID: 123, // ✅ key와 동일
    name: "수호",
    category: "엑소",
    thumbnailURL: "/assets/item/boy/EXO_SUHO.jpg", // ✅ 잘못 연결돼있던 썸네일 수정
  },
  124: {
    itemSummaryID: 124, // ✅ key와 동일
    name: "레이",
    category: "엑소",
    thumbnailURL: "/assets/item/boy/EXO_LAY.jpg",
  },
  125: {
    itemSummaryID: 125, // ✅ key와 동일
    name: "찬열",
    category: "엑소",
    thumbnailURL: "/assets/item/boy/EXO_CHANYEOL.jpg",
  },
  9: {
    itemSummaryID: 9,
    name: "도경수",
    category: "엑소",
    thumbnailURL: "/assets/item/boy/EXO_DO.jpg",
  },

  126: {
    itemSummaryID: 126, // ✅ key와 동일
    name: "카이",
    category: "엑소",
    thumbnailURL: "/assets/item/boy/EXO_KAI.jpg",
  },
  127: {
    itemSummaryID: 127, // ✅ key와 동일
    name: "세훈",
    category: "엑소",
    thumbnailURL: "/assets/item/boy/EXO_SEHUN.jpg",
  },

  // skz ==============
  10: {
    itemSummaryID: 10,
    name: "필릭스",
    category: "스트레이키즈",
    thumbnailURL: "/assets/item/boy/SKZ_FELIX.jpg",
  },
  // skz ==============

  // day6 =============
  14: {
    itemSummaryID: 14,
    name: "영케이",
    category: "데이식스",
    thumbnailURL: "/assets/item/boy/DAY6_YOUNGK.jpg",
  },
  // day6 =============

  // infinte ==========
  15: {
    itemSummaryID: 15,
    name: "엘",
    category: "인피니트",
    thumbnailURL: "/assets/item/boy/INFINITE_L.jpg",
  },
  // infinte ==========

  // boys planet 2 ====
  18: {
    itemSummaryID: 18,
    name: "상현",
    category: "알파드라이브원",
    thumbnailURL: "/assets/item/boy/ALPHADRIVEONE_SANGHYEON.jpg",
  },

  26: {
    itemSummaryID: 26,
    name: "최립우",
    category: "가수",
    thumbnailURL: "/assets/item/boy/SINGER_CHUEILIYU.jpg",
  },
  39: {
    itemSummaryID: 39,
    name: "안신",
    category: "알파드라이브원",
    thumbnailURL: "/assets/item/boy/ALPHADRIVEONE_ANXIN.jpg",
  },
  // boys planet 2 ====

  // produce 101 2 ====
  27: {
    itemSummaryID: 27,
    name: "황민현",
    category: "뉴이스트, 워너원",
    thumbnailURL: "/assets/item/boy/ACTOR_HWANGMINHYUN.jpg",
  },
  // produce 101 2 ====

  // b1a4
  30: {
    itemSummaryID: 30,
    name: "진영",
    category: "B1A4",
    thumbnailURL: "/assets/item/boy/B1A4_JINYOUNG.jpg",
  },
};
