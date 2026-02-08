import useSwipe from "@hooksV02/swipe/useSwipe";
import type { AxisType, SlotCount, SlotDict } from "@interfacesV02/type";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEventHandler } from "react";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

type Params = {
  slot: SlotDict;
  getSlot: (s: SlotDict) => void;

  min: SlotCount;
  max: SlotCount;
  stepPX: number;

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

const useSwipeBoardControl = (params: Params) => {
  const {
    slot,
    getSlot,
    min,
    max,
    stepPX,
    isHorizontal = true,
    isVertical = true,
    minDistancePx = 10,
    lockDirectionPx = 10,
    draggingMode = "down",
  } = params;

  const [isAnimating, setIsAnimating] = useState(false);

  const startSlotRef = useRef<SlotDict>(slot);
  const liveSlotRef = useRef<SlotDict>(slot);

  const commitSlot = useCallback((next: SlotDict) => {
    liveSlotRef.current = next;
    getSlot(next);
  }, []);

  const isAxisEnabled = (axis: AxisType) => {
    if (axis === "HORIZONTAL") return isHorizontal;
    else if (axis === "VERTICAL") return isVertical;
    else {
      return false;
    }
  };

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

  useEffect(() => {
    if (!isDragging) {
      startSlotRef.current = slot;
      liveSlotRef.current = slot;
    }
  }, [slot]);

  const { bind, isDragging, dragAxis, direction } = useSwipe<HTMLDivElement>({
    minDistancePx,
    lockDirectionPx,
    draggingMode,

    onProgress: ({ deltaX, deltaY, axis }) => {
      if (!axis) return;
      if (!isAxisEnabled(axis)) return;

      setIsAnimating(false);

      const axisDelta = axis === "HORIZONTAL" ? deltaX : deltaY;
      const start = getSlotValue(startSlotRef.current, axis) ?? 0;

      const raw = start - axisDelta / stepPX;
      const snapped = clamp(Math.round(raw), min[axis], max[axis]);

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
      const target = clamp(Math.round(raw), min[axis], max[axis]);

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

  const getIsDragging = () => {
    if (dragAxis === null) return false;
    return isDragging && isAxisEnabled(dragAxis);
  };

  const getDragAxis = () => {
    if (dragAxis === null) return null;
    return isAxisEnabled(dragAxis) ? dragAxis : null;
  };
  return {
    isAnimating,
    onTransitionEnd,
    onPointerDown,
    bind,

    isDragging: getIsDragging(),
    dragAxis: getDragAxis(),
    dragDirection: direction,
  };
};

export default useSwipeBoardControl;
