import { addDoc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  getErrorCode,
  isDocPath,
  normalizePath,
  toColRef,
  toDocRef,
  type WithId,
} from "./core";

type CreateFirestoreInstanceOptions = {
  basePath?: string; // 선택: 모든 url 앞에 prefix
  onUnauthorized?: () => void;
  enableLog?: boolean;
};

const joinBasePath = (basePath: string, url: string) => {
  const base = basePath.replace(/^\/+|\/+$/g, "");
  const u = url.startsWith("/") ? url : `/${url}`;
  if (!base) return u;
  return `/${base}${u}`;
};

const createFirestoreInstance = (options?: CreateFirestoreInstanceOptions) => {
  const basePath = options?.basePath ?? "";
  const onUnauthorized = options?.onUnauthorized;
  const enableLog = options?.enableLog ?? true;

  /**
   * ✅ 읽기 (문서 1개)
   * - "/boards/00" 처럼 문서 path만
   */
  const getResponse = async <T>(
    url: string,
    config?: { withId?: boolean },
  ): Promise<T | WithId<T> | null> => {
    const fullUrl = joinBasePath(basePath, url);

    try {
      const ref = toDocRef(fullUrl);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        if (enableLog) console.log(`[GET] ${fullUrl} - not found`);
        return null;
      }

      const data = snap.data() as T;
      const result = config?.withId
        ? ({ ...data, id: snap.id } as WithId<T>)
        : data;

      if (enableLog) console.log(`[GET] ${fullUrl} - ok`);
      return result;
    } catch (error) {
      const code = getErrorCode(error);
      if (enableLog) console.error("Firestore GET error:", error);
      if (code === 401 || code === 403) onUnauthorized?.();
      return null;
    }
  };

  /**
   * ✅ 쓰기 (POST처럼)
   * - "/boards"      (컬렉션) -> addDoc 자동 id 생성 => { id }
   * - "/boards/00"   (문서)   -> setDoc 덮어쓰기      => true
   */
  const postResponse = async <TRequest extends Record<string, unknown>>(
    url: string,
    data: TRequest,
  ): Promise<{ id: string } | true | null> => {
    const fullUrl = joinBasePath(basePath, url);

    try {
      const normalized = normalizePath(fullUrl);

      if (isDocPath(normalized)) {
        const ref = toDocRef(normalized);
        await setDoc(ref, data, { merge: false });
        if (enableLog) console.log(`[POST->SET] ${fullUrl} - ok`);
        return true as const; // ✅ literal true 유지
      }

      const ref = toColRef(normalized);
      const created = await addDoc(ref, data);
      if (enableLog) console.log(`[POST] ${fullUrl} - created: ${created.id}`);
      return { id: created.id };
    } catch (error) {
      const code = getErrorCode(error);
      if (enableLog) console.error("Firestore POST error:", error);
      if (code === 401 || code === 403) onUnauthorized?.();
      return null;
    }
  };

  /**
   * ✅ 기존 문서 업데이트 (PATCH처럼)
   * - "/boards/00"
   */
  const patchResponse = async <TPatch extends Record<string, unknown>>(
    url: string,
    patch: Partial<TPatch>,
  ): Promise<true | null> => {
    const fullUrl = joinBasePath(basePath, url);

    try {
      const ref = toDocRef(fullUrl);
      await updateDoc(ref, patch as Record<string, unknown>);
      if (enableLog) console.log(`[PATCH] ${fullUrl} - ok`);
      return true as const; // ✅ literal true 유지
    } catch (error) {
      const code = getErrorCode(error);
      if (enableLog) console.error("Firestore PATCH error:", error);
      if (code === 401 || code === 403) onUnauthorized?.();
      return null;
    }
  };

  return { getResponse, postResponse, patchResponse } as const;
};

export const firestoreInstance = createFirestoreInstance({
  onUnauthorized: () => {
    // 필요하면 너 axios처럼 처리
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history.go(0);
  },
});
