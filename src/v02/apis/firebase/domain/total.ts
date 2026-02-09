import { signInAnonymously } from "firebase/auth";
import { doc, getDoc, runTransaction } from "firebase/firestore";

import { firestoreAuth, firestoreDb } from "@apisV02/firebase/core";
import type { BoardAxisType } from "@interfacesV02/type";

// ===== Types =====
export type TotalBoardItemData = Record<BoardAxisType, number[]>;
export type TotalBoardData = Record<number, TotalBoardItemData>;

export type GetTotalBoardDataReturn = {
  totalBoardData: TotalBoardData;
};

export type PostUserDataParams = {
  itemID: number;
  HORIZONTAL: number; // append 1개
  VERTICAL: number; // append 1개
  PREFERENCE: number; // append 1개
};

// ===== Utils =====

const ensureAuthed = async () => {
  if (firestoreAuth.currentUser) return firestoreAuth.currentUser;
  const cred = await signInAnonymously(firestoreAuth);
  return cred.user;
};

const isFiniteNumber = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v);

const isNumberArray = (v: unknown): v is number[] =>
  Array.isArray(v) && v.every(isFiniteNumber);

const getTotalDocRef = () => doc(firestoreDb, "totalBoardData", "main");

const normalizeItem = (raw: unknown): TotalBoardItemData => {
  const obj = (raw ?? {}) as Record<string, unknown>;
  return {
    HORIZONTAL: isNumberArray(obj.HORIZONTAL) ? obj.HORIZONTAL : [],
    VERTICAL: isNumberArray(obj.VERTICAL) ? obj.VERTICAL : [],
    PREFERENCE: isNumberArray(obj.PREFERENCE) ? obj.PREFERENCE : [],
  };
};

const parseTotalBoardData = (raw: unknown): TotalBoardData => {
  if (!raw || typeof raw !== "object") return {};

  const root = raw as Record<string, unknown>;
  const out: TotalBoardData = {};

  for (const [k, v] of Object.entries(root)) {
    const itemID = Number(k);
    if (!Number.isFinite(itemID)) continue;
    out[itemID] = normalizeItem(v);
  }
  return out;
};

// ===== 1) 전체 조회 =====
export const getTotalBoardData = async (): Promise<GetTotalBoardDataReturn> => {
  await ensureAuthed();

  const docRef = getTotalDocRef();
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    // 문서가 아직 없다면 빈 객체 반환
    return { totalBoardData: {} };
  }

  return { totalBoardData: parseTotalBoardData(snap.data()) };
};

// ===== 2) 특정 item에 H/V/P 1개씩 append (중복 허용) =====
export const postUserDataToTotalBoardData = async (
  params: PostUserDataParams,
): Promise<void> => {
  const { itemID, HORIZONTAL, VERTICAL, PREFERENCE } = params;

  // 값 검증(숫자 아니면 거부)
  if (![HORIZONTAL, VERTICAL, PREFERENCE].every(isFiniteNumber)) {
    throw new Error("INVALID_VALUE");
  }

  await ensureAuthed();

  const docRef = getTotalDocRef();
  const itemKey = String(itemID);

  await runTransaction(firestoreDb, async (tx) => {
    const snap = await tx.get(docRef);
    const root = (snap.exists() ? snap.data() : {}) as Record<string, unknown>;

    // item이 없으면 기본값으로 시작
    const prevItem = root[itemKey];
    const nextItem = normalizeItem(prevItem);

    nextItem.HORIZONTAL = [...nextItem.HORIZONTAL, HORIZONTAL];
    nextItem.VERTICAL = [...nextItem.VERTICAL, VERTICAL];
    nextItem.PREFERENCE = [...nextItem.PREFERENCE, PREFERENCE];

    // 문서가 없어도 set+merge면 생성되면서 반영됨
    tx.set(docRef, { [itemKey]: nextItem }, { merge: true });
  });
};
