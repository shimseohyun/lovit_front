import type {
  GetUserBoardDataReturn,
  PostUserBoardDataBody,
} from "@apisV03/firebase/domain/user";
import { maxItemCount } from "@constantsV03/auth";
import type { ItemIDList, RoughAxisData } from "@interfacesV03/data/user";
import { convertRoughToAxisData } from "@utilsV03/convertRoughToAxisData";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

export const getUserBoardDataLocal = (): GetUserBoardDataReturn => {
  const i = window.localStorage.getItem("itemList_0");
  const h = window.localStorage.getItem("horizontal_0");
  const v = window.localStorage.getItem("vertical_0");
  const p = window.localStorage.getItem("preference_0");

  const itemList: ItemIDList = i ? JSON.parse(i) : [];
  const horizontal: RoughAxisData = h ? JSON.parse(h) : [...initialEvaluation];
  const vertical: RoughAxisData = v ? JSON.parse(v) : [...initialEvaluation];
  const preference: RoughAxisData = p ? JSON.parse(p) : [...initialPreference];

  const isMore = maxItemCount > itemList.length;

  return {
    isMore: isMore,
    itemList: itemList,
    axis: {
      HORIZONTAL: convertRoughToAxisData("HORIZONTAL", horizontal),
      VERTICAL: convertRoughToAxisData("VERTICAL", vertical),
      PREFERENCE: convertRoughToAxisData("PREFERENCE", preference),
    },
  };
};

export const postUseBoardDataLocal = (body: PostUserBoardDataBody) => {
  window.localStorage.setItem("itemList_0", body.itemList);
  window.localStorage.setItem("horizontal_0", body.axis.HORIZONTAL);
  window.localStorage.setItem("vertical_0", body.axis.VERTICAL);
  window.localStorage.setItem("preference_0", body.axis.PREFERENCE);
};
