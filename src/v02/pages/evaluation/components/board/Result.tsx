import * as S from "./Board.styled";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV02/board/useGetBoardResult";
import { useBoardStaticContext } from "@hooksV02/board/context/context";

const Result = () => {
  const { boardInformation } = useBoardStaticContext();

  const { horizontal, vertical } = useGetBoardResult();
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
    boardInformation.resultDict[verticalZone][horizontalZone][focus];

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
      <EvaluationBoard type="RESULT" />
      <div style={{ width: "100%", height: "40px", flexShrink: 0 }} />
    </>
  );
};

export default Result;
