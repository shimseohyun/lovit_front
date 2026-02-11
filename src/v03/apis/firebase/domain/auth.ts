import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firestoreAuth } from "../core";
import { postUserBoardData } from "./user";
import type { ItemIDList, RoughAxisData } from "@interfacesV03/data/user";

const initialEvaluation = [[], [], [], [], [], []];
const initialPreference = [[], [], [], [], [], [], [], [], [], [], []];

const postPrevData = async (uid: string) => {
  const i = window.localStorage.getItem("itemList");
  const h = window.localStorage.getItem("horizontal");
  const v = window.localStorage.getItem("vertical");
  const p = window.localStorage.getItem("preference");

  const itemList: ItemIDList = i ? JSON.parse(i) : [];
  const horizontal: RoughAxisData = h ? JSON.parse(h) : initialEvaluation;
  const vertical: RoughAxisData = v ? JSON.parse(v) : initialEvaluation;
  const preference: RoughAxisData = p ? JSON.parse(p) : initialPreference;

  await postUserBoardData(uid, {
    itemList: JSON.stringify(itemList),
    axis: {
      HORIZONTAL: JSON.stringify(horizontal),
      VERTICAL: JSON.stringify(vertical),
      PREFERENCE: JSON.stringify(preference),
    },
  });
};

export const postGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    let credential = await signInWithPopup(firestoreAuth, provider);

    // 회원가입일 경우
    const additional = getAdditionalUserInfo(credential);
    if (additional?.isNewUser) await postPrevData(credential.user.uid);
    window.localStorage.clear();
    window.location.reload();
  } catch (e) {
    throw e;
  }
};

export const postLogout = async () => {
  await signOut(firestoreAuth);
};
