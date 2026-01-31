import * as S from "../Board.styled";

import EvaluationBoard from "./EvaluationBoard";

const TouchEvaluationBoard = () => {
  return (
    <>
      <S.BoardTitleContainer>
        <S.BoardTitleItemSection>
          <h6>레드벨벳</h6>
          <h3>아이린</h3>
        </S.BoardTitleItemSection>
        <S.BoardTitleItemImg src="https://i.namu.wiki/i/Y0AprJSJHurYSVlIueY3PpdYBbtqOP0SbBtKsc8avq-zkQwaCgBhurU5PnJu1pgBmXncxpLK7G5ktUpMHmovj9wS7MA7r7JFsPDY0l92CNQIiAKrJwzKXHS_Q07ZUDZm8AZXaU93lXTLt1jdYTB7Pg.webp" />
      </S.BoardTitleContainer>

      <S.BoardTitleDescription>
        어디에 속하는지 사분면에서 선택해주세요!
      </S.BoardTitleDescription>

      <EvaluationBoard />
    </>
  );
};

export default TouchEvaluationBoard;
