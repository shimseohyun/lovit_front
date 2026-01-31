import { useCallback, useRef, useState } from "react";
import type { PointerEventHandler } from "react";

import type { AxisType, EvaluationSlot } from "@interfacesV02/type";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import useSwipe, { type SwipeProgressPayload } from "@hooksV02/swipe/useSwipe";

type Translate = { x: number; y: number };

type SwipeDirection = SwipeProgressPayload["direction"];
type DragInfo = {
  isDragging: boolean;
  axis: AxisType | null;
  direction: SwipeDirection | null;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const useBoardSwipe = () => {
  const { boardSize, stepPX, vertical, evaluationSlot, setEvaluationSlot } =
    useBoardDataContext();

  const slotCount = vertical.slotList.length - 1;

  const safeSlot: EvaluationSlot = evaluationSlot ?? {
    horizontal: 0,
    vertical: 0,
  };

  const isVerticalAxis = (axis: AxisType) => axis === "VERTICAL";

  const getSlotValue = useCallback(
    (slot: EvaluationSlot, axis: AxisType) =>
      isVerticalAxis(axis) ? slot.vertical : slot.horizontal,
    [],
  );

  const setSlotValue = useCallback(
    (slot: EvaluationSlot, axis: AxisType, v: number) => {
      return isVerticalAxis(axis)
        ? { ...slot, vertical: v }
        : { ...slot, horizontal: v };
    },
    [],
  );

  const getTranslate = useCallback(
    (slotNum: number) => {
      return boardSize / 2 + (slotCount / 2 - slotNum) * stepPX;
    },
    [boardSize, stepPX],
  );

  const toTranslate = useCallback(
    (slot: EvaluationSlot): Translate => ({
      x: getTranslate(slot.horizontal),
      y: getTranslate(slot.vertical),
    }),
    [getTranslate],
  );

  const updateTranslateByAxis = useCallback(
    (axis: AxisType, raw: number) => {
      setTranslate((prev) =>
        isVerticalAxis(axis)
          ? { ...prev, y: getTranslate(raw) }
          : { ...prev, x: getTranslate(raw) },
      );
    },
    [getTranslate],
  );

  const [translate, setTranslate] = useState<Translate>(() =>
    toTranslate(safeSlot),
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const startSlotRef = useRef<EvaluationSlot>(safeSlot);
  const liveSlotRef = useRef<EvaluationSlot>(safeSlot);
  const isDraggingRef = useRef(false);

  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    axis: null,
    direction: null,
  });

  const setDragInfoSafe = useCallback((patch: Partial<DragInfo>) => {
    setDragInfo((prev) => {
      const next = { ...prev, ...patch };
      return next.isDragging === prev.isDragging &&
        next.axis === prev.axis &&
        next.direction === prev.direction
        ? prev
        : next;
    });
  }, []);

  const min = 0;
  const max = slotCount;

  const commitSlot = useCallback(
    (nextSlot: EvaluationSlot) => {
      liveSlotRef.current = nextSlot;
      setEvaluationSlot(nextSlot);
    },
    [setEvaluationSlot],
  );

  const revertToStart = useCallback(() => {
    const back = startSlotRef.current;
    commitSlot(back);
    setTranslate(toTranslate(back));
  }, [commitSlot, toTranslate]);

  const snapTo = useCallback(
    (axis: AxisType, target: number) => {
      const next = setSlotValue(liveSlotRef.current, axis, target);
      commitSlot(next);
      setTranslate(toTranslate(next));
    },
    [commitSlot, setSlotValue, toTranslate],
  );

  const { bind } = useSwipe<HTMLDivElement>({
    onProgress: ({ deltaX, deltaY, axis, direction }: SwipeProgressPayload) => {
      if (!isDraggingRef.current) return;

      setIsAnimating(false);

      if (!axis || !direction) return;
      setDragInfoSafe({ axis, direction });

      const axisDelta = isVerticalAxis(axis) ? deltaY : deltaX;
      const start = getSlotValue(startSlotRef.current, axis);

      const raw = clamp(start - axisDelta / stepPX, min, max);
      const snapped = clamp(Math.round(raw), min, max);

      const next = setSlotValue(liveSlotRef.current, axis, snapped);
      commitSlot(next);

      updateTranslateByAxis(axis, raw);
    },

    onEnd: ({ passed, axis, totalDx, totalDy }) => {
      isDraggingRef.current = false;
      setIsAnimating(true);
      setDragInfoSafe({ isDragging: false, axis: null, direction: null });

      if (!passed || !axis) {
        revertToStart();
        return;
      }

      const total = isVerticalAxis(axis) ? totalDy : totalDx;
      const start = getSlotValue(startSlotRef.current, axis);

      const target = clamp(Math.round(start - total / stepPX), min, max);
      snapTo(axis, target);
    },
  });

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = true;
    startSlotRef.current = liveSlotRef.current;
    setDragInfoSafe({ isDragging: true, axis: null, direction: null });
    bind.onPointerDown(e);
  };

  const onTransitionEnd = () => setIsAnimating(false);

  return {
    evaluationSlot,
    bind,
    onPointerDown,
    onTransitionEnd,
    slot: safeSlot,
    translate,
    isAnimating,

    isDragging: dragInfo.isDragging,
    dragAxis: dragInfo.axis,
    dragDirection: dragInfo.direction,
  };
};

export default useBoardSwipe;
