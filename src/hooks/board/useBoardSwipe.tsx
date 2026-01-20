import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEventHandler } from "react";

import useSwipe, {
  type SwipeProgressPayload,
  type SwipeResult,
} from "../swipe/useSwipe";

import {
  useBoardActions,
  useBoardState,
  useBoardStatic,
} from "./context/BoardContext";
import type { Position, SwipeAxis } from "./type";

type Translate = { x: number; y: number };

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const useBoardSwipe = () => {
  const { config, rowMinSlot, rowMaxSlot, colMinSlot, colMaxSlot } =
    useBoardStatic();

  const { setSlot, setTitle } = useBoardActions();

  const { stepPx, minDistancePx, screenHeight, screenWidth } = config;

  const { slot } = useBoardState();
  const safeSlot: Position = slot ?? { r: 0, c: 0 };

  const getTranslateX = useCallback(
    (slotNum: number) => screenWidth / 2 - slotNum * stepPx,
    [screenWidth, stepPx],
  );

  const getTranslateY = useCallback(
    (slotNum: number) => screenHeight / 2 - slotNum * stepPx,
    [screenHeight, stepPx],
  );

  const [translate, setTranslate] = useState<Translate>(() => ({
    x: getTranslateX(safeSlot.c),
    y: getTranslateY(safeSlot.r),
  }));

  const [isAnimating, setIsAnimating] = useState(false);

  const startSlotRef = useRef<Position>(safeSlot);
  const liveSlotRef = useRef<Position>(safeSlot);
  const isDraggingRef = useRef(false);

  // 외부에서 slot이 바뀌는 경우(예: reset / setInitialSlot)
  // translate도 동기화해줌
  useEffect(() => {
    if (isDraggingRef.current) return;

    const next = slot ?? { r: 0, c: 0 };
    liveSlotRef.current = next;
    startSlotRef.current = next;

    setTranslate({ x: getTranslateX(next.c), y: getTranslateY(next.r) });
  }, [slot, getTranslateX, getTranslateY]);

  const getAxisRange = (axis: SwipeAxis) => {
    const isVertical = axis === "vertical";
    return isVertical
      ? { min: rowMinSlot, max: rowMaxSlot }
      : { min: colMinSlot, max: colMaxSlot };
  };

  const updateTranslate = (axis: SwipeAxis, value: number) => {
    setTranslate((prev) => ({
      x: axis === "vertical" ? prev.x : getTranslateX(value),
      y: axis === "vertical" ? getTranslateY(value) : prev.y,
    }));
  };

  const buildNextSlot = (axis: SwipeAxis, next: number): Position =>
    axis === "vertical"
      ? { c: liveSlotRef.current.c, r: next }
      : { c: next, r: liveSlotRef.current.r };

  const revertToStart = () => {
    const back = startSlotRef.current;
    liveSlotRef.current = back;
    setSlot(back);
    setTranslate({ x: getTranslateX(back.c), y: getTranslateY(back.r) });
  };

  const snapTo = (axis: SwipeAxis, target: number) => {
    const next = buildNextSlot(axis, target);
    liveSlotRef.current = next;
    setSlot(next);
    updateTranslate(axis, target);
  };

  const { bind } = useSwipe<HTMLDivElement>({
    minDistancePx,

    onProgress: ({ deltaX, deltaY, axis, direction }: SwipeProgressPayload) => {
      if (!isDraggingRef.current) return;

      setIsAnimating(false);

      // 락 되기 전(axis/direction === null)에는 slot/title 계산을 하지 않음
      if (!axis || !direction) return;

      const isVertical = axis === "vertical";
      const axisDelta = isVertical ? deltaY : deltaX;
      const start = isVertical
        ? startSlotRef.current.r
        : startSlotRef.current.c;

      const { min, max } = getAxisRange(axis);

      const raw = clamp(start - axisDelta / stepPx, min, max);
      const snapped = clamp(Math.round(raw), min, max);

      const next = buildNextSlot(axis, snapped);
      liveSlotRef.current = next;

      setTitle({ axis, direction, slotNum: snapped });
      setSlot(next);

      // 드래그 중(소수)도 자연스럽게 이동
      updateTranslate(axis, raw);
    },

    onEnd: ({ passed, axis, totalDx, totalDy }: SwipeResult) => {
      isDraggingRef.current = false;
      setIsAnimating(true);

      if (!passed) {
        revertToStart();
        return;
      }

      const isVertical = axis === "vertical";
      const total = isVertical ? totalDy : totalDx;
      const start = isVertical
        ? startSlotRef.current.r
        : startSlotRef.current.c;

      const { min, max } = getAxisRange(axis);

      const target = clamp(Math.round(start - total / stepPx), min, max);
      snapTo(axis, target);
    },
  });

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = true;
    startSlotRef.current = liveSlotRef.current;
    bind.onPointerDown(e);
  };

  const onTransitionEnd = () => setIsAnimating(false);

  return {
    bind,
    onPointerDown,
    onTransitionEnd,
    slot: safeSlot,
    translate,
    isAnimating,
  };
};

export default useBoardSwipe;
