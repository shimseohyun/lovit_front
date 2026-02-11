import type {
  ItemIDList,
  UserAxisBundle,
  UserAxisBundleDict,
  UserAxisGroup,
  UserAxisGroupDict,
  UserAxisItemPosition,
  UserAxisItemPositionDict,
} from "@interfacesV02/data/user";
import type { BoardAxisType } from "@interfacesV02/type";

export type LocalStorageKey =
  | "CHECKED_ITEM_LIST"
  | "HORIZONTAL_GROUP_DICT"
  | "HORIZONTAL_BUNDLE_DICT"
  | "HORIZONTAL_ITEM_DICT"
  | "VERTICAL_GROUP_DICT"
  | "VERTICAL_BUNDLE_DICT"
  | "VERTICAL_ITEM_DICT"
  | "PREFERENCE_GROUP_DICT"
  | "PREFERENCE_BUNDLE_DICT"
  | "PREFERENCE_ITEM_DICT";

const groupKeyMap: Record<BoardAxisType, LocalStorageKey> = {
  HORIZONTAL: "HORIZONTAL_GROUP_DICT",
  VERTICAL: "VERTICAL_GROUP_DICT",
  PREFERENCE: "PREFERENCE_GROUP_DICT",
};

const bundleKeyMap: Record<BoardAxisType, LocalStorageKey> = {
  HORIZONTAL: "HORIZONTAL_BUNDLE_DICT",
  VERTICAL: "VERTICAL_BUNDLE_DICT",
  PREFERENCE: "PREFERENCE_BUNDLE_DICT",
};

const itemKeyMap: Record<BoardAxisType, LocalStorageKey> = {
  HORIZONTAL: "HORIZONTAL_ITEM_DICT",
  VERTICAL: "VERTICAL_ITEM_DICT",
  PREFERENCE: "PREFERENCE_ITEM_DICT",
};

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const getValueFromLocalStorage = <T>(key: LocalStorageKey, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

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

const setValueToLocalStorage = <T>(key: LocalStorageKey, value: T) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const setDictToLocalStorage = <T extends Record<number, unknown>>(
  key: LocalStorageKey,
  dict: T,
) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(dict));
};

/** ItemList */
export const getCheckedItemIDList = (): ItemIDList => {
  return getValueFromLocalStorage<ItemIDList>("CHECKED_ITEM_LIST", []);
};

export const setCheckedItemList = (list: ItemIDList) => {
  setValueToLocalStorage("CHECKED_ITEM_LIST", list);
};

export const getGroupInitialValue = (groupSize: number) => {
  const initalValue: UserAxisGroupDict = {};
  for (let i = 0; i < groupSize; i++) {
    initalValue[i] = {
      userAxisGroupID: i,
      bundleList: [],
    };
  }
  return initalValue;
};
/**  Group */
export const getGroupDict = (
  type: BoardAxisType,
  groupSize: number,
): UserAxisGroupDict => {
  const key = groupKeyMap[type];

  return getDictFromLocalStorage<UserAxisGroupDict>(
    key,
    getGroupInitialValue(groupSize),
  );
};

export const setGroupDict = (type: BoardAxisType, dict: UserAxisGroupDict) => {
  const key = groupKeyMap[type];
  setDictToLocalStorage(key, dict);
};

/**  Bundle */
export const getBundleDict = (type: BoardAxisType): UserAxisBundleDict => {
  const key = bundleKeyMap[type];
  return getDictFromLocalStorage<UserAxisBundleDict>(key, {});
};

export const setBundleDict = (
  type: BoardAxisType,
  dict: UserAxisBundleDict,
) => {
  const key = bundleKeyMap[type];
  setDictToLocalStorage(key, dict);
};

/**  ItemPosition */
export const getItemPositionDict = (
  type: BoardAxisType,
): UserAxisItemPositionDict => {
  const key = itemKeyMap[type];
  return getDictFromLocalStorage<UserAxisItemPositionDict>(key, {});
};

export const setItemPositionDict = (
  type: BoardAxisType,
  dict: UserAxisItemPositionDict,
) => {
  const key = itemKeyMap[type];
  setDictToLocalStorage(key, dict);
};

/** 새 번들을 dict에 추가*/
export const addBundleToDict = (
  type: BoardAxisType,
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

/** 새 아이템을 체크 목록에 추가 */
export const addItemToCheckedItemList = (newItem: number) => {
  const checkedItemList = getCheckedItemIDList();
  const nextCheckedItemList = [...checkedItemList, newItem];

  setCheckedItemList(nextCheckedItemList);
};

/** 새 아이템을 포지션에 추가 */
export const addItemPositionToDict = (
  type: BoardAxisType,
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

/** 2) 기존 번들의 내용을 수정 (patch만) */
export const updateBundleInDict = (
  type: BoardAxisType,
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

/** 3) 기존 그룹의 내용을 수정 (patch만) */
export const updateGroupInDict = (
  type: BoardAxisType,
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
