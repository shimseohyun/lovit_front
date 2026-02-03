import type { BoardAxisType, DirectionType } from "@interfacesV02/type";
import type { PrimaryKey } from ".";

export type Axis = {
  axisID: number;

  stepCount: number;

  groupSummary: AxisGroupSummary[];
};

export type AxisGroupSummary = {
  axisSide: DirectionType;

  groupIcon: string;
  intensityLabel: string;
  groupLabel: string;
  groupDescription: string;
};

export type BoardInformation = {
  boardID: number;
  axisDict: Record<BoardAxisType, Axis>;

  neutralLabel: string[];
};

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
