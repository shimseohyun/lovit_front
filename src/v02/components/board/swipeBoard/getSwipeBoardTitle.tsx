import type { ReactNode } from "react";

import * as Title from "@componentsV02/title/Title.styled";
import { getItemSummary } from "@dataV02/itemSummary";
import type { AxisData, DirectionType } from "@interfacesV02/type";

type Params = {
  data: AxisData;
  slotIDX?: number;
  dragDirection: DirectionType | null;

  icon: string;
  intensity: string;
  groupLabel: string;

  // evaluation 축에서만 필요 (축 방향에 따라 더/덜 뒤집힘)
  axisSide?: DirectionType;

  // preference는 그룹명 없이 (아이콘+강도)만 보여주려면 false
  showGroupLabelInGroupTitle?: boolean;
};

export const getSwipeBoardSubTitle = (params: Params): ReactNode => {
  const {
    data,
    slotIDX,
    dragDirection,
    icon,
    intensity,
    groupLabel,
    axisSide,
    showGroupLabelInGroupTitle = true,
  } = params;

  // 아직 slot이 없으면 그룹 타이틀
  if (slotIDX === undefined) {
    return renderGroupTitle({
      icon,
      intensity,
      groupLabel,
      showGroupLabelInGroupTitle,
    });
  }

  const slotID = data.slotList[slotIDX];
  const slot = data.slotDict[slotID];
  if (!slot) {
    return renderGroupTitle({
      icon,
      intensity,
      groupLabel,
      showGroupLabelInGroupTitle,
    });
  }

  const slotType = slot.slotType;
  const dir = dragDirection;

  // 그룹 라벨만 출력
  if (
    slotType === "CENTER_LABEL" ||
    (dir === "END" && slotType === "START_LABEL") ||
    (dir === "START" && slotType === "END_LABEL")
  ) {
    return renderGroupTitle({
      icon,
      intensity,
      groupLabel,
      showGroupLabelInGroupTitle,
    });
  }

  // 비교(더/덜)
  if (
    slotType === "BETWEEN" ||
    (dir === "START" && slotType === "START_LABEL") ||
    (dir === "END" && slotType === "END_LABEL")
  ) {
    const d = dir === "END" ? -1 : 1;

    // evaluation은 axisSide 반영 / preference는 그대로
    const abs = (() => {
      if (axisSide === undefined) return d === -1 ? "더" : "덜";
      const a = axisSide === "END" ? -1 : 1;
      return d * a === 1 ? "더" : "덜";
    })();

    const comparisonItemID = getComparisonItem(data, slotIDX + d) ?? 0;

    return renderComparisonTitle({
      comparison: getItemSummary(comparisonItemID).name,
      icon,
      abs,
      groupLabel,
    });
  }

  // 아이템 리스트(“만큼”)
  if (slotType === "ITEM_LIST") {
    const comparisonItemID = getComparisonItem(data, slotIDX) ?? 0;

    return renderSameTitle({
      comparison: getItemSummary(comparisonItemID).name,
      icon,
      groupLabel,
    });
  }

  // 알 수 없는 타입이면 fallback
  return renderGroupTitle({
    icon,
    intensity,
    groupLabel,
    showGroupLabelInGroupTitle,
  });
};

const getComparisonItem = (data: AxisData, comparisonSlotIDX: number) => {
  if (comparisonSlotIDX < 0 || comparisonSlotIDX >= data.slotList.length)
    return;

  const comparisonSlotID = data.slotList[comparisonSlotIDX];
  const comparisonSlot = data.slotDict[comparisonSlotID];
  const bundleID = comparisonSlot?.userAxisBundleID;
  if (bundleID === undefined) return;

  const itemList = data.bundleDict[bundleID]?.itemList;
  if (!itemList || itemList.length === 0) return;

  const lastItemPositionID = itemList[itemList.length - 1];
  return data.itemPositionDict[lastItemPositionID]?.itemSummaryID;
};

const renderGroupTitle = (p: {
  icon: string;
  intensity: string;
  groupLabel: string;
  showGroupLabelInGroupTitle: boolean;
}) => {
  const { icon, intensity, groupLabel, showGroupLabelInGroupTitle } = p;
  return (
    <Title.BoardTitleSubChip>
      {icon} {intensity}
      {showGroupLabelInGroupTitle && <> {groupLabel}</>}
    </Title.BoardTitleSubChip>
  );
};

const renderComparisonTitle = (p: {
  comparison: string;
  icon: string;
  abs: string;
  groupLabel: string;
}) => {
  const { comparison, icon, abs, groupLabel } = p;
  return (
    <>
      <Title.BoardTitleSubChip>{comparison}</Title.BoardTitleSubChip>
      <span>보다</span>
      <Title.BoardTitleSubChip>
        {icon} {abs} {groupLabel}
      </Title.BoardTitleSubChip>
    </>
  );
};

const renderSameTitle = (p: {
  comparison: string;
  icon: string;
  groupLabel: string;
}) => {
  const { comparison, icon, groupLabel } = p;
  return (
    <>
      <Title.BoardTitleSubChip>{comparison}</Title.BoardTitleSubChip>
      <span>만큼</span>
      <Title.BoardTitleSubChip>
        {icon} {groupLabel}
      </Title.BoardTitleSubChip>
    </>
  );
};
