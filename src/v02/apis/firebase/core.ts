import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp);

export type WithId<T> = T & { id: string };

type FsDocRef = DocumentReference<DocumentData, DocumentData>;
type FsColRef = CollectionReference<DocumentData, DocumentData>;

export const normalizePath = (path: string) => {
  const trimmed = path.trim();
  const noQuery = trimmed.split("?")[0];
  const normalized = noQuery.replace(/^\/+|\/+$/g, "");
  if (!normalized) throw new Error("Firestore path is empty.");
  return normalized;
};

export const splitSegments = (path: string) =>
  normalizePath(path).split("/").filter(Boolean);

export const isDocPath = (path: string) => splitSegments(path).length % 2 === 0;

export const toDocRef = (path: string): FsDocRef => {
  const normalized = normalizePath(path);
  if (!isDocPath(normalized)) {
    throw new Error(`Expected document path (even segments): ${path}`);
  }
  return doc(firestoreDb, normalized) as FsDocRef;
};

export const toColRef = (path: string): FsColRef => {
  const normalized = normalizePath(path);
  if (isDocPath(normalized)) {
    throw new Error(`Expected collection path (odd segments): ${path}`);
  }
  return collection(firestoreDb, normalized) as FsColRef;
};

export const getErrorCode = (error: unknown) => {
  if (error instanceof FirebaseError) {
    if (error.code === "unauthenticated") return 401;
    if (error.code === "permission-denied") return 403;
    return 500;
  }
  return 500;
};
