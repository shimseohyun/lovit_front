import type { AxisType, DirectionType } from "@interfacesV02/type";
import type { PrimaryKey } from ".";

export type EvaluationPart = {
  label: string;
  icon?: string;
};

export type EvaluationAxis = {
  evaluationAxisID: number;
  partDict: Record<DirectionType, EvaluationPart>;
  setpPerSide: number;
  intensityLabelList: string[];
};

export type PreferenceAxis = {
  preferenceAxisID: number;
  stepCount: number;
  intensityLabelList: string[];
  label: string;
  icon?: string;
};

export type BoardInformation = {
  boardID: number;
  evaluationAxisDict: Record<AxisType, EvaluationAxis>;
  preferenceAxis: PreferenceAxis;

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
