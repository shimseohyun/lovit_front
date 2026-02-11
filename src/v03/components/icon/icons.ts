import LeftIcon from "./assets/LeftIcon";

export type IconType = typeof icons;
export type IconKey = keyof IconType;

export const icons = {
  left: LeftIcon,
};

export const IconList = Object.keys(icons);
