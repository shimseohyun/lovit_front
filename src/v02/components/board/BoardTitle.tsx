import * as S from "./Board.styled";
type Parms = {
  children?: React.ReactNode;
};

const BoardTitle = (parms: Parms) => {
  const { children } = parms;
  return (
    <>
      <S.BoardTitleContainer>{children}</S.BoardTitleContainer>
    </>
  );
};

export default BoardTitle;
