import type { SwipeDirection } from "./type";

// 찾기 위해서는 groupIndex +5해야함
export const rowGroupLabel = [
  "완전 상업",
  "제법 상업",
  ["약간 상업", "약간 예술"],
  "제법 예술",
  "완전 예술",
];
export const colGroupLabel = [
  "완전 팝콘",
  "제법 팝콘",
  ["약간 팝콘", "약간 팝콘"],
  "제법 여운",
  "완전 여운",
];

const L_VALUE = 0;
const R_VALUE = 1;
const directionDictionary: Record<SwipeDirection, [string, string]> = {
  left: ["덜 팝콘", "더 여운"],
  up: ["덜 상업", "더 예술"],
  right: ["더 팝콘", "덜 여운"],
  down: ["더 상업", "덜 예술"], // <- down 문구는 의도 맞는지 한번 체크!
};

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

  return `${value} 보다 ${directionDictionary[direction][v] ?? ""}`;
};
