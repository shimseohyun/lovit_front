import * as S from "./Button.styled";

type Parms = {
  children?: React.ReactNode;
};

const BottomButton = (parms: Parms) => {
  const { children } = parms;
  return (
    <S.BottomButtonContainer>
      <S.BottomButtonGradient />
      {children}
    </S.BottomButtonContainer>
  );
};
export default BottomButton;
