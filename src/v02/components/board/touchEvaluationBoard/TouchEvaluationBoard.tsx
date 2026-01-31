import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import * as S from "../Board.styled";

import EvaluationBoard from "./EvaluationBoard";
import { useBoardStepContext } from "@hooksV02/data/context/context";

const TouchEvaluationBoard = () => {
  const { itemSummaryDict } = useBoardDataContext();
  const { currentItemID } = useBoardStepContext();

  const item = itemSummaryDict[currentItemID];
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

  return (
    <>
      <Title />
      <S.BoardTitleDescription>
        어디에 속하는지 사분면에서 선택해주세요!
      </S.BoardTitleDescription>

      <EvaluationBoard />
    </>
  );
};

export default TouchEvaluationBoard;
