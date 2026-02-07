import * as Title from "@componentsV02/title/Title.styled";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/board/context/context";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";

import useBoardControl from "@hooksV02/board/useBoardControl";
import Spacing from "@componentsV02/spacing/Spacing";
import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";

const TouchEvaluationBoard = () => {
  const { vertical, horizontal, preference, itemList, boardInformation } =
    useBoardStaticContext();

  const { points } = useGetBoardPoint({
    vertical,
    horizontal,
    preference,
    itemList,
  });
  const { currentItem } = useBoardStepContext();
  const { navigateEvaluationSwipe } = useBoardControl();

  const CurrentTitle = () => {
    return (
      <Title.BoardTitleContainer>
        <Title.BoardTitleItemSection>
          <h6>{currentItem.category}</h6>
          <h3>{currentItem.name}</h3>
        </Title.BoardTitleItemSection>
        <Title.BoardTitleItemImg src={currentItem.thumbnailURL} />
      </Title.BoardTitleContainer>
    );
  };

  const onClickBoardGrid = (v: number, h: number) => {
    navigateEvaluationSwipe(v, h);
  };

  return (
    <>
      <CurrentTitle />
      <Spacing size={8} />
      <Title.BoardTitleDescription>
        어디에 속하는지 사분면에서 선택해주세요!
      </Title.BoardTitleDescription>
      <Spacing size={12} />

      <EvaluationBoard
        onClickGridItem={onClickBoardGrid}
        itemList={itemList}
        itemPointDict={points}
        boardInformation={boardInformation}
      />
    </>
  );
};

export default TouchEvaluationBoard;
