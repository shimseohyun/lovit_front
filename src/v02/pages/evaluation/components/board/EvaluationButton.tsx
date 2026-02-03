import BottomButton from "@componentsV02/button/BottomButton";
import FillButton from "@componentsV02/button/FillButton";
import { useBoardStepContext } from "@hooksV02/board/context/context";
import useBoardControl from "@hooksV02/board/useBoardControl";

const EvaluationButton = () => {
  const { isFin, currentStep } = useBoardStepContext();
  const { navigatePreferenceSwipe, confrimCurrentItem } = useBoardControl();

  const onClickNavigatePreference = () => {
    navigatePreferenceSwipe();
  };

  const onClickNavigateNextIDX = () => {
    confrimCurrentItem();
  };

  if (isFin) {
    return (
      <BottomButton>
        <FillButton type="button">끝~</FillButton>
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
          onClick={onClickNavigateNextIDX}
        >
          확인
        </FillButton>
      ) : (
        <FillButton
          type="button"
          buttonType={"ASSISTIVE"}
          onClick={onClickNavigatePreference}
        >
          다음
        </FillButton>
      )}
    </BottomButton>
  );
};

export default EvaluationButton;
