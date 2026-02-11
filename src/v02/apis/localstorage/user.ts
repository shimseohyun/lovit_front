import type {
  GetUserBoardDataReturn,
  PostUserBoardDataBody,
} from "@apisV02/firebase/domain/user";
import { maxItemCount } from "@constantsV02/auth";
import type { ItemIDList, RoughAxisData } from "@interfacesV02/data/user";
import { convertRoughToAxisData } from "@utilsV02/convertRoughToAxisData";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

export const getUserBoardDataLocal = (): GetUserBoardDataReturn => {
  const i = window.localStorage.getItem("itemList");
  const h = window.localStorage.getItem("horizontal");
  const v = window.localStorage.getItem("vertical");
  const p = window.localStorage.getItem("preference");

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
  window.localStorage.setItem("itemList", body.itemList);
  window.localStorage.setItem("horizontal", body.axis.HORIZONTAL);
  window.localStorage.setItem("vertical", body.axis.VERTICAL);
  window.localStorage.setItem("preference", body.axis.PREFERENCE);
};
