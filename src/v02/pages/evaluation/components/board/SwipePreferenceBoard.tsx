import { useEffect } from "react";

import * as S from "./Board.styled";
import * as Title from "@componentsV02/title/Title.styled";

import { type SlotDict } from "@interfacesV02/type";

import {
  useBoardSlotContext,
  useBoardStaticContext,
} from "@hooksV02/board/context/context";

import { getSlotCenterIDX } from "@utilsV02/getSlotIDX";

import HeartRateInput from "@componentsV02/starRate/HeartRateInput";
import useSwipeBoard from "@componentsV02/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV02/board/swipeBoard/SwipeBoard";

import { getSwipeBoardSubTitle } from "@componentsV02/board/swipeBoard/getSwipeBoardTitle";

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

  const { dragDirection: direction, swipeBoardProps } = useSwipeBoard({
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

  const getSubTitle = () => {
    return getSwipeBoardSubTitle({
      data: preference,
      slotIDX: preferenceSlot?.preference ?? centerIDX,
      dragDirection: direction["HORIZONTAL"],
      icon: groupSummary.groupIcon,
      intensity: groupSummary.intensityLabel,
      groupLabel: groupSummary.groupLabel,
      showGroupLabelInGroupTitle: false,
      labelColorLight: groupSummary.labelColorLight,
      labelColorLighter: groupSummary.labelColorLightest,
    });
  };

  const BoardTitle = () => {
    return (
      <Title.BoardTitleSubContainer>
        <Title.BoardTitelGroupChip>
          {groupSummary.groupDescription}
        </Title.BoardTitelGroupChip>

        <Title.BoardTitleSubWrapper $isSelected={true}>
          {getSubTitle()}
        </Title.BoardTitleSubWrapper>
      </Title.BoardTitleSubContainer>
    );
  };
  return (
    <>
      <Title.BoardTitleContainer>
        <h6>드래그하거나 터치해주세요</h6>
        <h1>얼마나 취향인가요?</h1>
      </Title.BoardTitleContainer>

      <S.SwipeBoardContainer>
        <BoardTitle />

        <SwipeBoard {...swipeBoardProps} />
      </S.SwipeBoardContainer>

      <S.BoardRateContaienr>
        <HeartRateInput value={gorupID} onChange={onClickStar} />
      </S.BoardRateContaienr>
    </>
  );
};

export default SwipePreferenceBoard;
