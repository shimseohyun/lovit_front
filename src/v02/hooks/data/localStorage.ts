import type {
  UserAxisBundle,
  UserAxisBundleDict,
  UserAxisGroup,
  UserAxisGroupDict,
  UserAxisItemPosition,
  UserAxisItemPositionDict,
} from "@interfacesV02/data/user";

export type LocalStorageKey =
  | "HORIZONTAL_GROUP_DICT"
  | "HORIZONTAL_BUNDLE_DICT"
  | "HORIZONTAL_ITEM_DICT"
  | "VERTICAL_GROUP_DICT"
  | "VERTICAL_BUNDLE_DICT"
  | "VERTICAL_ITEM_DICT"
  | "PREFERENCE_GROUP_DICT"
  | "PREFERENCE_BUNDLE_DICT"
  | "PREFERENCE_ITEM_DICT";

export type EvaluationAxisType = "HORIZONTAL" | "VERTICAL" | "PREFERENCE";

const groupKeyMap: Record<EvaluationAxisType, LocalStorageKey> = {
  HORIZONTAL: "HORIZONTAL_GROUP_DICT",
  VERTICAL: "VERTICAL_GROUP_DICT",
  PREFERENCE: "PREFERENCE_GROUP_DICT",
};

const bundleKeyMap: Record<EvaluationAxisType, LocalStorageKey> = {
  HORIZONTAL: "HORIZONTAL_BUNDLE_DICT",
  VERTICAL: "VERTICAL_BUNDLE_DICT",
  PREFERENCE: "PREFERENCE_BUNDLE_DICT",
};

const itemKeyMap: Record<EvaluationAxisType, LocalStorageKey> = {
  HORIZONTAL: "HORIZONTAL_ITEM_DICT",
  VERTICAL: "VERTICAL_ITEM_DICT",
  PREFERENCE: "PREFERENCE_ITEM_DICT",
};

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * 로컬스토리지에서 dict를 안전하게 읽어오는 공용 함수
 * - 값이 없거나 파싱 실패면 fallback
 * - PrimaryKey가 number라면 key를 number로 정규화
 */
const getDictFromLocalStorage = <T extends Record<number, unknown>>(
  key: LocalStorageKey,
  fallback: T,
): T => {
  if (typeof window === "undefined") return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed)) return fallback;

    const normalized: Record<number, unknown> = {};

    for (const [k, v] of Object.entries(parsed)) {
      const id = Number(k);
      if (Number.isNaN(id)) continue;
      normalized[id] = v;
    }

    return normalized as T;
  } catch {
    return fallback;
  }
};

const setDictToLocalStorage = <T extends Record<number, unknown>>(
  key: LocalStorageKey,
  dict: T,
) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(dict));
};

/** ✅ Group */
export const getGroupDict = (
  type: EvaluationAxisType,
  groupSize: number,
): UserAxisGroupDict => {
  const key = groupKeyMap[type];
  const initalValue: UserAxisGroupDict = {};
  for (let i = 0; i < groupSize; i++) {
    initalValue[i] = {
      userAxisGroupID: i,
      bundleList: [],
      groupSummary: {
        type: "PREFERENCE",
        groupIcon: "",
        intensityLabel: "",
        groupLabel: "",
        groupDescription: "",
      },

      axisSide: "START",
      intensityLevel: 0,
    };
  }

  return getDictFromLocalStorage<UserAxisGroupDict>(key, initalValue);
};

export const setGroupDict = (
  type: EvaluationAxisType,
  dict: UserAxisGroupDict,
) => {
  const key = groupKeyMap[type];
  setDictToLocalStorage(key, dict);
};

/** ✅ Bundle */
export const getBundleDict = (type: EvaluationAxisType): UserAxisBundleDict => {
  const key = bundleKeyMap[type];
  return getDictFromLocalStorage<UserAxisBundleDict>(key, {});
};

export const setBundleDict = (
  type: EvaluationAxisType,
  dict: UserAxisBundleDict,
) => {
  const key = bundleKeyMap[type];
  setDictToLocalStorage(key, dict);
};

/** ✅ ItemPosition */
export const getItemPositionDict = (
  type: EvaluationAxisType,
): UserAxisItemPositionDict => {
  const key = itemKeyMap[type];
  return getDictFromLocalStorage<UserAxisItemPositionDict>(key, {});
};

export const setItemPositionDict = (
  type: EvaluationAxisType,
  dict: UserAxisItemPositionDict,
) => {
  const key = itemKeyMap[type];
  setDictToLocalStorage(key, dict);
};

/**
 * 1) 새 번들을 dict에 추가
 */
export const addBundleToDict = (
  type: EvaluationAxisType,
  bundleDict: UserAxisBundleDict,
  newBundle: UserAxisBundle,
) => {
  const bundleID = newBundle.userAxisBundleID;

  // 이미 있으면 그대로(원하면 throw로 바꿔도 됨)
  if (bundleDict[bundleID] !== undefined) {
    return { bundleDict };
  }

  const nextBundleDict: UserAxisBundleDict = {
    ...bundleDict,
    [bundleID]: newBundle,
  };

  setBundleDict(type, nextBundleDict);
};

/**
 * 1) 새 번들을 dict에 추가
 */
export const addItemPositionToDict = (
  type: EvaluationAxisType,
  itemPositionDict: UserAxisItemPositionDict,
  newItemPosition: UserAxisItemPosition,
) => {
  const itemID = newItemPosition.itemSummaryID;
  const nextItemPositionDcit: UserAxisItemPositionDict = {
    ...itemPositionDict,
    [itemID]: newItemPosition,
  };

  setItemPositionDict(type, nextItemPositionDcit);
};

/**
 * 2) 기존 번들의 내용을 수정 (patch만)
 */
export const updateBundleInDict = (
  type: EvaluationAxisType,
  bundleDict: UserAxisBundleDict,
  bundleID: number,
  patch: Partial<UserAxisBundle>,
) => {
  const prev = bundleDict[bundleID];
  if (!prev) return bundleDict;

  const next: UserAxisBundle = {
    ...prev,
    ...patch,
  };

  const nextBundleDict = {
    ...bundleDict,
    [bundleID]: next,
  };

  setBundleDict(type, nextBundleDict);
};

/**
 * 3) 기존 그룹의 내용을 수정 (patch만)
 */
export const updateGroupInDict = (
  type: EvaluationAxisType,
  groupDict: UserAxisGroupDict,
  groupID: number,
  patch: Partial<UserAxisGroup>,
) => {
  const prev = groupDict[groupID];
  if (!prev) return groupDict;

  const next: UserAxisGroup = {
    ...prev,
    ...patch,
  };

  const nextGroupDict = {
    ...groupDict,
    [groupID]: next,
  };

  setGroupDict(type, nextGroupDict);
};
