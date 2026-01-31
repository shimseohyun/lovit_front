import * as S from "../Board.styled";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import SwipeBoard from "./SwipeBoard";
import { useCallback, useState } from "react";
import {
  emptyDirection,
  type AxisType,
  type BoardDirection,
  type SlotDict,
} from "@interfacesV02/type";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";

const SwipeEvaluationBoard = () => {
  const {
    vertical,
    horizontal,
    evaluationSlot,
    navigatePreference,
    setEvaluationSlot,
    itemSummaryDict,
    boardInformation,
    currentItemID,
  } = useBoardDataContext();

  if (evaluationSlot === undefined) return;

  const [direction, setDirection] = useState<BoardDirection>(emptyDirection);

  const handleSlotChange = useCallback((next: SlotDict, d: BoardDirection) => {
    if (next.HORIZONTAL === undefined || next.VERTICAL === undefined) return;
    setDirection(d);
    setEvaluationSlot({
      VERTICAL: next.VERTICAL,
      HORIZONTAL: next.HORIZONTAL,
    });
  }, []);

  const isFirst = direction.HORIZONTAL === null && direction.VERTICAL === null;

  const getSubTitle = (axis: AxisType, data: AxisData) => {
    const slotID = evaluationSlot[axis];
    const slotType = data.slotList[slotID].slotType;
    const group = data.groupDict[data.slotList[slotID].userAxisGroupID];

    // 아이콘 - 그룹명 조합
    const info = boardInformation.axisDict[axis];
    const icon = info.partDict[group.axisSide].icon ?? "";
    const groupLabel = info.partDict[group.axisSide].label;

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
        intensity: info.intensityLabelList[group.intensityLevel - 1],
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

      const comparisonItemID = getComparisonItem(data, slotID + d) ?? 0;
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
      const comparisonItemID = getComparisonItem(data, slotID) ?? 0;

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

      <SwipeBoard
        onSlotChange={handleSlotChange}
        dataList={[vertical, horizontal]}
        axisList={["VERTICAL", "HORIZONTAL"]}
        initialH={evaluationSlot.HORIZONTAL}
        initialV={evaluationSlot.VERTICAL}
      />

      <button
        onClick={() => {
          navigatePreference();
        }}
      >
        확인
      </button>
    </>
  );
};

export default SwipeEvaluationBoard;

const getComparisonItem = (data: AxisData, comparisonSlotID: number) => {
  const bundleID = data.slotList[comparisonSlotID].userAxisBundleID;

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
