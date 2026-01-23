export const colors = {
  // mono

  monoWhite: "#FFFFFF",
  mono050: "#F9FAFB",
  mono100: "#F2F4F6",
  mono200: "#E6E8EB",
  mono300: "#C2C5C9",
  mono400: "#959A9F",
  mono500: "#767A81",
  mono600: "#4C5159",
  mono700: "#3C424A",
  mono800: "#2E343D",
  mono900: "#212730",
  monoBlack: "#191F28",
} as const;

export const fontColors = {
  titleStronger: colors.mono700,
  titleStrongest: colors.monoBlack,

  textLight: colors.mono700, // 일반
  textLighter: colors.mono500, // 보조
  textLightest: colors.mono400, // 안읽어도됨

  textStrongest: colors.mono800,

  textDisable: colors.mono300,
} as const;

export const strokeColors = {
  strokeLight: colors.mono300,
  strokeLighter: colors.mono200,
  strokeLightest: colors.mono100,
} as const;

export const foregroundColors = {
  foregroundLight: colors.mono100,
  foregroundLighter: colors.mono050,
  foregroundStrongest: colors.mono900,
} as const;

export const iconColors = {
  iconLight: colors.mono500,
  iconLighter: colors.mono300,
  iconStrongest: colors.mono900,
} as const;
