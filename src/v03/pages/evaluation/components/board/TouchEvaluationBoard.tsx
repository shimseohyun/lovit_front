import * as Title from "@componentsV03/title/Title.styled";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV03/board/context/context";

import EvaluationBoard from "@componentsV03/board/evaluationBoard/EvaluationBoard";

import useBoardControl from "@hooksV03/board/useBoardControl";

import useGetBoardPoint from "@hooksV03/board/useGetBoardPoint";
import Spacing from "@componentsV03/spacing/Spacing";

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
  const { navigateEvaluationTouchNext } = useBoardControl();

  const onClickBoardGrid = (v: number, h: number) => {
    navigateEvaluationTouchNext(v, h);
  };

  return (
    <>
      <Title.BoardTitleContainer style={{ flexGrow: 1 }}>
        <span className="category">{currentItem.category}</span>
        <span className="name">{currentItem.name}</span>

        <Title.BoardTitleImg $imgURL={currentItem.thumbnailURL} />
      </Title.BoardTitleContainer>
      <Title.BoardDescription>
        사분면 중 어디에 속하는지 선택해주세요.
      </Title.BoardDescription>
      <EvaluationBoard
        onClickGridItem={onClickBoardGrid}
        itemList={itemList}
        itemPointDict={points}
        boardInformation={boardInformation}
      />
      <Spacing size={20} />
    </>
  );
};

export default TouchEvaluationBoard;
