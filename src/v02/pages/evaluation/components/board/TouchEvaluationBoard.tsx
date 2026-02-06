import * as S from "./Board.styled";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/board/context/context";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import { getItemSummary } from "@dataV02/itemSummary";
import useBoardControl from "@hooksV02/board/useBoardControl";
import Spacing from "@componentsV02/spacing/Spacing";

const TouchEvaluationBoard = () => {
  const { vertical, horizontal, preference, itemList, boardInformation } =
    useBoardStaticContext();
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
      <Spacing size={8} />
      <S.BoardTitleDescription>
        어디에 속하는지 사분면에서 선택해주세요!
      </S.BoardTitleDescription>
      <Spacing size={12} />

      <EvaluationBoard
        onClickGridItem={onClickBoardGrid}
        vertical={vertical}
        horizontal={horizontal}
        preference={preference}
        itemList={itemList}
        boardInformation={boardInformation}
      />
    </>
  );
};

export default TouchEvaluationBoard;
