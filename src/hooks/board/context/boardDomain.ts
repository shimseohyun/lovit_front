import type { BoardData, Description } from "../type";
import { getTitle } from "../useBoardDescription";

type DeriveTitleDeps = {
  rowData: BoardData;
  colData: BoardData;
  rowSlotToGroup: Array<number | undefined>;
  colSlotToGroup: Array<number | undefined>;
};

export function deriveTitle(
  d: Description,
  deps: DeriveTitleDeps,
): string | undefined {
  const { axis, direction } = d;

  // 기준 slot 보정
  let slotNum = d.slotNum;
  if (direction === "left" || direction === "up") slotNum -= 1;

  const isVertical = axis === "vertical";
  const axisData = isVertical ? deps.rowData : deps.colData;
  const axisSlotToGroup = isVertical
    ? deps.rowSlotToGroup
    : deps.colSlotToGroup;

  if (slotNum < 0 || slotNum >= axisData.length) return;

  const groupId = axisSlotToGroup[slotNum];

  const value = axisData[slotNum];

  if (typeof groupId !== "number" || typeof value !== "number") return;

  const nextTitle = getTitle(value, groupId, direction);
  if (Array.isArray(nextTitle)) return;
  if (nextTitle === "") return;

  return nextTitle;
}
