import * as S from "../Board.styled";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import SwipeBoard from "./SwipeBoard";
import { useCallback, useState } from "react";
import type { AxisType, BoardDirection, SlotDict } from "@interfacesV02/type";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";

const SwipeEvaluationBoard = () => {
  const {
    vertical,
    horizontal,
    evaluationSlot,
    navigatePreference,
    setEvaluationSlot,
    itemSummaryDict,
  } = useBoardDataContext();
  if (evaluationSlot === undefined) return;

  const [direction, setDirection] = useState<BoardDirection>({
    VERTICAL: null,
    HORIZONTAL: null,
  });

  const handleSlotChange = useCallback((next: SlotDict, d: BoardDirection) => {
    if (next.HORIZONTAL === undefined || next.VERTICAL === undefined) return;

    setDirection(d);
    setEvaluationSlot({
      VERTICAL: next.VERTICAL,
      HORIZONTAL: next.HORIZONTAL,
    });
  }, []);

  const getSubTitle = (axis: AxisType, data: AxisData) => {
    const slotID = evaluationSlot[axis];
    const slotType = data.slotList[slotID].slotType;

    const group = data.groupDict[data.slotList[slotID].userAxisGroupID];

    if (slotType === "ITEM_LIST") {
      return (
        <S.BoardTitleSubWrapper>
          <S.BoardTitleSubChip>슬기</S.BoardTitleSubChip>
          <span>만큼</span>
          <S.BoardTitleSubChip>고양이</S.BoardTitleSubChip>
        </S.BoardTitleSubWrapper>
      );
    } else if (slotType === "BETWEEN") {
      if (direction[axis] === null) {
        console.log("축이 없습니다");
        return;
      }
      const d = direction[axis] === "END" ? 1 : -1;
      const a = group.axisSide === "END" ? 1 : -1;
      const comparisonSlotID = slotID + d;
      const bundleID = data.slotList[comparisonSlotID].userAxisBundleID;

      if (bundleID === undefined) {
        console.log("번들이 없습니다");
        return;
      }

      const itemList = data.bundleDict[bundleID].itemList;
      const comparisonItemID =
        data.itemPositionDict[itemList[itemList.length - 1]].itemSummaryID;

      const comparisonLabel = d * a === 1 ? "더" : "덜";
      // 번들에서 찾기
      return (
        <S.BoardTitleSubWrapper>
          <S.BoardTitleSubChip>
            {itemSummaryDict[comparisonItemID].name}
          </S.BoardTitleSubChip>
          <span>보다</span>
          <S.BoardTitleSubChip>{comparisonLabel}</S.BoardTitleSubChip>
        </S.BoardTitleSubWrapper>
      );
    } else {
      return (
        <S.BoardTitleSubWrapper>
          <S.BoardTitleSubChip>
            {group.intensityLevel} {group.axisSide}
          </S.BoardTitleSubChip>
        </S.BoardTitleSubWrapper>
      );
    }
  };

  return (
    <>
      <S.BoardTitleContainer>
        <S.BoardTitleItemSection>
          <h6>레드벨벳</h6>
          <h3>아이린</h3>
        </S.BoardTitleItemSection>
        <S.BoardTitleSubContainer>
          {getSubTitle("VERTICAL", vertical)}
          {getSubTitle("HORIZONTAL", horizontal)}
        </S.BoardTitleSubContainer>
      </S.BoardTitleContainer>

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
