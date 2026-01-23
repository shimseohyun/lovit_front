import Board from "@components/board/Board";

import * as S from "./MapPage.styled";
import Navigation from "@components/navigation/Navigation";

const MainPage = () => {
  return (
    <S.MainPageContainer>
      <Navigation />
      <Board />
    </S.MainPageContainer>
  );
};

export default MainPage;
