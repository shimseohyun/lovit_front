import { dummyData } from "../../../dummy/data";
import type { BoardData, BoardPositionData, SwipeData } from "../type";
import {
  colGroupLabel,
  directionDictionary,
  rowGroupLabel,
} from "../useBoardDescription";

type DeriveTitleDeps = {
  rowData: BoardData;
  colData: BoardData;
  rowPosition: BoardPositionData;
  colPosition: BoardPositionData;
};

export function deriveTitle(
  d: SwipeData,
  deps: DeriveTitleDeps,
): string | undefined {
  const { axis, direction, slotNum } = d;

  let data = axis === "horizontal" ? deps.colData : deps.rowData;
  let label = axis === "horizontal" ? colGroupLabel : rowGroupLabel;
  let position = axis === "horizontal" ? deps.colPosition : deps.rowPosition;

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
    return label[comparisonSlotID];
  } else {
    const newData = dummyData[comparisonSlotID];
    if (!newData) return;

    return (
      dummyData[comparisonSlotID].name +
      directionDictionary[direction][
        position[comparisonSlotID].group < 3 ? 0 : 1
      ]
    );
  }
}
