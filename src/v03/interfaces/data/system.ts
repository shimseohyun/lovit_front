import type {
  BoardAxisType,
  DirectionType,
  ResultType,
} from "@interfacesV03/type";
import type { PrimaryKey } from ".";

type AxisSideSummary = {
  icon: string;
  label: string;
  groupColor: string;
  labelColor: string;
};

export type Axis = {
  axisID: number;

  axisSide: Record<DirectionType, AxisSideSummary>;
  stepCount: number;

  groupSummary: AxisGroupSummary[];
};

export type AxisGroupSummary = {
  axisSide: DirectionType;

  groupIcon: string;
  intensityLabel: string;
  groupLabel: string;

  labelColorLight: string;
  labelColorLightest: string;
  groupDescription: string;
  iconIntensity?: number;
};

export type BoardInformation = {
  boardID: number;
  axisDict: Record<BoardAxisType, Axis>;

  resultDict: BoardResultDict;
  avgResultDict: BoardResultDict;
};
export type ResultData = {
  label: string;
  img: string;
};
export type BoardResultDict = Record<
  ResultType,
  Record<ResultType, ResultData[]>
>;

export interface EvaluationBoardID {
  evaluationBoardID: PrimaryKey;
}

export type ItemSummary = {
  itemSummaryID: number;
  name: string;
  thumbnailURL: string;

  category: string;
};

export type ItemSummaryDict = Record<number, ItemSummary>;
