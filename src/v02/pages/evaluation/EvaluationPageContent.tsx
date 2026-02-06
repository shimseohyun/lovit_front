import * as S from "./EvaluationPage.styld";

import EvaluationButton from "./components/board/EvaluationButton";
import { useBoardStaticContext } from "@hooksV02/board/context/context";
import Board from "./components/board/Board";
import Navigation from "@componentsV02/navigation/Navigation";

const EvaluationPageContent = () => {
  const { isLoading } = useBoardStaticContext();

  if (isLoading === undefined) return <div>로딩중</div>;

  // 로딩 완료
  return (
    <>
      <S.Container>
        <Navigation />
        <S.ViewPort>
          <Board />
        </S.ViewPort>

        <EvaluationButton />
      </S.Container>
    </>
  );
};

export default EvaluationPageContent;
