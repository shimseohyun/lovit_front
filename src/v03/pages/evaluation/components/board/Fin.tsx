import FinOnboarding from "@componentsV03/onboarding/FinOnboarding";

import * as Title from "@componentsV03/title/Title.styled";
import { useBoardStaticContext } from "@hooksV03/board/context/context";

const Fin = () => {
  const { itemList } = useBoardStaticContext();
  return (
    <>
      <Title.BoardTitleContainer>
        <h6>거의 다 왔어요!</h6>
        <h1>{`지금까지 ${itemList.length}명을 분석했어요!\n결과를 확인해볼까요?`}</h1>
      </Title.BoardTitleContainer>
      <FinOnboarding />
    </>
  );
};

export default Fin;
