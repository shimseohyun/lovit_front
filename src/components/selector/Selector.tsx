import {
  useBoardState,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";
import * as S from "./Selector.styled";
import SelectorItem from "./components/SelectorItem";
import BottomButton from "@components/button/BottomButton";
import FillButton from "@components/button/FillButton";

const Selector = () => {
  const { summaryData } = useBoardStatic();
  const { likeList } = useBoardState();
  const likeCount = likeList.length;
  const isNextAble = likeCount > 0 && likeCount < 3;
  return (
    <>
      <S.TitleContainer>
        <S.TitleLabel>
          거의 다 왔어요!
          <br />
          마음에 드는 사람을 선택해주세요!
        </S.TitleLabel>
        <S.TitleSubLabel>최대 3명까지 선택할 수 있어요.</S.TitleSubLabel>
      </S.TitleContainer>

      <S.ScollContainer>
        <S.Scroll>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
            <SelectorItem key={i} info={summaryData[i]} />
          ))}
        </S.Scroll>
      </S.ScollContainer>

      <BottomButton>
        <FillButton disabled={!isNextAble}> {likeCount}/3 확인</FillButton>
      </BottomButton>
    </>
  );
};

export default Selector;
