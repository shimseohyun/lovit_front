import * as S from "@componentsV02/navigation/Navigateion.styled";
import { useBoardStepContext } from "@hooksV02/board/context/context";
import Progress from "./Progress";
import useBoardControl from "@hooksV02/board/useBoardControl";

const EvaluationNavigation = () => {
  const { currentItemIDX, totalStepIDX, currentStep } = useBoardStepContext();
  const { skipCurrentItem, navigateEvaluationTouch } = useBoardControl();
  return (
    <>
      <S.Container>
        <Progress totalCount={totalStepIDX} currentCount={currentItemIDX} />
        <S.Content>
          <div>
            {(currentStep === "EVALUATION_SWIPE" ||
              currentStep === "PREFERENCE") && (
              <button onClick={navigateEvaluationTouch}>뒤로가기</button>
            )}
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
