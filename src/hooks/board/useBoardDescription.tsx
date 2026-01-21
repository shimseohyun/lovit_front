import { dummyData } from "../../dummy/data";
import type { SwipeDirection } from "./type";

// // 찾기 위해서는 groupIndex +5해야함
// export const rowGroupLabel = [
//   "완전 상업",
//   "제법 상업",
//   ["약간 상업", "약간 예술"],
//   "제법 예술",
//   "완전 예술",
// ];
// export const colGroupLabel = [
//   "완전 팝콘",
//   "제법 팝콘",
//   ["약간 팝콘", "약간 팝콘"],
//   "제법 여운",
//   "완전 여운",
// ];
// const directionDictionary: Record<SwipeDirection, [string, string]> = {
//   left: ["덜 팝콘", "더 여운"],
//   up: ["덜 상업", "더 예술"],
//   right: ["더 팝콘", "덜 여운"],
//   down: ["더 상업", "덜 예술"],
// };

export const rowGroupLabel = [
  "완전 두부",
  "제법 두부",
  ["약간 두부", "약간 버터"],
  "제법 버터",
  "완전 버터",
];
export const colGroupLabel = [
  "완전 고양이",
  "제법 고양이",
  ["약간 고양이", "약간 강아지"],
  "제법 강아지",
  "완전 강아지",
];

export const rowGroupLabel2 = [
  "완전 두부",
  "제법 두부",
  "약간 두부",
  "약간 버터",
  "제법 버터",
  "완전 버터",
];
export const colGroupLabel2 = [
  "완전 고양이",
  "제법 고양이",
  "약간 고양이",
  "약간 강아지",
  "제법 강아지",
  "완전 강아지",
];
const directionDictionary: Record<SwipeDirection, [string, string]> = {
  left: ["덜 고양이", "더 강아지"],
  up: ["덜 두부", "더 버터"],
  right: ["더 고양이", "덜 강아지"],
  down: ["더 두부", "덜 버터"],
};

const L_VALUE = 0;
const R_VALUE = 1;

export const getTitle = (
  value: number,
  groupId: number,
  direction: SwipeDirection | null | undefined,
) => {
  if (!direction) return ""; // ✅ 락 전에는 빈 문자열/플레이스홀더

  if (groupId < 0) {
    const labels =
      direction === "left" || direction === "right"
        ? colGroupLabel
        : rowGroupLabel;

    // groupId는 음수 인덱스를 사용 (예: -5 ~ -1)
    const idx = groupId + labels.length;

    const dir = direction === "up" || direction === "left" ? 0 : 1;

    if (groupId == -3) {
      return labels[idx][dir];
    }
    if (idx < 0 || idx >= labels.length) return "";
    return labels[idx] ?? "";
  }

  const v = groupId < 3 ? L_VALUE : R_VALUE;

  const valueName = dummyData[value].name;

  return `${valueName}보다 ${directionDictionary[direction][v] ?? ""}`;
};
