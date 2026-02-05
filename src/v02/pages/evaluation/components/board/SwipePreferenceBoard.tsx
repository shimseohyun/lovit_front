import { useEffect, useState } from "react";

import * as S from "./Board.styled";

import { type SlotDict } from "@interfacesV02/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/board/context/context";

import { getSlotCenterIDX } from "@utilsV02/getSlotIDX";

import HeartRateInput from "@componentsV02/starRate/HeartRateInput";
import useSwipeBoard from "@componentsV02/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV02/board/swipeBoard/SwipeBoard";
import { getItemSummary } from "@dataV02/itemSummary";
import type { AxisData } from "@interfacesV02/type";
import Spacing from "@componentsV02/spacing/Spacing";

const SwipePreferenceBoard = () => {
  const { currentItemID } = useBoardStepContext();
  const { preference, boardInformation } = useBoardStaticContext();
  const { preferenceSlot, setPreferenceSlot } = useBoardSlotContext();

  const centerIDX = getSlotCenterIDX(5, preference.slotByGroupDict);
  useEffect(() => {
    setPreferenceSlot({ preference: centerIDX });
  }, []);

  const getSlot = (s: SlotDict) => {
    if (s.HORIZONTAL === undefined) return;
    setPreferenceSlot({ preference: s.HORIZONTAL });
  };

  const { dragDirection: direction, swipeBoardProps } = useSwipeBoard({
    slot: { HORIZONTAL: preferenceSlot?.preference },
    getSlot: getSlot,
    dataDict: { HORIZONTAL: preference },
  });

  const onClickStar = (num: number) => {
    const slotIDX = getSlotCenterIDX(num, preference.slotByGroupDict);
    setPreferenceSlot({ preference: slotIDX });
  };

  const slotID = preference.slotList[preferenceSlot?.preference ?? centerIDX];
  const slot = preference.slotDict[slotID];
  const slotType = slot.slotType;
  const gorupID = slot.userAxisGroupID;
  const groupSummary =
    boardInformation.axisDict["PREFERENCE"].groupSummary[gorupID];

  const icon = groupSummary.groupIcon;
  const groupLabel = groupSummary.groupLabel;
  const intensity = groupSummary.intensityLabel;

  const getSubTitle = () => {
    const slotIDX = preferenceSlot?.preference ?? 0;
    const dragDirection = direction["HORIZONTAL"];

    // 그룹 라벨만 출력
    if (
      slotType === "CENTER_LABEL" ||
      (dragDirection === "END" && slotType === "START_LABEL") ||
      (dragDirection === "START" && slotType === "END_LABEL")
    ) {
      return renderGroupTitle({
        icon: icon,
        intensity: intensity,
      });
    }

    // 비교해야함
    if (
      slotType === "BETWEEN" ||
      (dragDirection === "START" && slotType === "START_LABEL") ||
      (dragDirection === "END" && slotType === "END_LABEL")
    ) {
      const d = dragDirection === "END" ? -1 : 1;

      const comparisonItemID = getComparisonItem(preference, slotIDX + d) ?? 0;
      const comparisonLabel = d === -1 ? "더" : "덜";

      return renderComparisonTitle({
        comparison: getItemSummary(comparisonItemID).name,
        icon: icon,
        abs: comparisonLabel,
        group: groupLabel,
      });
    }

    // 아이템 리스트
    if (slotType === "ITEM_LIST") {
      const comparisonItemID = getComparisonItem(preference, slotIDX) ?? 0;

      return renderSameTitle({
        comparison: getItemSummary(comparisonItemID).name,
        icon: icon,
        group: groupLabel,
      });
    }
  };

  const Title = () => {
    return (
      <S.BoardTitleContainer>
        <S.BoardTitleDescription>
          드래그하거나 터치해주세요
        </S.BoardTitleDescription>
        <S.BoardTitleMain>얼마나 취향인가요?</S.BoardTitleMain>
      </S.BoardTitleContainer>
    );
  };

  const BoardTitle = () => {
    return (
      <S.BoardTitleSubContainer>
        <S.BoardTitleSubWrapper $isSelected={true}>
          {getSubTitle()}
        </S.BoardTitleSubWrapper>
      </S.BoardTitleSubContainer>
    );
  };
  return (
    <>
      <Title />

      <S.SwipeBoardContainer>
        <BoardTitle />
        <Spacing size={20} />
        <SwipeBoard {...swipeBoardProps} />
      </S.SwipeBoardContainer>

      <S.BoardRateContaienr>
        <HeartRateInput value={gorupID} onChange={onClickStar} />
      </S.BoardRateContaienr>
    </>
  );
};

export default SwipePreferenceBoard;

const getComparisonItem = (data: AxisData, comparisonSlotIDX: number) => {
  const comparisonID = data.slotList[comparisonSlotIDX];
  const bundleID = data.slotDict[comparisonID]?.userAxisBundleID;

  if (bundleID === undefined) return;

  const itemList = data.bundleDict[bundleID].itemList;
  const comparisonItemID =
    data.itemPositionDict[itemList[itemList.length - 1]].itemSummaryID;

  return comparisonItemID;
};

// "[그룹]"
const renderGroupTitle = (parms: { icon: string; intensity: string }) => {
  const { icon, intensity } = parms;
  return (
    <>
      <S.BoardTitleSubChip>
        {icon} {intensity}
      </S.BoardTitleSubChip>
    </>
  );
};

// "[아이템] 보다 [덜/더] [그룹]"
const renderComparisonTitle = (parms: {
  comparison: string;
  icon: string;
  abs: string;
  group: string;
}) => {
  const { comparison, icon, abs, group } = parms;
  return (
    <>
      <S.BoardTitleSubChip>{comparison}</S.BoardTitleSubChip>
      <span>보다</span>
      <S.BoardTitleSubChip>
        {icon} {abs} {group}
      </S.BoardTitleSubChip>
    </>
  );
};

// "[아이템] 만큼 [그룹]"
const renderSameTitle = (parms: {
  comparison: string;
  icon: string;
  group: string;
}) => {
  const { comparison, icon, group } = parms;

  return (
    <>
      <S.BoardTitleSubChip>{comparison}</S.BoardTitleSubChip>
      <span>만큼</span>
      <S.BoardTitleSubChip>
        {icon} {group}
      </S.BoardTitleSubChip>
    </>
  );
};
