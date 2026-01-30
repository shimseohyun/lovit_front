/**
 * =========================================
 * Global / System domain
 * =========================================
 */

import type { PrimaryKey } from ".";

/** PK mixins (ID들은 이 인터페이스를 확장해서 정합성 유지) */
export interface ItemSummaryID {
  itemSummaryID: PrimaryKey;
}

export interface PreferenceScoreAxisID {
  preferenceScoreAxisID: PrimaryKey;
}

export interface PreferenceScoreGroupID {
  /** `PreferenceScoreAxisGroup`의 PK */
  preferenceScoreGroupID: PrimaryKey;
}

export interface EvaluationAxisID {
  evaluationAxisID: PrimaryKey;
}

export interface EvaluationAxisGroupID {
  evaluationAxisGroupID: PrimaryKey;
}

export interface EvaluationBoardID {
  evaluationBoardID: PrimaryKey;
}

/**
 * itemSummary (여러 개)
 * 영화/아이돌/얼굴 등 “평가 대상”의 공통 요약 정보
 */
export interface ItemSummary extends ItemSummaryID {
  name: string;
  thumbnailURL: string;

  /**
   * 범주(예: 영화=감독/장르, 아이돌=그룹 등)
   * 현재는 단일 문자열로 둠
   */
  category: string;
}

export interface ItemSummaryDict {
  [itemSummaryID: number]: ItemSummary;
}

/** 취향 점수 축 (예: 1개 수평 축) */
export interface PreferenceScoreAxis extends PreferenceScoreAxisID {
  axisName: string;
}

/** 취향 점수 축 그룹(예: 취향 아님/평균/취향 등) */
export interface PreferenceScoreAxisGroup
  extends PreferenceScoreGroupID, PreferenceScoreAxisID {
  /** 축에서의 단계 (0..n-1 or 1..n 중 택1) */
  level: number;

  /** 그룹 라벨 */
  label: string;
}

/** START(왼쪽/위) vs END(오른쪽/아래) */
export type AxisSide = "START" | "END";

/** 사분면을 이루는 평가 축 (수평, 수직 각각 1개) */
export interface EvaluationAxis extends EvaluationAxisID {
  axisName: string;
  axisDescription: string;

  /** 축의 시작(왼쪽 또는 위쪽) 라벨 */
  startLabel: string;

  /** 축의 끝(오른쪽 또는 아래쪽) 라벨 */
  endLabel: string;

  /**
   * 한쪽 방향(START 또는 END)에 존재하는 그룹 수
   * 예: 3이면 START 3단계 + END 3단계 + (중립) 구성 가능
   */
  groupCountPerSide: number;

  /** 강도 라벨(약→강 순서), 예: ["약간","제법","완전"] */
  intensityLabels: string[];

  /** 중립 라벨, 예: "중립", "반반", "믹스" */
  neutralLabel: string;
}

/** EvaluationAxis 상의 그룹(예: START-2단계, END-1단계 등) */
export interface EvaluationAxisGroup
  extends EvaluationAxisGroupID, EvaluationAxisID {
  /** 몇 번째 강도 단계인지 (1..groupCountPerSide) */
  intensityLevel: number;

  side: AxisSide;
}

/**
 * EvaluationBoard
 * - 수직/수평 EvaluationAxis + (선택적으로) PreferenceScoreAxis를 엮는 보드
 */
export interface EvaluationBoard extends EvaluationBoardID {
  /** FK -> EvaluationAxis */
  verticalAxisID: PrimaryKey;

  /** FK -> EvaluationAxis */
  horizontalAxisID: PrimaryKey;

  /** FK -> PreferenceScoreAxis */
  preferenceScoreAxisID: PrimaryKey;
}

// export type PrimaryKey = number;

// export type ItemSummary = {
//   itemSummaryID: PrimaryKey;

//   name: string;
//   thumbnailURL: string;

//   category: string;
// };

// export type ItemSummaryDIC = Record<number, ItemSummary>;

// // 취향 축 (수평 1개)
// export type PreferenceScoreAxis = {
//   preferenceScoreAxisID: PrimaryKey;

//   axisName: string;
// };

// // 사분면을 이루는 평가 축 (수평, 수직 각각 1개)
// export type EvaluationAxis = {
//   evaluationAxisID: PrimaryKey;

//   axisName: string;
//   axisDescription: string;

//   /** 축의 시작(왼쪽 또는 위쪽) 라벨 */
//   startLabel: string;

//   /** 축의 끝(오른쪽 또는 아래쪽) 라벨 */
//   endLabel: string;

//   /**
//    * 한쪽 방향에 존재하는 그룹 수
//    * 예: 3이면 start 방향 3단계 + end 방향 3단계 구성 가능
//    */
//   groupCountPerSize: number;

//   /** 강도 라벨(약→강 순서), 예: ["약간","제법","완전"] */
//   intensityLabels: string[];

//   /** 중립 라벨, 예: "중립", "반반", "믹스" */
//   neutralLabel: string;
// };

// export type AxisSide = "START" | "END";

// export type EvaluationAxisGroup = {
//   evaluationGroupID: PrimaryKey;

//   /** 어떤 평가축에 속한 그룹인지 */
//   evaluationAxisID: PrimaryKey;
//   /** 평가축에서 몇전째의 그룹인지 */
//   intensityLevel: number;

//   side: AxisSide;
// };

// export type EvaluationBoard = {
//   evaluationBoard: PrimaryKey;

//   verticalAxisID: PrimaryKey;
//   horizontalAxisID: PrimaryKey;

//   preferenceScoreAxisID: PrimaryKey;
// };

// export type PreferenceScoreAxisGroup = {
//   preferenceScoreGroupID: PrimaryKey;
//   preferenceScoreAxisID: number;

//   axisName: string;
// };
