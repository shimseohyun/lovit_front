import * as S from "./Board.styled";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/data/context/context";

import { getSlotCenterIDX } from "@utilsV02/getSlotIDX";
import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import { getItemSummary } from "@dataV02/itemSummary";

const TouchEvaluationBoard = () => {
  const { vertical, horizontal } = useBoardStaticContext();

  const { currentItemID, navigateEvaluationSwipe } = useBoardStepContext();

  const item = getItemSummary(currentItemID);
  const Title = () => {
    return (
      <S.BoardTitleContainer>
        <S.BoardTitleItemSection>
          <h6>{item.category}</h6>
          <h3>{item.name}</h3>
        </S.BoardTitleItemSection>
        <S.BoardTitleItemImg src={item.thumbnailURL} />
      </S.BoardTitleContainer>
    );
  };

  const onClickBoardGrid = (v: number, h: number) => {
    const vSlotIDX = getSlotCenterIDX(v, vertical.groupDict);
    const hSlotIDX = getSlotCenterIDX(h, horizontal.groupDict);

    navigateEvaluationSwipe({ VERTICAL: vSlotIDX, HORIZONTAL: hSlotIDX });
  };

  return (
    <>
      <Title />
      <S.BoardTitleDescription>
        어디에 속하는지 사분면에서 선택해주세요!
      </S.BoardTitleDescription>

      <EvaluationBoard onClickGridItem={onClickBoardGrid} />
    </>
  );
};

export default TouchEvaluationBoard;
