import type { ItemSummaryDict } from "@interfacesV02/data/system";
import type { ItemIDList } from "@interfacesV02/data/user";

export const getItemSummary = (itemID: number) => IDOL_SUMMAR_LIST[itemID];
export const getItemIDList = (): ItemIDList => {
  return Object.keys(IDOL_SUMMAR_LIST).map(Number);
};

const IDOL_SUMMAR_LIST: ItemSummaryDict = {
  0: {
    itemSummaryID: 0,
    name: "아이린",
    category: "레드벨벳",
    thumbnailURL: "/assets/item/idol/redvelvet_0.webp",
  },
  1: {
    itemSummaryID: 1,
    name: "슬기",
    category: "레드벨벳",
    thumbnailURL: "/assets/item/idol/redvelvet_1.webp",
  },
  2: {
    itemSummaryID: 2,
    name: "웬디",
    category: "레드벨벳",
    thumbnailURL: "/assets/item/idol/redvelvet_2.webp",
  },
  3: {
    itemSummaryID: 3,
    name: "조이",
    category: "레드벨벳",
    thumbnailURL: "/assets/item/idol/redvelvet_3.webp",
  },
  4: {
    itemSummaryID: 4,
    name: "예리",
    category: "레드벨벳",
    thumbnailURL: "/assets/item/idol/redvelvet_4.webp",
  },
};
