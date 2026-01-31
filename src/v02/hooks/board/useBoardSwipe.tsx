import useSwipe from "@hooksV02/swipe/useSwipe";
import type { AxisType, SlotDict } from "@interfacesV02/type";
import { useCallback, useRef, useState } from "react";
import type { PointerEventHandler } from "react";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

type Params = {
  slotCount: number;
  stepPX: number;

  initialH?: number;
  initialV?: number;

  isHorizontal?: boolean;
  isVertical?: boolean;

  minDistancePx?: number;
  lockDirectionPx?: number;

  draggingMode?: "down" | "lock";
};

const getSlotValue = (slot: SlotDict, axis: AxisType) => slot[axis];

const setSlotValue = (
  slot: SlotDict,
  axis: AxisType,
  value: number,
): SlotDict => ({ ...slot, [axis]: value });

const axisMin = 0;
const axisMax = (slotCount: number) => Math.max(0, slotCount - 1);

const useBoardSwipe = (params: Params) => {
  const {
    slotCount,
    stepPX,
    initialH,
    initialV,
    isHorizontal = true,
    isVertical = true,
    minDistancePx = 10,
    lockDirectionPx = 10,
    draggingMode = "down",
  } = params;

  const max = axisMax(slotCount);

  const [slot, setSlot] = useState<SlotDict>(() => ({
    HORIZONTAL: initialH,
    VERTICAL: initialV,
  }));

  const [isAnimating, setIsAnimating] = useState(false);

  const startSlotRef = useRef<SlotDict>(slot);
  const liveSlotRef = useRef<SlotDict>(slot);

  const commitSlot = useCallback((next: SlotDict) => {
    liveSlotRef.current = next;
    setSlot(next);
  }, []);

  const isAxisEnabled = useCallback(
    (axis: AxisType) => {
      if (axis === "HORIZONTAL") return isHorizontal;
      return isVertical;
    },
    [isHorizontal, isVertical],
  );

  const revertToStart = useCallback(() => {
    setIsAnimating(true);
    commitSlot(startSlotRef.current);
  }, [commitSlot]);

  const snapTo = useCallback(
    (axis: AxisType, target: number) => {
      setIsAnimating(true);
      const next = setSlotValue(liveSlotRef.current, axis, target);
      commitSlot(next);
    },
    [commitSlot],
  );

  const { bind, isDragging, dragAxis, direction } = useSwipe<HTMLDivElement>({
    minDistancePx,
    lockDirectionPx,
    draggingMode,

    onProgress: ({ deltaX, deltaY, axis }) => {
      if (!axis) return;
      if (!isAxisEnabled(axis)) return;

      setIsAnimating(false);

      const axisDelta = axis === "HORIZONTAL" ? deltaX : deltaY;
      const start = getSlotValue(startSlotRef.current, axis);
      if (start === undefined) return;

      const raw = start - axisDelta / stepPX;
      const snapped = clamp(Math.round(raw), axisMin, max);

      const next = setSlotValue(liveSlotRef.current, axis, snapped);
      commitSlot(next);
    },

    onEnd: ({ passed, axis, totalDx, totalDy }) => {
      if (!isAxisEnabled(axis)) {
        revertToStart();
        return;
      }

      if (!passed) {
        revertToStart();
        return;
      }

      const total = axis === "HORIZONTAL" ? totalDx : totalDy;
      const start = getSlotValue(startSlotRef.current, axis);
      if (start === undefined) return;

      const raw = start - total / stepPX;
      const target = clamp(Math.round(raw), axisMin, max);

      snapTo(axis, target);
    },
  });

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    startSlotRef.current = liveSlotRef.current;
    setIsAnimating(false);
    bind.onPointerDown(e);
  };

  const onTransitionEnd = () => {
    setIsAnimating(false);
  };

  return {
    slot,

    isAnimating,
    onTransitionEnd,

    bind,
    onPointerDown,

    isDragging,
    dragAxis,
    dragDirection: direction,
  };
};

export default useBoardSwipe;
