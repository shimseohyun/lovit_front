import * as S from "@componentsV03/navigation/Navigateion.styled";
import { useBoardStepContext } from "@hooksV03/board/context/context";
import Progress from "./Progress";
import useBoardControl from "@hooksV03/board/useBoardControl";
import IconBox from "@componentsV03/icon/IconBox";

const EvaluationNavigation = () => {
  const { currentItemIDX, totalStepIDX, currentStep } = useBoardStepContext();
  const { navigateEvaluationTouch } = useBoardControl();
  return (
    <>
      <S.Container>
        <Progress totalCount={totalStepIDX} currentCount={currentItemIDX} />
        {currentStep !== "EVALUATION_TOUCH" && (
          <S.Content>
            <div>
              {(currentStep === "EVALUATION_SWIPE" ||
                currentStep === "PREFERENCE") && (
                <button onClick={navigateEvaluationTouch}>
                  <IconBox icon="left" />
                </button>
              )}
            </div>
            <div>
              {/* {currentStep === "EVALUATION_TOUCH" && (
              <button onClick={skipCurrentItem}>건너뛰기</button>
            )} */}
            </div>
          </S.Content>
        )}
      </S.Container>
    </>
  );
};

export default EvaluationNavigation;
