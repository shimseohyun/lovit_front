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

// ✅ 추가: 드래그 정보 타입
type SwipeDirection = SwipeProgressPayload["direction"];
type DragInfo = {
  isDragging: boolean;
  axis: SwipeAxis | null;
  direction: SwipeDirection | null;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const useBoardSwipe = () => {
  const { config, rowData /*, colData */ } = useBoardStatic();
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

  // ✅ 추가: 드래그 상태를 리턴하기 위한 state
  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    axis: null,
    direction: null,
  });

  // ✅ 추가: 값이 바뀔 때만 setState
  const setDragInfoSafe = useCallback((patch: Partial<DragInfo>) => {
    setDragInfo((prev) => {
      const next = { ...prev, ...patch };
      if (
        next.isDragging === prev.isDragging &&
        next.axis === prev.axis &&
        next.direction === prev.direction
      ) {
        return prev;
      }
      return next;
    });
  }, []);

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
      ? { min: 0, max: rowData.length }
      : { min: 0, max: rowData.length }; // ⚠️ 가로면 colData.length여야 할 가능성 큼
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

      // ✅ 축/방향이 정해졌을 때만 dragInfo 업데이트 (그리고 변경시에만 리렌더)
      if (axis && direction) {
        setDragInfoSafe({ axis, direction });
      } else {
        return;
      }

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

      updateTranslate(axis, raw);
    },

    onEnd: ({ passed, axis, totalDx, totalDy }: SwipeResult) => {
      isDraggingRef.current = false;
      setIsAnimating(true);

      // ✅ 종료 시 dragInfo 초기화
      setDragInfoSafe({ isDragging: false, axis: null, direction: null });

      if (!passed || !axis) {
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

    // ✅ 시작 시 dragInfo 세팅 (축/방향은 아직 모름)
    setDragInfoSafe({ isDragging: true, axis: null, direction: null });

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

    // ✅ 원하는 값 리턴
    isDragging: dragInfo.isDragging,
    dragAxis: dragInfo.axis,
    dragDirection: dragInfo.direction,
  };
};

export default useBoardSwipe;
