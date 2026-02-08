import {
  useBoardSlotContext,
  useBoardStaticContext,
  useBoardStepContext,
} from "./context/context";

import { getSlotCenterIDX } from "@utilsV02/getSlotIDX";
import getNewRoughData from "@utilsV02/getNewRoughData";

import { useNavigate } from "react-router-dom";
import { usePostUserBoardData } from "@hooksV02/api/userBoardData";
import { useAuth } from "@hooksV02/auth/useAuth";

const useBoardControl = () => {
  const { preference, vertical, horizontal, itemList } =
    useBoardStaticContext();
  const {
    evaluationGroup,
    getEvaluationGroup,
    evaluationSlot,
    preferenceSlot,
    setEvaluationSlot,
    resetSlot,
  } = useBoardSlotContext();
  const { currentItemID, navigateNextItemIDX, navigateStep, reset } =
    useBoardStepContext();

  const { user } = useAuth();
  const { mutateAsync } = usePostUserBoardData(user?.uid);

  const pushItem = async () => {
    if (
      preferenceSlot?.preference === undefined ||
      evaluationSlot === undefined ||
      evaluationGroup === undefined
    )
      return;

    const p = preferenceSlot.preference;
    let v = evaluationSlot.VERTICAL;
    let h = evaluationSlot.HORIZONTAL;

    if (v === undefined)
      v = vertical.slotByGroupDict[evaluationGroup.VERTICAL].startSlotIDX;

    if (h === undefined)
      h = horizontal.slotByGroupDict[evaluationGroup.HORIZONTAL].startSlotIDX;

    const itemID = currentItemID;

    const newV = getNewRoughData(itemID, v, vertical);
    const newH = getNewRoughData(itemID, h, horizontal);
    const newP = getNewRoughData(itemID, p, preference);

    const newItemList: number[] = itemList;
    newItemList.push(itemID);

    await mutateAsync({
      itemList: JSON.stringify(newItemList),
      axis: {
        HORIZONTAL: JSON.stringify(newH),
        VERTICAL: JSON.stringify(newV),
        PREFERENCE: JSON.stringify(newP),
      },
    });
  };

  // 평가 스와이프로 이동
  const navigateEvaluationSwipe = (v: number, h: number) => {
    const vIsFirst = vertical.slotByGroupDict[v].slotCount === 1;
    const hIsFirst = horizontal.slotByGroupDict[h].slotCount === 1;

    const vSlotIDX = getSlotCenterIDX(v, vertical.slotByGroupDict);
    const hSlotIDX = getSlotCenterIDX(h, horizontal.slotByGroupDict);

    getEvaluationGroup({ VERTICAL: v, HORIZONTAL: h });
    setEvaluationSlot({
      VERTICAL: vIsFirst ? undefined : vSlotIDX,
      HORIZONTAL: hIsFirst ? undefined : hSlotIDX,
    });

    if (vIsFirst && hIsFirst) {
      navigateStep("PREFERENCE");
    } else {
      navigateStep("EVALUATION_SWIPE");
    }
  };

  // 선호 스와이프로 이동
  const navigatePreferenceSwipe = () => {
    navigateStep("PREFERENCE");
  };

  const navigate = useNavigate();
  // 결과 페이지로 이동
  const navigateResult = () => {
    navigate("/result", { replace: true });
  };

  const navigateMore = () => {
    reset();
    navigateStep("EVALUATION_TOUCH");
  };

  // 현재 ITEM IDX 완료하기
  const confrimCurrentItem = async () => {
    try {
      await pushItem();
      resetSlot();
      navigateNextItemIDX();
    } catch (err) {
      console.log(err);
    }
  };

  const skipCurrentItem = () => {
    resetSlot();
    navigateNextItemIDX();
  };

  return {
    navigateEvaluationSwipe,
    navigatePreferenceSwipe,
    navigateResult,
    confrimCurrentItem,

    navigateMore,
    skipCurrentItem,
  };
};
export default useBoardControl;
