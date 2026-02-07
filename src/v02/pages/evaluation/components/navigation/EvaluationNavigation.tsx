import * as S from "@componentsV02/navigation/Navigateion.styled";
import { useBoardStepContext } from "@hooksV02/board/context/context";
import Progress from "./Progress";
import useBoardControl from "@hooksV02/board/useBoardControl";

const EvaluationNavigation = () => {
  const { currentItemIDX, currentItem, totalStepIDX, currentStep } =
    useBoardStepContext();
  const { skipCurrentItem } = useBoardControl();
  return (
    <>
      <S.Container>
        <Progress totalCount={totalStepIDX} currentCount={currentItemIDX} />
        <S.Content>
          <div>
            {(currentStep === "EVALUATION_SWIPE" ||
              currentStep === "PREFERENCE") &&
              currentItem && <span>{currentItem.name}</span>}
          </div>
          <div>
            {currentStep === "EVALUATION_TOUCH" && (
              <button onClick={skipCurrentItem}>건너뛰기</button>
            )}
          </div>
        </S.Content>
      </S.Container>
    </>
  );
};

export default EvaluationNavigation;
