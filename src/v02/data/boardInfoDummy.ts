import type { Axis, BoardInformation } from "@interfacesV02/data/system";

const DOBOO_BUTTER_AXIS: Axis = {
  axisID: 0,
  stepCount: 6,
  axisSide: {
    START: {
      icon: "🍚",
      label: "두부",
      labelColor: "#AEAEAE",
      groupColor: "#F9F8F8",
    },
    END: {
      icon: "🥞",
      label: "버터",
      labelColor: "#FFA500",
      groupColor: "#FFF8E1",
    },
  },
  groupSummary: [
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "완전",
      groupLabel: "두부",
      groupDescription: "",

      labelColorLight: "#AEAEAE",
      labelColorLightest: "#F9F8F8",
    },
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "제법",
      groupLabel: "두부",
      groupDescription: "",

      labelColorLight: "#AEAEAE",
      labelColorLightest: "#F9F8F8",
    },
    {
      axisSide: "START",
      groupIcon: "🍚",
      intensityLabel: "약간",
      groupLabel: "두부",
      groupDescription: "",

      labelColorLight: "#AEAEAE",
      labelColorLightest: "#F9F8F8",
    },

    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "약간",
      groupLabel: "버터",
      groupDescription: "",

      labelColorLight: "#FFA500",
      labelColorLightest: "#FFF8E1",
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "제법",
      groupLabel: "버터",
      groupDescription: "",

      labelColorLight: "#FFA500",
      labelColorLightest: "#FFF8E1",
    },
    {
      axisSide: "END",
      groupIcon: "🥞",
      intensityLabel: "완전",
      groupLabel: "버터",
      groupDescription: "",

      labelColorLight: "#FFA500",
      labelColorLightest: "#FFF8E1",
    },
  ],
};

const CAT_DOG_AXIS: Axis = {
  axisID: 0,
  stepCount: 6,
  axisSide: {
    START: {
      icon: "🐱",
      label: "고양이",
      groupColor: "#F3F7FF",
      labelColor: "#8899FF",
    },
    END: {
      icon: "🐶",
      label: "강아지",
      groupColor: "#FFF4EE",
      labelColor: "#F38159",
    },
  },

  groupSummary: [
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "완전",
      groupLabel: "고양이",
      groupDescription: "",

      labelColorLight: "#8899FF",
      labelColorLightest: "#F3F7FF",
    },
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "제법",
      groupLabel: "고양이",
      groupDescription: "",

      labelColorLight: "#8899FF",
      labelColorLightest: "#F3F7FF",
    },
    {
      axisSide: "START",
      groupIcon: "🐱",
      intensityLabel: "약간",
      groupLabel: "고양이",
      groupDescription: "",

      labelColorLight: "#8899FF",
      labelColorLightest: "#F3F7FF",
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "약간",
      groupLabel: "강아지",
      groupDescription: "",

      labelColorLight: "#F38159",
      labelColorLightest: "#FFF4EE",
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "제법",
      groupLabel: "강아지",
      groupDescription: "",

      labelColorLight: "#F38159",
      labelColorLightest: "#FFF4EE",
    },
    {
      axisSide: "END",
      groupIcon: "🐶",
      intensityLabel: "완전",
      groupLabel: "강아지",
      groupDescription: "",

      labelColorLight: "#F38159",
      labelColorLightest: "#FFF4EE",
    },
  ],
};

const FACE_AXIS: Axis = {
  axisID: 0,
  stepCount: 11,
  axisSide: {
    START: {
      icon: "🩶",
      label: "취향",
      labelColor: "#9d9d9d",
      groupColor: "#f0f0f0",
    },
    END: {
      icon: "💖",
      label: "취향",
      labelColor: "#F42572",
      groupColor: "#FEF4F8",
    },
  },
  groupSummary: [
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "0",
      groupLabel: "취향",
      groupDescription: "취향이 아니에요",
      iconIntensity: 10,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "0.5",
      groupLabel: "취향",
      groupDescription: "취향과 완전 멀어요",
      iconIntensity: 19,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "1",
      groupLabel: "취향",
      groupDescription: "취향과 제법 멀어요",
      iconIntensity: 28,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "1.5",
      groupLabel: "취향",
      groupDescription: "취향과 약간 멀어요",
      iconIntensity: 37,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "2",
      groupLabel: "취향",
      groupDescription: "약간 취향에서 벗어났어요",
      iconIntensity: 46,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "2.5",
      groupLabel: "취향",
      groupDescription: "보통이에요",
      iconIntensity: 55,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "3",
      groupLabel: "취향",
      groupDescription: "약간 취향이에요",
      iconIntensity: 64,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "3.5",
      groupLabel: "취향",
      groupDescription: "제법 취향이에요",
      iconIntensity: 73,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "4",
      groupLabel: "취향",
      groupDescription: "완전 취향이에요",
      iconIntensity: 82,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "🩷",
      intensityLabel: "4.5",
      groupLabel: "취향",
      groupDescription: "거의 완전 취향이에요",
      iconIntensity: 91,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
    },
    {
      axisSide: "END",
      groupIcon: "💖",
      intensityLabel: "5",
      groupLabel: "취향",
      groupDescription: "완전 마음을 울려요!",
      iconIntensity: 100,
      labelColorLight: "#F42572",
      labelColorLightest: "#FEF4F8",
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
          img: "/assets/result/idol/START_START.png",
          label: "두부 고양이 콜렉터",
        },
      ],
      MIDDLE: [
        { img: "/assets/result/idol/START_MIDDLE.png", label: "두부 콜렉터" },
      ],
      END: [
        {
          img: "/assets/result/idol/START_END.png",
          label: "두부 강아지 콜렉터",
        },
      ],
    },
    MIDDLE: {
      START: [
        {
          img: "/assets/result/idol/MIDDLE_START.png",
          label: "고양이 콜렉터",
        },
      ],
      MIDDLE: [
        {
          img: "/assets/result/idol/MIDDLE_MIDDLE_1.png",
          label: "균형 잡힌 미남가 좋아!",
        },
        {
          img: "/assets/result/idol/MIDDLE_MIDDLE_0.png",
          label: "미남이면 다 좋아!",
        },
      ],
      END: [
        {
          img: "/assets/result/idol/MIDDLE_END.png",
          label: "강아지 콜렉터",
        },
      ],
    },
    END: {
      START: [
        {
          img: "/assets/result/idol/END_START.png",
          label: "버터 고양이 콜렉터",
        },
      ],
      MIDDLE: [
        { img: "/assets/result/idol/END_MIDDLE.png", label: "버터 콜렉터" },
      ],
      END: [
        {
          img: "/assets/result/idol/END_END.png",
          label: "버터 강아지 콜렉터",
        },
      ],
    },
  },

  avgResultDict: {
    START: {
      START: [
        {
          img: "",
          label: "두부 고양이",
        },
      ],
      MIDDLE: [{ img: "", label: "두부" }],
      END: [
        {
          img: "",
          label: "두부 강아지",
        },
      ],
    },
    MIDDLE: {
      START: [
        {
          img: "",
          label: "고양이",
        },
      ],
      MIDDLE: [
        {
          img: "",
          label: "균형 잡힌 미남",
        },
      ],
      END: [
        {
          img: "",
          label: "강아지",
        },
      ],
    },
    END: {
      START: [
        {
          img: "",
          label: "버터 고양이",
        },
      ],
      MIDDLE: [{ img: "", label: "버터" }],
      END: [
        {
          img: "",
          label: "버터 강아지",
        },
      ],
    },
  },
};
