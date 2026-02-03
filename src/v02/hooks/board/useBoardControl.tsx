import pushItemToAxis from "@utilsV02/pushItemToAxis";
import {
  useBoardSlotContext,
  useBoardStaticContext,
  useBoardStepContext,
} from "./context/context";

const useBoardControl = () => {
  const { preference, vertical, horizontal } = useBoardStaticContext();
  const { evaluationSlot, preferenceSlot, setEvaluationSlot, resetSlot } =
    useBoardSlotContext();
  const { currentItemID, setIsFinTrue, navigateNextItemIDX, navigateStep } =
    useBoardStepContext();

  const pushItem = () => {
    if (
      preferenceSlot?.preference === undefined ||
      evaluationSlot === undefined
    )
      return;

    const p = preferenceSlot.preference;
    const v = evaluationSlot.VERTICAL;
    const h = evaluationSlot.HORIZONTAL;

    const itemID = currentItemID;

    pushItemToAxis(itemID, p, "PREFERENCE", preference);
    pushItemToAxis(itemID, v, "VERTICAL", vertical);
    pushItemToAxis(itemID, h, "HORIZONTAL", horizontal);
  };

  // 평가 스와이프로 이동
  const navigateEvaluationSwipe = (v: number, h: number) => {
    navigateStep("EVALUATION_SWIPE");
    setEvaluationSlot({ VERTICAL: v, HORIZONTAL: h });
  };

  // 선호 스와이프로 이동
  const navigatePreferenceSwipe = () => {
    navigateStep("PREFERENCE");
  };

  // 현재 ITEM IDX 완료하기
  const confrimCurrentItem = () => {
    pushItem();
    resetSlot();
    navigateNextItemIDX();
  };

  const navigateResult = () => {
    resetSlot();
    setIsFinTrue();
  };

  const skipCurrentItem = () => {
    resetSlot();
    navigateNextItemIDX();
  };

  return {
    navigateEvaluationSwipe,
    navigatePreferenceSwipe,
    confrimCurrentItem,
    navigateResult,
    skipCurrentItem,
  };
};
export default useBoardControl;
