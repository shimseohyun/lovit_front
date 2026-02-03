import { getItemIDList } from "@dataV02/itemSummary";
import { getCheckedItemIDList } from "./localStorage";

const useGetPendingItemIDList = () => {
  const checkedItemList = getCheckedItemIDList();
  const itemIDList = getItemIDList();
  const checkedItemIDSet = new Set(checkedItemList);

  const pendingItemIDList = itemIDList.filter(
    (id) => !checkedItemIDSet.has(id),
  );

  return { pendingItemIDList };
};

export default useGetPendingItemIDList;
