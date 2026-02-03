import type { Axis, BoardInformation } from "@interfacesV02/data/system";

const DOBOO_BUTTER_AXIS: Axis = {
  axisID: 0,
  stepCount: 6,
  groupSummary: [
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "완전",
      groupLabel: "두부",
      groupDescription: "",
    },
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "제법",
      groupLabel: "두부",
      groupDescription: "",
    },
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "약간",
      groupLabel: "두부",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "약간",
      groupLabel: "버터",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "제법",
      groupLabel: "버터",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "완전",
      groupLabel: "버터",
      groupDescription: "",
    },
  ],
};

const CAT_DOG_AXIS: Axis = {
  axisID: 0,
  stepCount: 6,
  groupSummary: [
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "완전",
      groupLabel: "고양이",
      groupDescription: "",
    },
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "제법",
      groupLabel: "고양이",
      groupDescription: "",
    },
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "약간",
      groupLabel: "고양이",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "약간",
      groupLabel: "강아지",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "제법",
      groupLabel: "강아지",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "완전",
      groupLabel: "강아지",
      groupDescription: "",
    },
  ],
};

const FACE_AXIS: Axis = {
  axisID: 0,
  stepCount: 11,
  groupSummary: [
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "0",
      groupLabel: "",
      groupDescription: "",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "0.5",
      groupLabel: "마음에 들어요",
      groupDescription: "취향과 완전 멀어요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "1",
      groupLabel: "마음에 들어요",
      groupDescription: "취향과 제법 멀어요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "1.5",
      groupLabel: "마음에 들어요",
      groupDescription: "취향과 약간 멀어요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "2",
      groupLabel: "마음에 들어요",
      groupDescription: "약간 취향에서 벗어났어요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "2.5",
      groupLabel: "마음에 들어요",
      groupDescription: "보통이에요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "3",
      groupLabel: "마음에 들어요",
      groupDescription: "약간 취향이에요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "3.5",
      groupLabel: "마음에 들어요",
      groupDescription: "제법 취향이에요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "4",
      groupLabel: "마음에 들어요",
      groupDescription: "완전 취향이에요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "4.5",
      groupLabel: "마음에 들어요",
      groupDescription: "거의 완전 취향이에요",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "5",
      groupLabel: "마음에 들어요",
      groupDescription: "완전 마음을 울려요!",
    },
  ],
};

export const FACE_BOARD_INFO: BoardInformation = {
  boardID: 0,

  neutralLabel: ["미녀면 다 좋아", "균형잡힌 미녀가 좋아"],
  axisDict: {
    HORIZONTAL: CAT_DOG_AXIS,
    VERTICAL: DOBOO_BUTTER_AXIS,
    PREFERENCE: FACE_AXIS,
  },
};
