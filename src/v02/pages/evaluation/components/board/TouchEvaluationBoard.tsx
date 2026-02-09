import * as Title from "@componentsV02/title/Title.styled";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/board/context/context";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";

import useBoardControl from "@hooksV02/board/useBoardControl";

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

  const onClickBoardGrid = (v: number, h: number) => {
    navigateEvaluationSwipe(v, h);
  };

  return (
    <>
      <Title.BoardTitleContainer>
        <img src={currentItem.thumbnailURL} />
        <span className="category">{currentItem.category}</span>
        <span className="name">{currentItem.name}</span>
      </Title.BoardTitleContainer>

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
