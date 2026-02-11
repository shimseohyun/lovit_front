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
    navigatePreferenceSwipe,
    navigateResult,
    isPushingItem,
    confrimCurrentItem,
    navigateMore,
  } = useBoardControl();

  const onClickNavigatePreference = () => {
    navigatePreferenceSwipe();
  };

  const onClickNavigateNextIDX = () => {
    confrimCurrentItem();
  };

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
  return (
    <BottomButton>
      {isPushingItem && <FullSpinner />}
      {currentStep === "PREFERENCE" ? (
        <FillButton
          type="button"
          buttonType={"PRIMARY"}
          disabled={isPushingItem}
          onClick={onClickNavigateNextIDX}
        >
          이렇게 할게요!
        </FillButton>
      ) : (
        <>
          <FillButton
            type="button"
            buttonType={"ASSISTIVE"}
            onClick={onClickNavigatePreference}
          >
            이렇게 할게요!
          </FillButton>
        </>
      )}
    </BottomButton>
  );
};

export default EvaluationButton;
