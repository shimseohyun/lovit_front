import * as S from "@pagesV02/evaluation/components/board/Board.styled";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV02/board/useGetBoardResult";

import { useGetUserBoardData } from "@apisV02/firebase/domain/user";
import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";

const Result = () => {
  const { data } = useGetUserBoardData();
  console.log(data);

  if (data === undefined) return;

  const { horizontal, vertical } = useGetBoardResult({
    vertical: data.axis.VERTICAL,
    horizontal: data.axis.HORIZONTAL,
    preference: data.axis.PREFERENCE,
    itemList: data.itemList,
  });

  const verticalZone = vertical.zone;
  const horizontalZone = horizontal.zone;

  const horizontalVariance = horizontal.profile;
  const verticalValVariance = vertical.profile;

  const focus =
    verticalZone === "MIDDLE" && horizontalZone === "MIDDLE"
      ? horizontalVariance === "FOCUSED" && verticalValVariance === "FOCUSED"
        ? 0
        : 1
      : 0;

  const result =
    FACE_BOARD_INFO.resultDict[verticalZone][horizontalZone][focus];

  const Title = () => {
    return (
      <>
        <S.BoardTitleContainer>
          <S.BoardTitleItemImg src={result.img} />
          <span>{result.label}</span>
        </S.BoardTitleContainer>

        <S.BoardTitleDescription>
          사분면을 토대로 취향을 분석했어요!
        </S.BoardTitleDescription>
      </>
    );
  };
  return (
    <>
      <Title />
      <EvaluationBoard
        type="RESULT"
        vertical={data.axis.VERTICAL}
        horizontal={data.axis.HORIZONTAL}
        preference={data.axis.PREFERENCE}
        itemList={data.itemList}
        boardInformation={FACE_BOARD_INFO}
      />
      <div style={{ width: "100%", height: "40px", flexShrink: 0 }} />
    </>
  );
};

export default Result;
