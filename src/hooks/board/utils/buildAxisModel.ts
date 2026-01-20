import type { BoardData, SeparatedBoardData } from "../type";

export type AxisPosition = {
  groupIndex: number;
  indexInGroup: number;
  slotIndex: number;
};

export type AxisModel = {
  separatedData: SeparatedBoardData;
  count: number[];
  slotToGroup: BoardData;
  positionById: Map<number, AxisPosition>;
  centerSlotByGroup: number[]; // groupIndex -> center slot
};

export const buildAxisModel = (data: BoardData): AxisModel => {
  const separatedData: SeparatedBoardData = [];
  const count: number[] = [];
  const slotToGroup: BoardData = [];
  const positionById = new Map<number, AxisPosition>();
  const centerSlotByGroup: number[] = [];

  let temp: number[] = [];
  let groupIndex = 0; // 실제 그룹(빈 그룹 제외)
  let indexInGroup = 0;
  let firstSlotInGroup: number | null = null;

  // ⚠️ 기존 buildSlotToGroup 과 동일하게:
  // separator를 만날 때마다 "slot 기준 그룹 id"는 증가
  let slot_group_id = 0;

  const flush = () => {
    if (temp.length === 0) return;

    separatedData.push(temp);
    count.push(temp.length);

    const start = firstSlotInGroup ?? 0;
    centerSlotByGroup.push(start + Math.floor(temp.length / 2));

    temp = [];
    indexInGroup = 0;
    firstSlotInGroup = null;
    groupIndex += 1;
  };

  for (let slotIndex = 0; slotIndex < data.length; slotIndex += 1) {
    const value = data[slotIndex];

    // separator
    if (value < 0) {
      slotToGroup.push(value); // 음수 그대로 보존
      flush();
      slot_group_id += 1;
      continue;
    }

    // item
    slotToGroup.push(slot_group_id);

    if (temp.length === 0) firstSlotInGroup = slotIndex;

    temp.push(value);

    positionById.set(value, {
      groupIndex,
      indexInGroup,
      slotIndex,
    });

    indexInGroup += 1;
  }

  flush();

  return { separatedData, count, slotToGroup, positionById, centerSlotByGroup };
};
