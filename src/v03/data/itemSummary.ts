import type { ItemSummaryDict } from "@interfacesV03/data/system";
import type { ItemIDList } from "@interfacesV03/data/user";

export const getItemCount = (dict: ItemSummaryDict) => Object.keys(dict).length;
export const getItemSummary = (itemID: number, dict: ItemSummaryDict) =>
  dict[itemID];
export const getItemIDList = (dict: ItemSummaryDict): ItemIDList => {
  return Object.keys(dict).map(Number);
};
