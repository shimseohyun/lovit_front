import BottomButton from "@componentsV03/button/BottomButton";
import FillButton from "@componentsV03/button/FillButton";
import FullSpinner from "@componentsV03/spinner/Spinner";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useBoardStepContext } from "@hooksV03/board/context/context";
import useBoardControl from "@hooksV03/board/useBoardControl";

const EvaluationButton = () => {
  const { isLoggedIn } = useAuth();
  const { isFin, isLast, currentStep } = useBoardStepContext();
  const {
    navigateEvaluationSwipeNext,
    navigatePreferenceSwipe,

    navigateResult,
    isPushingItem,
    confrimCurrentItem,
    navigateMore,
  } = useBoardControl();

  if (isFin) {
    return (
      <BottomButton>
        {!isLast && isLoggedIn && (
          <FillButton
            buttonType={"ASSISTIVE"}
            onClick={navigateMore}
            type="button"
          >
            더하기
          </FillButton>
        )}

        <FillButton buttonType="PRIMARY" type="button" onClick={navigateResult}>
          결과보기
        </FillButton>
      </BottomButton>
    );
  }

  if (currentStep === "EVALUATION_TOUCH") return;

  if (currentStep === "EVALUATION_SWIPE_VERTICAL")
    return (
      <BottomButton>
        <FillButton
          type="button"
          buttonType={"ASSISTIVE"}
          onClick={navigatePreferenceSwipe}
        >
          이렇게 할게요!
        </FillButton>
      </BottomButton>
    );

  if (currentStep === "EVALUATION_SWIPE_HORIZONTAL")
    return (
      <BottomButton>
        <FillButton
          type="button"
          buttonType={"ASSISTIVE"}
          onClick={navigateEvaluationSwipeNext}
        >
          이렇게 할게요!
        </FillButton>
      </BottomButton>
    );

  if (currentStep === "PREFERENCE")
    return (
      <BottomButton>
        {isPushingItem && <FullSpinner />}
        <FillButton
          type="button"
          buttonType={"PRIMARY"}
          disabled={isPushingItem}
          onClick={confrimCurrentItem}
        >
          이렇게 할게요!
        </FillButton>
      </BottomButton>
    );
};

export default EvaluationButton;
