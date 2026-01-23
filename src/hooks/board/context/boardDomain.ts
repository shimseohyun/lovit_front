import { dummyData } from "@data/data";
import type {
  BoardData,
  BoardPositionData,
  SwipeData,
  Title,
} from "@hooks/board/type";
import {
  colGroupLabel,
  directionDictionary,
  rowGroupLabel,
} from "@hooks/board/useBoardDescription";

type DeriveTitleDeps = {
  rowData: BoardData;
  colData: BoardData;
  rowPosition: BoardPositionData;
  colPosition: BoardPositionData;
};

export const deriveTitle = (
  d: SwipeData,
  deps: DeriveTitleDeps,
): Title | undefined => {
  const { axis, direction, slotNum } = d;

  let data = axis === "horizontal" ? deps.colData : deps.rowData;
  let label = axis === "horizontal" ? colGroupLabel : rowGroupLabel;
  let position = axis === "horizontal" ? deps.colPosition : deps.rowPosition;
  // console.log(deps.colPosition, deps.rowPosition);
  let comparisonSlot = 0;
  let isGroup: boolean = false;
  let comparisonSlotID = 0;
  let groupAdd = 0;

  if (direction === "up" || direction === "left") {
    // 커지는거 비교대상 앞에있는거
    comparisonSlot = slotNum - 1;
    groupAdd = 6;
  } else {
    // 작아지는거 비교대상 뒤에있는거
    comparisonSlot = slotNum;
    groupAdd = 5;
  }

  let currentData = data[comparisonSlot];

  isGroup = currentData < 0;
  comparisonSlotID = isGroup ? currentData + groupAdd : currentData;

  if (isGroup) {
    return { groupName: label[comparisonSlotID] };
  } else {
    const newData = dummyData[comparisonSlotID];
    if (!newData) return;

    return {
      comparisonID: comparisonSlotID,
      comparisonLabel:
        directionDictionary[direction][
          position[comparisonSlotID].group < 3 ? 0 : 1
        ],
    };
  }
};
