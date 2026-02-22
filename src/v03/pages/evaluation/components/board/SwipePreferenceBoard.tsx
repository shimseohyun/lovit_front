import { useEffect } from "react";

import * as S from "./Board.styled";
import * as Title from "@componentsV03/title/Title.styled";

import { type SlotDict } from "@interfacesV03/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
} from "@hooksV03/board/context/context";

import { getSlotCenterIDX } from "@utilsV03/getSlotIDX";

import HeartRateInput from "@componentsV03/starRate/HeartRateInput";
import useSwipeBoard from "@componentsV03/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV03/board/swipeBoard/SwipeBoard";

const SwipePreferenceBoard = () => {
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

  const { swipeBoardProps } = useSwipeBoard({
    slot: { HORIZONTAL: preferenceSlot?.preference },
    getSlot: getSlot,
    dataDict: {
      HORIZONTAL: {
        startIDX: 0,
        endIDX: preference.slotList.length - 1,
        ...preference,
      },
    },
  });

  const onClickStar = (num: number) => {
    const slotIDX = getSlotCenterIDX(num, preference.slotByGroupDict);
    setPreferenceSlot({ preference: slotIDX });
  };
  const slotID = preference.slotList[preferenceSlot?.preference ?? centerIDX];
  const slot = preference.slotDict[slotID];

  const gorupID = slot.userAxisGroupID;

  const groupSummary =
    boardInformation.axisDict["PREFERENCE"].groupSummary[gorupID];

  return (
    <>
      <Title.BoardTitleContainer>
        <h6>드래그하거나 하트를 터치해주세요</h6>
        <h1>얼마나 취향인가요?</h1>
      </Title.BoardTitleContainer>

      <Title.BoardTitelGroupChipWrapper>
        <Title.BoardTitelGroupChip
          $lightColor={groupSummary.labelColorLight}
          $lighterColor={groupSummary.labelColorLightest}
        >
          {groupSummary.groupIcon} {groupSummary.intensityLabel}
        </Title.BoardTitelGroupChip>
      </Title.BoardTitelGroupChipWrapper>

      <S.SwipeBoardContainer>
        <SwipeBoard {...swipeBoardProps} />
      </S.SwipeBoardContainer>

      <S.BoardRateContaienr>
        <span>{groupSummary.groupDescription}</span>
        <HeartRateInput value={gorupID} onChange={onClickStar} />
      </S.BoardRateContaienr>
    </>
  );
};

export default SwipePreferenceBoard;
