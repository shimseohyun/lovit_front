import type {
  AxisType,
  BoardDirection,
  DirectionType,
} from "@interfacesV02/type";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, PointerEventHandler } from "react";

export type SwipeResult = {
  direction: BoardDirection;
  axis: AxisType;

  totalDx: number;
  totalDy: number;
  distancePx: number;

  durationMs: number;
  velocityPxMs: number;

  passed: boolean;
};

export type SwipeProgressPayload = {
  deltaX: number;
  deltaY: number;
  axis: AxisType | null;
  direction: BoardDirection | null;
};

export type SwipeBind<T extends HTMLElement = HTMLElement> = {
  onPointerDown: PointerEventHandler<T>;
  onPointerMove: PointerEventHandler<T>;
  onPointerUp: PointerEventHandler<T>;
  onPointerCancel: PointerEventHandler<T>;
};

type SwipeOptions = {
  minDistancePx?: number;
  lockDirectionPx?: number;

  onProgress?: (payload: SwipeProgressPayload) => void;

  onEnd?: (result: SwipeResult) => void;
};

const useSwipe = <T extends HTMLElement = HTMLElement>(
  options: SwipeOptions,
) => {
  const {
    minDistancePx = 10,
    lockDirectionPx = 10,
    onProgress,
    onEnd,
  } = options;

  const onProgressRef = useRef<SwipeOptions["onProgress"]>(onProgress);
  const onEndRef = useRef<SwipeOptions["onEnd"]>(onEnd);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const stateRef = useRef({
    isActive: false,
    pointerId: -1,

    startX: 0,
    startY: 0,
    startT: 0,

    axisLocked: null as AxisType | null,
  });

  const [direction, setDirection] = useState<BoardDirection>({
    VERTICAL: null,
    HORIZONTAL: null,
  });

  const updateDirection = (axis: AxisType, d: number) => {
    const newDirection: DirectionType = d >= 0 ? "START" : "END";
    setDirection({ ...direction, [axis]: newDirection });
  };

  const bind: SwipeBind<T> = useMemo(() => {
    const onPointerDown: PointerEventHandler<T> = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const now = performance.now();
      const s = stateRef.current;

      s.isActive = true;
      s.pointerId = e.pointerId;

      s.startX = e.clientX;
      s.startY = e.clientY;
      s.startT = now;

      s.axisLocked = null;

      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onPointerMove: PointerEventHandler<T> = (e) => {
      const s = stateRef.current;
      if (!s.isActive || s.pointerId !== e.pointerId) return;

      const deltaX = e.clientX - s.startX;
      const deltaY = e.clientY - s.startY;

      if (!s.axisLocked) {
        if (Math.abs(deltaX) + Math.abs(deltaY) < lockDirectionPx) {
          onProgressRef.current?.({
            deltaX,
            deltaY,
            axis: null,
            direction: null,
          });
          return;
        }

        s.axisLocked =
          Math.abs(deltaX) >= Math.abs(deltaY) ? "HORIZONTAL" : "VERTICAL";
      }

      updateDirection(
        s.axisLocked,
        s.axisLocked === "HORIZONTAL" ? deltaX : deltaY,
      );

      onProgressRef.current?.({
        deltaX,
        deltaY,
        axis: s.axisLocked,
        direction,
      });
    };

    const finish = (e: PointerEvent<T>) => {
      const s = stateRef.current;
      if (!s.isActive || s.pointerId !== e.pointerId) return;

      const endX = e.clientX;
      const endY = e.clientY;
      const endT = performance.now();

      const totalDx = endX - s.startX;
      const totalDy = endY - s.startY;

      const axis: AxisType =
        s.axisLocked ??
        (Math.abs(totalDx) >= Math.abs(totalDy) ? "HORIZONTAL" : "VERTICAL");

      const distancePx =
        axis === "HORIZONTAL" ? Math.abs(totalDx) : Math.abs(totalDy);

      const durationMs = Math.max(1, endT - s.startT);
      const velocityPxMs = distancePx / durationMs;

      const passed = distancePx >= minDistancePx;

      updateDirection(axis, axis === "HORIZONTAL" ? totalDx : totalDy);

      onEndRef.current?.({
        direction,
        axis,
        totalDx,
        totalDy,
        distancePx,
        durationMs,
        velocityPxMs,
        passed,
      });

      s.isActive = false;
      s.pointerId = -1;
      s.axisLocked = null;

      onProgressRef.current?.({
        deltaX: 0,
        deltaY: 0,
        axis: null,
        direction: null,
      });
    };

    const onPointerUp: PointerEventHandler<T> = (e) => finish(e);
    const onPointerCancel: PointerEventHandler<T> = (e) => finish(e);

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    };
  }, [lockDirectionPx, minDistancePx]);

  return { bind, direction };
};

export default useSwipe;
