import type {
  BoardAxisDict,
  SlotCount,
  SlotDict,
  AxisType,
} from "@interfacesV03/type";
import { useBoardStaticContext } from "@hooksV03/board/context/context";
import useSwipeBoardControl from "./useSwipeBoardControl";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type Parms = {
  slot: SlotDict;
  getSlot: (s: SlotDict) => void;
  dataDict: BoardAxisDict;
};

const ONBOARDING_FOCUS_MS = 700; // 축 포커스 유지 시간
const ONBOARDING_GAP_MS = 150; // 축 전환 사이 간격

const useSwipeBoard = (parms: Parms) => {
  const { slot, getSlot, dataDict } = parms;
  const { stepPX } = useBoardStaticContext();

  // ✅ dataDict가 바뀌면 반영되게 deps 포함(또는 그냥 dataDict.HORIZONTAL 바로 써도 됨)
  const horizontal = useMemo(() => dataDict.HORIZONTAL, [dataDict]);
  const vertical = useMemo(() => dataDict.VERTICAL, [dataDict]);

  const isHorizontal = horizontal !== undefined;
  const isVertical = vertical !== undefined;

  const isSolo = !(isHorizontal && isVertical);

  const slotCount: SlotCount = {
    HORIZONTAL: isHorizontal ? horizontal.endIDX - horizontal.startIDX + 1 : 0,
    VERTICAL: isVertical ? vertical.endIDX - vertical.startIDX + 1 : 0,
  };

  const {
    onPointerDown,
    onTransitionEnd,
    bind,
    dragAxis: controlDragAxis,
    dragDirection,
  } = useSwipeBoardControl({
    min: {
      HORIZONTAL: isHorizontal ? horizontal.startIDX : 0,
      VERTICAL: isVertical ? vertical.startIDX : 0,
    },
    max: {
      HORIZONTAL: isHorizontal ? horizontal.endIDX : 0,
      VERTICAL: isVertical ? vertical.endIDX : 0,
    },
    slot,
    getSlot,
    stepPX,
    isHorizontal,
    isVertical,
  });

  const [onboardingAxis, setOnboardingAxis] = useState<AxisType | null>(null);
  const timersRef = useRef<number[]>([]);

  const stopOnboarding = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    setOnboardingAxis(null);
  }, []);

  // 1) 온보딩 시퀀스 시작/재시작
  useEffect(() => {
    stopOnboarding();

    // 요청 조건: isSolo가 아닐 때(= H/V 둘 다 있을 때)만
    if (isSolo) return;

    // Vertical -> Horizontal 순서 고정
    const order: AxisType[] = ["VERTICAL", "HORIZONTAL"];

    let t = 0;

    // 바로 V 포커스 주고 싶으면 t=0,
    // 약간 텀을 주고 싶으면 t=100 같은 값으로 시작해도 됨
    order.forEach((axis) => {
      const id = window.setTimeout(() => setOnboardingAxis(axis), t);
      timersRef.current.push(id);
      t += ONBOARDING_FOCUS_MS + ONBOARDING_GAP_MS;
    });

    // 마지막: 포커스 해제(null)
    const endID = window.setTimeout(() => setOnboardingAxis(null), t);
    timersRef.current.push(endID);

    return stopOnboarding;
  }, [isSolo, stopOnboarding]);

  // 2) 사용자가 실제 드래그를 시작하면 온보딩 중단
  useEffect(() => {
    if (controlDragAxis !== null) stopOnboarding();
  }, [controlDragAxis, stopOnboarding]);

  // ✅ UI에 보여줄 "포커스 축" = (실제 드래그 중이면 그 축) 아니면 (온보딩 축)
  const focusAxis: AxisType | null = controlDragAxis ?? onboardingAxis;

  const swipeBoardProps = {
    stepPX,
    slotCount,
    dataDict,
    slot,
    isSolo,
    dragAxis: focusAxis, // ✅ 여기서 UI 포커스 축을 내려줌
    dragDirection: dragDirection,
    bind,
    onPointerDown,
    onTransitionEnd,
  };

  return {
    dragAxis: focusAxis, // ✅ 기존 dragAxis 사용처가 "포커스" 용도라면 이걸로 충분
    rawDragAxis: controlDragAxis, // ✅ 필요하면 실제 드래그 축도 따로 제공
    dragDirection,
    swipeBoardProps,
  };
};

export default useSwipeBoard;
