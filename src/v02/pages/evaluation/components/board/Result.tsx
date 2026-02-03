import * as S from "./Board.styled";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV02/board/useGetBoardResult";
import { useBoardStaticContext } from "@hooksV02/board/context/context";

const Result = () => {
  const { boardInformation } = useBoardStaticContext();
  const { horizontalResult, verticalResult } = useGetBoardResult();

  const horizontalLabel = horizontalResult === "MIDDLE" ? undefined : "결과";

  const vericalLabel = verticalResult === "MIDDLE" ? undefined : "결과";

  const Title = () => {
    return (
      <>
        <S.BoardTitleContainer>
          <S.BoardTitleItemImg
            src={`/assets/result/face2/${verticalResult}_${horizontalResult}.png`}
          />
          <span>
            {vericalLabel || horizontalLabel ? (
              <>
                {horizontalLabel} {vericalLabel} 콜렉터
              </>
            ) : (
              <>{boardInformation.neutralLabel[0]}</>
            )}
          </span>
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
