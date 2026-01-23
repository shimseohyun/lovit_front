import {
  foregroundColors,
  strokeColors,
  fontColors,
  iconColors,
} from "./colors";

export type FontColorType = typeof fontColors;
export type FontColorKey = keyof FontColorType;
export const FontColorList = Object.keys(fontColors);

export type BackgroundColorType = typeof foregroundColors;
export type BackgroundColorKey = keyof BackgroundColorType;
export const BackgroundColorList = Object.keys(foregroundColors);

export type BorderColorType = typeof strokeColors;
export type BorderColorKey = keyof BorderColorType;
export const BorderColorList = Object.keys(strokeColors);

export type IconColorType = typeof iconColors;
export type IconColorKey = keyof IconColorType;
export const IconsColorList = Object.keys(iconColors);

export type CustomTheme = {
  maxWidth: string;
  fontColors: FontColorType;
  strokeColors: BorderColorType;
  foregroundColors: BackgroundColorType;
};

export const theme = (maxWidth: string): CustomTheme => {
  return {
    maxWidth: maxWidth,
    fontColors: fontColors,
    strokeColors: strokeColors,
    foregroundColors: foregroundColors,
  };
};
