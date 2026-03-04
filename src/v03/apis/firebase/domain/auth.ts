import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firestoreAuth } from "../core";
import { postUserBoardData } from "./user";
import type { ItemIDList, RoughAxisData } from "@interfacesV03/data/user";
import {
  HORIZONTAL,
  ITEM_LIST,
  PREFERENCE,
  VERTICAL,
} from "@apisV03/localstorage/path";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

const postPrevData = async (uid: string, boardID: number) => {
  const i = window.localStorage.getItem(ITEM_LIST(boardID));
  const h = window.localStorage.getItem(HORIZONTAL(boardID));
  const v = window.localStorage.getItem(VERTICAL(boardID));
  const p = window.localStorage.getItem(PREFERENCE(boardID));

  const itemList: ItemIDList = i ? JSON.parse(i) : [];
  const horizontal: RoughAxisData = h ? JSON.parse(h) : initialEvaluation;
  const vertical: RoughAxisData = v ? JSON.parse(v) : initialEvaluation;
  const preference: RoughAxisData = p ? JSON.parse(p) : initialPreference;

  await postUserBoardData(boardID, uid, {
    itemList: JSON.stringify(itemList),
    axis: {
      HORIZONTAL: JSON.stringify(horizontal),
      VERTICAL: JSON.stringify(vertical),
      PREFERENCE: JSON.stringify(preference),
    },
  });
};

// TODO:-> 변경하기
export const postGoogleLogin = async () => {
  const isPrevData = true;
  const provider = new GoogleAuthProvider();

  try {
    let credential = await signInWithPopup(firestoreAuth, provider);

    // 회원가입일 경우
    const additional = getAdditionalUserInfo(credential);
    console.log("바꿔야함", additional);
    if (additional?.isNewUser && isPrevData)
      await postPrevData(credential.user.uid, 0);
    window.localStorage.clear();
    window.location.reload();
  } catch (e) {
    throw e;
  }
};

export const postLogout = async () => {
  await signOut(firestoreAuth);
};
