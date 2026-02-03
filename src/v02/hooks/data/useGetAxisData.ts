import {
  getBundleDict,
  getGroupDict,
  getItemPositionDict,
  type EvaluationAxisType,
} from "./localStorage";

export const useGetAxisData = (type: EvaluationAxisType, gorupSize: number) => {
  return {
    group: getGroupDict(type, gorupSize),
    bundle: getBundleDict(type),
    itemPosition: getItemPositionDict(type),
  };
};
