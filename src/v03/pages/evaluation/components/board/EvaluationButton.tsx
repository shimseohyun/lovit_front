import BottomButton from "@componentsV03/button/BottomButton";
import FillButton from "@componentsV03/button/FillButton";
import FullSpinner from "@componentsV03/spinner/Spinner";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useBoardStepContext } from "@hooksV03/board/context/context";
import useBoardControl from "@hooksV03/board/useBoardControl";

const ACTION_LABEL = "이렇게 할게요!";

const ActionButton = () => {
  const { isLoggedIn } = useAuth();
  const { isFin, isLast, currentStep } = useBoardStepContext();

  const {
    navigateEvaluationSwipeNext,
    navigatePreferenceSwipe,
    navigateResult,
    isPushingItem,
    confirmCurrentItem,
    navigateMore,
  } = useBoardControl();

  if (isFin) {
    return (
      <>
        {!isLast && isLoggedIn && (
          <FillButton
            buttonType="ASSISTIVE"
            onClick={navigateMore}
            type="button"
            children="더하기"
          />
        )}

        <FillButton
          buttonType="PRIMARY"
          type="button"
          onClick={navigateResult}
          children="결과보기"
        />
      </>
    );
  }

  // 진행 상태: step별 처리
  switch (currentStep) {
    case "EVALUATION_TOUCH":
      return null;

    case "EVALUATION_SWIPE_HORIZONTAL":
      return (
        <FillButton
          buttonType="ASSISTIVE"
          onClick={navigateEvaluationSwipeNext}
          children={ACTION_LABEL}
        />
      );

    case "EVALUATION_SWIPE_VERTICAL":
      return (
        <FillButton
          buttonType="ASSISTIVE"
          onClick={navigatePreferenceSwipe}
          children={ACTION_LABEL}
        />
      );

    case "PREFERENCE":
      return (
        <>
          {isPushingItem && <FullSpinner />}
          <FillButton
            buttonType="PRIMARY"
            onClick={confirmCurrentItem}
            disabled={isPushingItem}
            children={ACTION_LABEL}
          />
        </>
      );

    default:
      return null;
  }
};

const EvaluationButton = () => {
  const { currentStep } = useBoardStepContext();

  if (currentStep === "EVALUATION_TOUCH") return;

  return (
    <BottomButton>
      <ActionButton />
    </BottomButton>
  );
};

export default EvaluationButton;
