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
      iconIntensity: 100,
    },
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "제법",
      groupLabel: "두부",
      groupDescription: "",
      iconIntensity: 50,
    },
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "약간",
      groupLabel: "두부",
      groupDescription: "",
      iconIntensity: 20,
    },

    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "약간",
      groupLabel: "버터",
      groupDescription: "",
      iconIntensity: 20,
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "제법",
      groupLabel: "버터",
      groupDescription: "",
      iconIntensity: 50,
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "완전",
      groupLabel: "버터",
      groupDescription: "",
      iconIntensity: 100,
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
      iconIntensity: 100,
    },
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "제법",
      groupLabel: "고양이",
      groupDescription: "",
      iconIntensity: 50,
    },
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "약간",
      groupLabel: "고양이",
      groupDescription: "",
      iconIntensity: 20,
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "약간",
      groupLabel: "강아지",
      groupDescription: "",
      iconIntensity: 20,
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "제법",
      groupLabel: "강아지",
      groupDescription: "",
      iconIntensity: 50,
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "완전",
      groupLabel: "강아지",
      groupDescription: "",
      iconIntensity: 100,
    },
  ],
};

const FACE_AXIS: Axis = {
  axisID: 0,
  stepCount: 11,
  groupSummary: [
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "0",
      groupLabel: "마음에 들어요",
      groupDescription: "취향이 아니에요",
      iconIntensity: 10,
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "0.5",
      groupLabel: "마음에 들어요",
      groupDescription: "취향과 완전 멀어요",
      iconIntensity: 19,
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "1",
      groupLabel: "마음에 들어요",
      groupDescription: "취향과 제법 멀어요",
      iconIntensity: 28,
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "1.5",
      groupLabel: "마음에 들어요",
      groupDescription: "취향과 약간 멀어요",
      iconIntensity: 37,
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "2",
      groupLabel: "마음에 들어요",
      groupDescription: "약간 취향에서 벗어났어요",
      iconIntensity: 46,
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "2.5",
      groupLabel: "마음에 들어요",
      groupDescription: "보통이에요",
      iconIntensity: 55,
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "3",
      groupLabel: "마음에 들어요",
      groupDescription: "약간 취향이에요",
      iconIntensity: 64,
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "3.5",
      groupLabel: "마음에 들어요",
      groupDescription: "제법 취향이에요",
      iconIntensity: 73,
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "4",
      groupLabel: "마음에 들어요",
      groupDescription: "완전 취향이에요",
      iconIntensity: 82,
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "4.5",
      groupLabel: "마음에 들어요",
      groupDescription: "거의 완전 취향이에요",
      iconIntensity: 91,
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "5",
      groupLabel: "마음에 들어요",
      groupDescription: "완전 마음을 울려요!",
      iconIntensity: 100,
    },
  ],
};

export const FACE_BOARD_INFO: BoardInformation = {
  boardID: 0,

  axisDict: {
    HORIZONTAL: CAT_DOG_AXIS,
    VERTICAL: DOBOO_BUTTER_AXIS,
    PREFERENCE: FACE_AXIS,
  },

  // Vertical - Horizontal 순서
  resultDict: {
    START: {
      START: [
        {
          img: "/assets/result/face2/START_START.png",
          label: "두부 고양이 콜렉터",
        },
      ],
      MIDDLE: [
        { img: "/assets/result/face2/START_MIDDLE.png", label: "두부 콜렉터" },
      ],
      END: [
        {
          img: "/assets/result/face2/START_END.png",
          label: "두부 강아지 콜렉터",
        },
      ],
    },
    MIDDLE: {
      START: [
        {
          img: "/assets/result/face2/MIDDLE_START.png",
          label: "고양이 콜렉터",
        },
      ],
      MIDDLE: [
        {
          img: "/assets/result/face2/MIDDLE_MIDDLE_1.png",
          label: "균형 잡힌 미녀가 좋아!",
        },
        {
          img: "/assets/result/face2/MIDDLE_MIDDLE_0.png",
          label: "미녀면 다 좋아!",
        },
      ],
      END: [
        {
          img: "/assets/result/face2/MIDDLE_END.png",
          label: "강아지 콜렉터",
        },
      ],
    },
    END: {
      START: [
        {
          img: "/assets/result/face2/END_START.png",
          label: "버터 고양이 콜렉터",
        },
      ],
      MIDDLE: [
        { img: "/assets/result/face2/END_MIDDLE.png", label: "버터 콜렉터" },
      ],
      END: [
        {
          img: "/assets/result/face2/END_ENDpng",
          label: "강아지 콜렉터",
        },
      ],
    },
  },
};
