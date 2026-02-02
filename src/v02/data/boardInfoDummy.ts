import type {
  BoardInformation,
  EvaluationAxis,
  PreferenceAxis,
} from "@interfacesV02/data/system";

const DOBOO_BUTTER_AXIS: EvaluationAxis = {
  evaluationAxisID: 0,

  partDict: {
    START: {
      label: "두부",
      icon: "🍚",
    },
    END: {
      label: "버터",
      icon: "🥞",
    },
  },
  setpPerSide: 3,
  intensityLabelList: ["약간", "제법", "완전"],
};

const CAT_DOG_AXIS: EvaluationAxis = {
  evaluationAxisID: 0,

  partDict: {
    START: {
      label: "고양이",
      icon: "🐱",
    },
    END: {
      label: "강아지",
      icon: "🐶",
    },
  },
  setpPerSide: 3,
  intensityLabelList: ["약간", "제법", "완전"],
};

const FACE_AXIS: PreferenceAxis = {
  preferenceAxisID: 0,
  stepCount: 11,
  label: "마음이 가요",
  icon: "🩷",
  intensityLabelList: [
    "취향과 완전 멀어요",
    "취향과 제법 멀어요",
    "취향과 약간 멀어요",
    "약간 취향에서 벗어났어요",
    "살짝 애매해요",
    "보통이에요",
    "약간 취향이에요",
    "제법 취향이에요",
    "완전 취향이에요",
    "거의 완전 취향이에요",
    "완전 마음을 울려요!",
  ],
};

export const FACE_BOARD_INFO: BoardInformation = {
  boardID: 0,
  evaluationAxisDict: {
    VERTICAL: DOBOO_BUTTER_AXIS,
    HORIZONTAL: CAT_DOG_AXIS,
  },
  preferenceAxis: FACE_AXIS,
  neutralLabel: ["미녀면 다 좋아", "균형잡힌 미녀가 좋아"],
};
