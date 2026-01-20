import type { BoardData, SeparatedBoardData } from "../type";

export type AxisPosition = {
  groupIndex: number; // ✅ separator 기준 그룹(빈 그룹 포함)
  indexInGroup: number;
  slotIndex: number; // data 배열에서의 인덱스
};

export type AxisModel = {
  separatedData: SeparatedBoardData; // groupIndex -> items[]
  count: number[]; // groupIndex -> items.length (빈 그룹이면 0)
  slotToGroup: BoardData; // slotIndex -> groupIndex (separator는 음수 그대로)
  positionById: Map<number, AxisPosition>;
  centerSlotByGroup: number[]; // groupIndex -> "센터 슬롯(없으면 경계 슬롯)"
};

export const buildAxisModel = (data: BoardData): AxisModel => {
  const separatedData: SeparatedBoardData = [];
  const count: number[] = [];
  const slotToGroup: BoardData = [];
  const positionById = new Map<number, AxisPosition>();
  const centerSlotByGroup: number[] = [];

  let temp: number[] = [];
  let indexInGroup = 0;

  // ✅ groupIndex = separator 기준 그룹 id (빈 그룹 포함)
  let groupId = 0;

  // 현재 그룹의 "시작 경계 슬롯" (빈 그룹 센터 계산용)
  let groupStartBoundary = 0;

  // 현재 그룹에 첫 아이템이 들어온 slotIndex
  let firstItemSlot: number | null = null;

  const flush = () => {
    // ✅ 빈 그룹도 포함
    separatedData.push(temp);
    count.push(temp.length);

    if (temp.length > 0 && firstItemSlot !== null) {
      // 아이템 기준 센터 슬롯(기존 로직)
      centerSlotByGroup.push(firstItemSlot + Math.floor(temp.length / 2));
    } else {
      // ✅ 빈 그룹이면 "그룹 시작 경계 슬롯"을 센터로 둠
      // (예: -4와 -3이 붙어있으면, 그 사이 경계가 center)
      centerSlotByGroup.push(groupStartBoundary);
    }

    // reset
    temp = [];
    indexInGroup = 0;
    firstItemSlot = null;
  };

  for (let slotIndex = 0; slotIndex < data.length; slotIndex += 1) {
    const value = data[slotIndex];

    // separator
    if (value < 0) {
      // ✅ separator를 만나면 지금까지 그룹 flush
      flush();

      // slotToGroup은 음수 그대로 보존
      slotToGroup.push(value);

      // 다음 그룹으로 이동
      groupId += 1;
      groupStartBoundary = slotIndex + 1;
      continue;
    }

    // item
    slotToGroup.push(groupId);

    if (temp.length === 0) firstItemSlot = slotIndex;

    temp.push(value);
    positionById.set(value, {
      groupIndex: groupId,
      indexInGroup,
      slotIndex,
    });
    indexInGroup += 1;
  }

  flush();

  return { separatedData, count, slotToGroup, positionById, centerSlotByGroup };
};
