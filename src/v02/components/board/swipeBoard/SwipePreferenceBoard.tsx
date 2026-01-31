import * as S from "../Board.styled";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import SwipeBoard from "./SwipeBoard";
import { useCallback, useState } from "react";
import {
  emptyDirection,
  type BoardDirection,
  type SlotDict,
} from "@interfacesV02/type";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";
import StarRate from "@componentsV02/starRate/StarRate";

const SwipePreferenceBoard = () => {
  const {
    preference,
    preferenceSlot,
    setPreferenceSlot,
    itemSummaryDict,
    currentItemID,
  } = useBoardDataContext();

  const [direction, setDirection] = useState<BoardDirection>(emptyDirection);

  // TODO: 가운데를 찾는 인덱스가 없음 ㅜ
  const centerIDX = Math.floor(preference.slotList.length / 2);

  const slotID = preferenceSlot?.preference ?? centerIDX;
  const slotType = preference.slotList[slotID].slotType;
  const gorupID = preference.slotList[slotID].userAxisGroupID;
  const group = preference.groupDict[gorupID];
  const intensity = group.userAxisGroupID;

  const handleSlotChange = useCallback((next: SlotDict, d: BoardDirection) => {
    if (next.HORIZONTAL === undefined) return;
    setDirection(d);
    setPreferenceSlot({ preference: next.HORIZONTAL });
  }, []);

  const isFirst = direction.HORIZONTAL === null && direction.VERTICAL === null;

  const getSubTitle = () => {
    // 아이콘 - 그룹명 조합
    const icon = "🩷";
    const groupLabel = "취향";

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
        intensity: `${intensity / 2}`,
      });
    }

    // 비교해야함
    if (
      slotType === "BETWEEN" ||
      (dragDirection === "START" && slotType === "START_LABEL") ||
      (dragDirection === "END" && slotType === "END_LABEL")
    ) {
      const d = dragDirection === "END" ? -1 : 1;

      const comparisonItemID = getComparisonItem(preference, slotID + d) ?? 0;
      const comparisonLabel = d === 1 ? "더" : "덜";

      return renderComparisonTitle({
        comparison: itemSummaryDict[comparisonItemID].name,
        icon: icon,
        abs: comparisonLabel,
        group: groupLabel,
      });
    }

    // 아이템 리스트
    if (slotType === "ITEM_LIST") {
      const comparisonItemID = getComparisonItem(preference, slotID) ?? 0;

      return renderSameTitle({
        comparison: itemSummaryDict[comparisonItemID].name,
        icon: icon,
        group: groupLabel,
      });
    }
  };

  const onClickStar = (num: number) => {
    console.log(num);
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
      <SwipeBoard
        dataList={[preference]}
        axisList={["HORIZONTAL"]}
        initialH={centerIDX}
        onSlotChange={handleSlotChange}
      />

      <StarRate num={5} onClickStar={onClickStar} />
      <button onClick={() => {}}>확인</button>
    </>
  );
};

export default SwipePreferenceBoard;

const getComparisonItem = (data: AxisData, comparisonSlotID: number) => {
  const bundleID = data.slotList[comparisonSlotID].userAxisBundleID;

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
