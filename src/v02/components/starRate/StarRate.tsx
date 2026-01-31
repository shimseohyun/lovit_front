import * as S from "./StarRate.styled";
type Parms = {
  num: number;
  onClickStar: (num: number) => void;
};

const StarRate = (parms: Parms) => {
  const { num, onClickStar } = parms;

  return (
    <S.Container>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div
          onClick={() => {
            onClickStar(i);
          }}
          key={i}
        >
          {i}
        </div>
      ))}
    </S.Container>
  );
};

export default StarRate;
