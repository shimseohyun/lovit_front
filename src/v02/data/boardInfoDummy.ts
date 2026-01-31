import type {
  BoardInformation,
  EvaluationAxis,
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
  intensityLabelList: ["약간", "제법", "완전"],
};

export const FACE_BOARD_INFO: BoardInformation = {
  boardID: 0,
  axisDict: {
    VERTICAL: DOBOO_BUTTER_AXIS,
    HORIZONTAL: CAT_DOG_AXIS,
  },
};
