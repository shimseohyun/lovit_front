import type { BoardAxisType } from "@interfacesV02/type";
import {
  getBundleDict,
  getGroupDict,
  getItemPositionDict,
} from "./localStorage";

export const useGetAxisData = (type: BoardAxisType, gorupSize: number) => {
  return {
    group: getGroupDict(type, gorupSize),
    bundle: getBundleDict(type),
    itemPosition: getItemPositionDict(type),
  };
};
