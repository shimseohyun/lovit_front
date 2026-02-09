import BottomButton from "@componentsV02/button/BottomButton";
import FillButton from "@componentsV02/button/FillButton";
import { useBoardStepContext } from "@hooksV02/board/context/context";
import useBoardControl from "@hooksV02/board/useBoardControl";

const EvaluationButton = () => {
  const { isFin, isLast, currentStep, currentItem } = useBoardStepContext();
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
        {!isLast && (
          <FillButton
            buttonType={"ASSISTIVE"}
            onClick={navigateMore}
            type="button"
          >
            더하기
          </FillButton>
        )}
        <FillButton type="button" onClick={navigateResult}>
          결과보기
        </FillButton>
      </BottomButton>
    );
  }

  if (currentStep === "EVALUATION_TOUCH") return;
  return (
    <BottomButton>
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
