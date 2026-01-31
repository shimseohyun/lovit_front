import { useCallback, useRef, useState } from "react";
import type { PointerEventHandler } from "react";
import type { AxisType } from "@interfacesV02/type";
import useSwipe, { type SwipeProgressPayload } from "@hooksV02/swipe/useSwipe";

type SwipeDirection = SwipeProgressPayload["direction"];
type DragInfo = {
  isDragging: boolean;
  axis: AxisType | null;
  direction: SwipeDirection;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

type SlotDict = Partial<Record<AxisType, number>>;

type Parms = {
  slotCount: number;
  stepPX: number;
  initialV?: number;
  initialH?: number;
  isHorizontal?: boolean;
  isVertical?: boolean;
};

const useBoardSwipe = (parms: Parms) => {
  const {
    slotCount,
    stepPX,
    initialV,
    initialH,
    isHorizontal = true,
    isVertical = true,
  } = parms;

  const [slot, setSlot] = useState<SlotDict>({
    VERTICAL: initialV,
    HORIZONTAL: initialH,
  });

  const safeSlot: SlotDict = slot;

  const isVerticalAxis = (axis: AxisType) => axis === "VERTICAL";

  // ✅ 추가: 축 허용 여부
  const isAxisEnabled = useCallback(
    (axis: AxisType) => (isVerticalAxis(axis) ? isVertical : isHorizontal),
    [isHorizontal, isVertical],
  );

  const getSlotValue = useCallback(
    (slot: SlotDict, axis: AxisType) => slot[axis],
    [],
  );

  const setSlotValue = useCallback(
    (slot: SlotDict, axis: AxisType, v: number) => {
      return { ...slot, [axis]: v };
    },
    [],
  );

  const [isAnimating, setIsAnimating] = useState(false);

  const startSlotRef = useRef<SlotDict>(safeSlot);
  const liveSlotRef = useRef<SlotDict>(safeSlot);
  const isDraggingRef = useRef(false);

  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    axis: null,
    direction: { VERTICAL: null, HORIZONTAL: null },
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
  const max = slotCount - 1;

  const commitSlot = useCallback((nextSlot: SlotDict) => {
    liveSlotRef.current = nextSlot;
    setSlot(nextSlot);
  }, []);

  const revertToStart = useCallback(() => {
    const back = startSlotRef.current;
    commitSlot(back);
  }, [commitSlot]);

  const snapTo = useCallback(
    (axis: AxisType, target: number) => {
      const next = setSlotValue(liveSlotRef.current, axis, target);
      commitSlot(next);
    },
    [commitSlot, setSlotValue],
  );

  const { bind, direction } = useSwipe<HTMLDivElement>({
    onProgress: ({ deltaX, deltaY, axis, direction }: SwipeProgressPayload) => {
      if (!isDraggingRef.current) return;
      if (!axis || !direction) return;

      // ✅ 추가: 막힌 축이면 아무 것도 안 하게
      if (!isAxisEnabled(axis)) return;

      setIsAnimating(false);
      setDragInfoSafe({ axis, direction });

      const axisDelta = isVerticalAxis(axis) ? deltaY : deltaX;
      const start = getSlotValue(startSlotRef.current, axis);
      if (start === undefined) return;

      const raw = clamp(start - axisDelta / stepPX, min, max);
      const snapped = clamp(Math.round(raw), min, max);

      const next = setSlotValue(liveSlotRef.current, axis, snapped);
      commitSlot(next);
    },

    onEnd: ({ passed, axis, totalDx, totalDy }) => {
      isDraggingRef.current = false;
      setIsAnimating(true);
      setDragInfoSafe({ isDragging: false, axis: null, direction: null });

      // ✅ 추가: 막힌 축이면 무조건 원복
      if (!axis || !isAxisEnabled(axis)) {
        revertToStart();
        return;
      }

      if (!passed) {
        revertToStart();
        return;
      }

      const total = isVerticalAxis(axis) ? totalDy : totalDx;
      const start = getSlotValue(startSlotRef.current, axis);
      if (start === undefined) return;

      const target = clamp(Math.round(start - total / stepPX), min, max);
      snapTo(axis, target);
    },
  });

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    // ✅ 추가: 둘 다 막혀있으면 스와이프 자체를 시작하지 않게
    if (!isHorizontal && !isVertical) return;

    isDraggingRef.current = true;
    startSlotRef.current = liveSlotRef.current;
    setDragInfoSafe({ isDragging: true, axis: null, direction: null });
    bind.onPointerDown(e);
  };

  const onTransitionEnd = () => setIsAnimating(false);

  return {
    slot,
    bind,
    onPointerDown,
    onTransitionEnd,

    isAnimating,
    isDragging: dragInfo.isDragging,
    dragAxis: dragInfo.axis,
    dragDirection: direction,
  };
};

export default useBoardSwipe;
