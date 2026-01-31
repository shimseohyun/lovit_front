import * as S from "./StarRate.styled";
type Parms = {
  num: number;
  onClickStar: (num: number) => void;
};

const StarRate = (parms: Parms) => {
  const { num, onClickStar } = parms;

  return (
    <S.Container
      onClick={() => {
        onClickStar(num);
      }}
    >
      별점
    </S.Container>
  );
};

export default StarRate;
