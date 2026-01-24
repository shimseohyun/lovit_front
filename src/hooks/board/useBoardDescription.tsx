import type { SwipeDirection } from "./type";

export const verticalGroupLabel = [
  "완전 두부",
  "제법 두부",
  "약간 두부",
  "약간 버터",
  "제법 버터",
  "완전 버터",
];

export const horizontalGroupLabel = [
  "완전 고양이",
  "제법 고양이",
  "약간 고양이",
  "약간 강아지",
  "제법 강아지",
  "완전 강아지",
];

export const directionDictionary: Record<SwipeDirection, [string, string]> = {
  left: ["🐱 덜 고양이", "🐶 더 강아지"],
  up: ["🍚 덜 두부", "🥞 더 버터"],

  right: ["🐱 더 고양이", "🐶 덜 강아지"],
  down: ["🍚 더 두부", "🥞 덜 버터"],
};
