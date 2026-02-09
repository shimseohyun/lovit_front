import { css } from "@emotion/react";

export type FontStyle = typeof fonts;
export type FontStyleKey = keyof FontStyle;

type FontGroup = "head" | "body" | "bodyB" | "element";

const weightByGroup: Record<FontGroup, number> = {
  head: 600,
  element: 600,
  body: 400,
  bodyB: 500,
};

// ✅ 전역 변수로 관리 (원하면 여기만 바꾸면 됨)
export const letterSpacingPercent = {
  default: -1,
  element: 1,
} as const;

const letterSpacingPx = (sizePx: number, percent: number) =>
  `${(sizePx * (percent / 100)).toFixed(2)}px`;

const fontGenerator = (
  sizePx: number,
  lineHeightPx: number,
  group: FontGroup,
  letterSpacing: number,
) => {
  const fontFamily = "Pretendard";

  return css`
    font-family: ${fontFamily};
    font-size: ${sizePx}px;
    font-weight: ${weightByGroup[group]};
    line-height: ${lineHeightPx}px;
    letter-spacing: ${letterSpacingPx(sizePx, letterSpacing)};
  `;
};

export const fonts = {
  // head
  narrative: fontGenerator(19, 24, "head", -1),
  head1: fontGenerator(28, 36, "head", -1),
  head2: fontGenerator(22, 32, "head", -1),
  head3: fontGenerator(19, 28, "head", -1),

  // body
  body1: fontGenerator(17, 24, "body", -1),
  body1B: fontGenerator(17, 24, "bodyB", -1),
  body2: fontGenerator(15, 20, "body", -1),
  body2B: fontGenerator(15, 20, "bodyB", -1),
  body3: fontGenerator(13, 16, "body", -1),
  body3B: fontGenerator(13, 16, "bodyB", -1),
  body4: fontGenerator(7, 9, "body", -1),
  body4B: fontGenerator(7, 9, "bodyB", -1),

  // element (기본값이 +1%로 자동 적용)
  element1: fontGenerator(17, 24, "element", 1),
  element2: fontGenerator(15, 20, "element", 1),
  element3: fontGenerator(13, 15, "element", 1),
} as const;
