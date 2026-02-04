import * as S from "./Board.styled";

import { useBoardStepContext } from "@hooksV02/board/context/context";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import { getItemSummary } from "@dataV02/itemSummary";
import useBoardControl from "@hooksV02/board/useBoardControl";

const TouchEvaluationBoard = () => {
  const { currentItemID } = useBoardStepContext();
  const { navigateEvaluationSwipe } = useBoardControl();

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
    navigateEvaluationSwipe(v, h);
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
