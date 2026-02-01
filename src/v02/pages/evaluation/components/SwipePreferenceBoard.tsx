import { useEffect, useState } from "react";

import * as S from "./Board.styled";

import { type SlotDict } from "@interfacesV02/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/data/context/context";

import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";

import { getSlotCenterIDX } from "@utilsV02/getSlotIDX";

import HeartRateInput from "@componentsV02/starRate/HeartRateInput";
import useSwipeBoard from "@componentsV02/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV02/board/swipeBoard/SwipeBoard";

const SwipePreferenceBoard = () => {
  const { preference, itemSummaryDict, pushItem } = useBoardStaticContext();
  const { preferenceSlot, setPreferenceSlot, resetSlot } =
    useBoardSlotContext();
  const { currentItemID, confrimCurrentStep } = useBoardStepContext();

  const centerIDX = getSlotCenterIDX(5, preference.groupDict);
  const getSlot = (s: SlotDict) => {
    if (s.HORIZONTAL === undefined) return;
    setPreferenceSlot({ preference: s.HORIZONTAL });
  };

  const { dragDirection: direction, swipeBoardProps } = useSwipeBoard({
    slot: { HORIZONTAL: preferenceSlot?.preference },
    getSlot: getSlot,
    dataDict: { HORIZONTAL: preference },
  });

  const [isFirst, setIsFirst] = useState<boolean>(
    direction.HORIZONTAL === null && direction.VERTICAL === null,
  );

  useEffect(() => {
    setPreferenceSlot({ preference: centerIDX });
  }, []);

  const onClickStar = (num: number) => {
    const slotIDX = getSlotCenterIDX(num, preference.groupDict);
    setPreferenceSlot({ preference: slotIDX });
    setIsFirst(true);
  };

  const slotID = preference.slotList[preferenceSlot?.preference ?? centerIDX];
  const slot = preference.slotDict[slotID];
  const slotType = slot.slotType;
  const gorupID = slot.userAxisGroupID;
  const group = preference.groupDict[gorupID];
  const icon = group.groupSummary.groupIcon;
  const groupLabel = group.groupSummary.groupLabel;
  const intensity = group.groupSummary.intensityLabel;

  useEffect(() => {
    setIsFirst(direction.HORIZONTAL === null && direction.VERTICAL === null);
  }, [direction]);

  const getSubTitle = () => {
    const slotIDX = preferenceSlot?.preference ?? 0;
    const dragDirection = direction["HORIZONTAL"];

    // 그룹 라벨만 출력
    if (
      isFirst ||
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
        comparison: itemSummaryDict[comparisonItemID].name,
        icon: icon,
        abs: comparisonLabel,
        group: groupLabel,
      });
    }

    // 아이템 리스트
    if (slotType === "ITEM_LIST") {
      const comparisonItemID = getComparisonItem(preference, slotIDX) ?? 0;

      return renderSameTitle({
        comparison: itemSummaryDict[comparisonItemID].name,
        icon: icon,
        group: groupLabel,
      });
    }
  };

  const item = itemSummaryDict[currentItemID];
  const Title = () => {
    return (
      <S.BoardTitleContainer>
        <S.BoardTitleItemSection>
          <h6>{item.category}</h6>
          <h3>{item.name}</h3>
        </S.BoardTitleItemSection>
        <S.BoardTitleMain>얼마나 취향인가요?</S.BoardTitleMain>
        <S.BoardTitleSubContainer>
          <S.BoardTitleSubWrapper>{getSubTitle()}</S.BoardTitleSubWrapper>
        </S.BoardTitleSubContainer>
      </S.BoardTitleContainer>
    );
  };

  return (
    <>
      <Title />
      <S.BoardTitleDescription>
        좌우로 드래그 하거나, 하트를 터치해주세요!
      </S.BoardTitleDescription>

      <SwipeBoard {...swipeBoardProps} />

      <S.BoardRateContaienr>
        <span>{group.groupSummary.groupDescription}</span>
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
