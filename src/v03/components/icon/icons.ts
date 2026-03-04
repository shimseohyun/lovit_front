import DropDownIcon from "./assets/DropDownIcon";
import LeftIcon from "./assets/LeftIcon";

export type IconType = typeof icons;
export type IconKey = keyof IconType;

export const icons = {
  left: LeftIcon,
  dropDown: DropDownIcon,
};

export const IconList = Object.keys(icons);
