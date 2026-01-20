import { useCallback, useRef, useState } from "react";
import useSwipe from "../swipe/useSwipe";
import { useBoardActions, useBoardState, useBoardStatic } from "./BoardContext";
import type { Position } from "./type";

type Axis = "vertical" | "horizontal";
type Translate = { x: number; y: number };

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const useBoardSwipe = () => {
  const { config, minSlot, maxSlot } = useBoardStatic();
  const { setSlot, setTitle } = useBoardActions();
  const { stepPx, minDistancePx, screenHeight, screenWidth } = config;
  const { slot = { r: 0, c: 0 } } = useBoardState();

  const getTranslateX = useCallback(
    (slotNum: number) => screenWidth / 2 - slotNum * stepPx,
    [screenWidth, stepPx],
  );

  const getTranslateY = useCallback(
    (slotNum: number) => screenHeight / 2 - slotNum * stepPx,
    [screenHeight, stepPx],
  );

  const [translate, setTranslate] = useState<Translate>({
    x: getTranslateX(slot.c),
    y: getTranslateY(slot.r),
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const startSlotRef = useRef<Position>(slot);
  const liveSlotRef = useRef<Position>(slot);
  const isDraggingRef = useRef(false);

  const updateTranslate = (axis: Axis, value: number) => {
    setTranslate((prev) => ({
      x: axis === "vertical" ? prev.x : getTranslateX(value),
      y: axis === "vertical" ? getTranslateY(value) : prev.y,
    }));
  };

  const buildNextSlot = (axis: Axis, next: number): Position =>
    axis === "vertical"
      ? { c: liveSlotRef.current.c, r: next }
      : { c: next, r: liveSlotRef.current.r };

  const revertToStart = () => {
    const back = startSlotRef.current;
    liveSlotRef.current = back;
    setSlot(back);
    setTranslate({ x: getTranslateX(back.c), y: getTranslateY(back.r) });
  };

  const snapTo = (axis: Axis, target: number) => {
    const next = buildNextSlot(axis, target);
    liveSlotRef.current = next;
    setSlot(next);
    updateTranslate(axis, target); // ✅ 중복 제거
  };

  const { bind } = useSwipe({
    minDistancePx,

    onProgress: ({ deltaX, deltaY, axis, direction }: any) => {
      if (!isDraggingRef.current) return;

      setIsAnimating(false);

      const isVertical = axis === "vertical";
      const axisDelta = isVertical ? deltaY : deltaX;
      const start = isVertical
        ? startSlotRef.current.r
        : startSlotRef.current.c;

      const raw = clamp(start - axisDelta / stepPx, minSlot, maxSlot);
      const snapped = clamp(Math.round(raw), minSlot, maxSlot);

      const next = buildNextSlot(axis, snapped);
      liveSlotRef.current = next;
      setTitle({
        axis: axis,
        direction: direction,
        slotNum: snapped,
      });

      setSlot(next);
      updateTranslate(axis, raw); // ✅ 드래그 중(소수)도 동일 함수
    },

    onEnd: ({ passed, axis, totalDx, totalDy }: any) => {
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

      const target = clamp(
        Math.round(start - total / stepPx),
        minSlot,
        maxSlot,
      );
      snapTo(axis, target);
    },
  }) as any;

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = true;
    startSlotRef.current = liveSlotRef.current;
    bind.onPointerDown(e);
  };

  const onTransitionEnd = () => setIsAnimating(false);

  return { bind, onPointerDown, onTransitionEnd, slot, translate, isAnimating };
};

export default useBoardSwipe;
