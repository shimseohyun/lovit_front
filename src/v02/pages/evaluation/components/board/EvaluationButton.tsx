import BottomButton from "@componentsV02/button/BottomButton";
import FillButton from "@componentsV02/button/FillButton";
import {
  useBoardSlotContext,
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/data/context/context";

const EvaluationButton = () => {
  const { pushItem } = useBoardStaticContext();
  const { currentStep, confrimCurrentStep, navigatePreference } =
    useBoardStepContext();
  const { resetSlot } = useBoardSlotContext();

  const onClickNavigatePreference = () => {
    navigatePreference();
  };

  const onClickNavigateNextStep = () => {
    pushItem();
    resetSlot();
    confrimCurrentStep();
  };

  if (currentStep === "EVALUATION_TOUCH") return;
  return (
    <BottomButton>
      {currentStep === "PREFERENCE" ? (
        <FillButton
          type="button"
          buttonType={"PRIMARY"}
          onClick={onClickNavigateNextStep}
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
