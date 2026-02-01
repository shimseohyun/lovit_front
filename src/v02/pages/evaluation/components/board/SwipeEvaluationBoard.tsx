import * as S from "./Board.styled";

import { type AxisType, type SlotDict } from "@interfacesV02/type";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";
import {
  useBoardSlotContext,
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/data/context/context";

import useSwipeBoard from "@componentsV02/board/swipeBoard/useSwipeBoard";
import SwipeBoard from "@componentsV02/board/swipeBoard/SwipeBoard";

const SwipeEvaluationBoard = () => {
  const { vertical, horizontal, itemSummaryDict } = useBoardStaticContext();
  const { evaluationSlot, setEvaluationSlot } = useBoardSlotContext();
  const { currentItemID } = useBoardStepContext();

  if (evaluationSlot === undefined) return;

  const getSlot = (s: SlotDict) => {
    if (s.VERTICAL === undefined || s.HORIZONTAL === undefined) return;
    setEvaluationSlot({ VERTICAL: s.VERTICAL, HORIZONTAL: s.HORIZONTAL });
  };

  const { dragDirection: direction, swipeBoardProps } = useSwipeBoard({
    slot: evaluationSlot,
    getSlot: getSlot,
    dataDict: {
      VERTICAL: vertical,
      HORIZONTAL: horizontal,
    },
  });

  const isFirst = direction.HORIZONTAL === null && direction.VERTICAL === null;

  const getSubTitle = (axis: AxisType, data: AxisData) => {
    const slotIDX = evaluationSlot[axis];

    const slotID = data.slotList[slotIDX];
    const slot = data.slotDict[slotID];

    const slotType = slot.slotType;
    const group = data.groupDict[slot.userAxisGroupID];

    // 아이콘 - 그룹명 조합
    const icon = group.groupSummary.groupIcon;
    const groupLabel = group.groupSummary.groupLabel;

    const dragDirection = direction[axis];

    // 그룹 라벨만 출력
    if (
      isFirst ||
      slotType === "CENTER_LABEL" ||
      (dragDirection === "END" && slotType === "START_LABEL") ||
      (dragDirection === "START" && slotType === "END_LABEL")
    ) {
      return renderGroupTitle({
        icon: icon,
        intensity: group.groupSummary.intensityLabel,
        group: groupLabel,
      });
    }

    // 비교해야함
    if (
      slotType === "BETWEEN" ||
      (dragDirection === "START" && slotType === "START_LABEL") ||
      (dragDirection === "END" && slotType === "END_LABEL")
    ) {
      const d = dragDirection === "END" ? -1 : 1;
      const a = group.axisSide === "END" ? -1 : 1;

      const comparisonItemID = getComparisonItem(data, slotIDX + d) ?? 0;
      const comparisonLabel = d * a === 1 ? "더" : "덜";

      return renderComparisonTitle({
        comparison: itemSummaryDict[comparisonItemID].name,
        icon: icon,
        abs: comparisonLabel,
        group: groupLabel,
      });
    }

    // 아이템 리스트
    if (slotType === "ITEM_LIST") {
      const comparisonItemID = getComparisonItem(data, slotIDX) ?? 0;

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
        <S.BoardTitleSubContainer>
          <S.BoardTitleSubWrapper>
            {getSubTitle("VERTICAL", vertical)}
          </S.BoardTitleSubWrapper>
          <S.BoardTitleSubWrapper>
            {getSubTitle("HORIZONTAL", horizontal)}
          </S.BoardTitleSubWrapper>
        </S.BoardTitleSubContainer>
      </S.BoardTitleContainer>
    );
  };

  return (
    <>
      <Title />
      <S.BoardTitleDescription>
        상하좌우로 드래그해서 세부적인 분류를 할 수 있어요.
      </S.BoardTitleDescription>

      <SwipeBoard {...swipeBoardProps} />
    </>
  );
};

export default SwipeEvaluationBoard;

const getComparisonItem = (data: AxisData, comparisonSlotIDX: number) => {
  const comparisonSlotID = data.slotList[comparisonSlotIDX];
  const comparisonSlot = data.slotDict[comparisonSlotID];
  const bundleID = comparisonSlot.userAxisBundleID;

  if (bundleID === undefined) return;

  const itemList = data.bundleDict[bundleID].itemList;
  const comparisonItemID =
    data.itemPositionDict[itemList[itemList.length - 1]].itemSummaryID;

  return comparisonItemID;
};

// "[그룹]"
const renderGroupTitle = (parms: {
  icon: string;
  intensity: string;
  group: string;
}) => {
  const { icon, intensity, group } = parms;
  return (
    <>
      <S.BoardTitleSubChip>
        {icon} {intensity} {group}
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
