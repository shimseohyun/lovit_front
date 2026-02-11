import {
  useBoardState,
  useBoardStatic,
} from "@hooksV01/board/context/BoardContext";
import * as S from "./Selector.styled";
import SelectorItem from "./components/SelectorItem";
import BottomButton from "@componentsV01/button/BottomButton";
import FillButton from "@componentsV01/button/FillButton";
import type { Step } from "@hooksV01/board/type";

type Parms = {
  getStep: (s: Step) => void;
};

const Selector = (parms: Parms) => {
  const { getStep } = parms;
  const { summaryData } = useBoardStatic();
  const { likeList } = useBoardState();
  const likeCount = likeList.length;
  const isNextAble = likeCount > 0 && likeCount <= 3;
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
            <SelectorItem key={i} info={summaryData[i]} />
          ))}
        </S.Scroll>
      </S.ScollContainer>

      <BottomButton>
        <FillButton
          disabled={!isNextAble}
          onClick={() => {
            getStep("RESULT");
          }}
        >
          <span>
            {likeList.length === 0
              ? "1명 이상 선택해주세요"
              : likeList.length > 3
                ? "3명까지 선택할 수 있어요"
                : "이렇게 할게요!"}
          </span>
          <span>{likeCount}/3</span>
        </FillButton>
      </BottomButton>
    </>
  );
};

export default Selector;
