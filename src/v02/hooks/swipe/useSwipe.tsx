import {
  emptyDirection,
  type AxisType,
  type BoardDirection,
  type DirectionType,
} from "@interfacesV02/type";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEventHandler } from "react";

export type SwipeBind<T extends HTMLElement = HTMLElement> = {
  onPointerDown: PointerEventHandler<T>;
  onPointerMove: PointerEventHandler<T>;
  onPointerUp: PointerEventHandler<T>;
  onPointerCancel: PointerEventHandler<T>;
};

export type SwipeProgressPayload = {
  deltaX: number;
  deltaY: number;

  /** 축이 아직 잠기기 전이면 null */
  axis: AxisType | null;

  /** axis가 null이면 direction도 null */
  direction: BoardDirection | null;

  /** ✅ useSwipe가 직접 관리하는 UI 상태 */
  isDragging: boolean;
  dragAxis: AxisType | null;
};

export type SwipeResult = {
  axis: AxisType;
  direction: BoardDirection;

  totalDx: number;
  totalDy: number;
  distancePx: number;

  durationMs: number;
  velocityPxMs: number;

  passed: boolean;
};

type SwipeOptions = {
  /** 스냅/성공 판정 거리 */
  minDistancePx?: number;

  /** 이 값 이상 움직여야 축 잠금 시작 */
  lockDirectionPx?: number;

  /**
   * isDragging을 언제 true로 둘지
   * - "down": pointerDown 순간부터 드래그로 간주
   * - "lock": 축이 결정되는 순간부터 드래그로 간주
   */
  draggingMode?: "down" | "lock";

  onProgress?: (payload: SwipeProgressPayload) => void;
  onEnd?: (result: SwipeResult) => void;
};

const getAxis = (dx: number, dy: number): AxisType =>
  Math.abs(dx) >= Math.abs(dy) ? "HORIZONTAL" : "VERTICAL";

const getAxisDelta = (axis: AxisType, dx: number, dy: number) =>
  axis === "HORIZONTAL" ? dx : dy;

const getAxisDistance = (axis: AxisType, dx: number, dy: number) =>
  Math.abs(getAxisDelta(axis, dx, dy));

const getAxisDirection = (axisDelta: number): DirectionType =>
  axisDelta >= 0 ? "START" : "END";

const useSwipe = <T extends HTMLElement = HTMLElement>(
  options: SwipeOptions,
) => {
  const {
    minDistancePx = 10,
    lockDirectionPx = 10,
    draggingMode = "down",
    onProgress,
    onEnd,
  } = options;

  /** ✅ 콜백 스테일 방지 */
  const onProgressRef = useRef<SwipeOptions["onProgress"]>(onProgress);
  const onEndRef = useRef<SwipeOptions["onEnd"]>(onEnd);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  /** ✅ 제스처 내부 상태 */
  const gestureRef = useRef({
    isActive: false,
    pointerId: -1,

    startX: 0,
    startY: 0,
    startT: 0,

    axisLocked: null as AxisType | null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragAxis, setDragAxis] = useState<AxisType | null>(null);
  const [direction, setDirection] = useState<BoardDirection>(emptyDirection);

  const isDraggingRef = useRef(false);
  const dragAxisRef = useRef<AxisType | null>(null);
  const directionRef = useRef<BoardDirection>(emptyDirection);

  const setIsDraggingSafe = (next: boolean) => {
    if (isDraggingRef.current === next) return;
    isDraggingRef.current = next;
    setIsDragging(next);
  };

  const setDragAxisSafe = (next: AxisType | null) => {
    if (dragAxisRef.current === next) return;
    dragAxisRef.current = next;
    setDragAxis(next);
  };

  const setDirectionForAxis = (axis: AxisType, axisDelta: number) => {
    const nextDir = getAxisDirection(axisDelta);

    const prev = directionRef.current;

    if (prev[axis] === nextDir) return prev;

    const next: BoardDirection = { ...prev, [axis]: nextDir };
    directionRef.current = next;

    setDirection(next);
    return next;
  };

  const reset = () => {
    const g = gestureRef.current;
    g.isActive = false;
    g.pointerId = -1;
    g.axisLocked = null;

    directionRef.current = emptyDirection;
    setDirection(emptyDirection);

    setDragAxisSafe(null);
    setIsDraggingSafe(false);

    onProgressRef.current?.({
      deltaX: 0,
      deltaY: 0,
      axis: null,
      direction: null,
      isDragging: false,
      dragAxis: null,
    });
  };

  const bind: SwipeBind<T> = useMemo(() => {
    const onPointerDown: PointerEventHandler<T> = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const now = performance.now();
      const g = gestureRef.current;

      g.isActive = true;
      g.pointerId = e.pointerId;

      g.startX = e.clientX;
      g.startY = e.clientY;
      g.startT = now;

      g.axisLocked = null;

      setDragAxisSafe(null);

      if (draggingMode === "down") setIsDraggingSafe(true);
      else setIsDraggingSafe(false);

      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

      onProgressRef.current?.({
        deltaX: 0,
        deltaY: 0,
        axis: null,
        direction: null,
        isDragging: isDraggingRef.current,
        dragAxis: dragAxisRef.current,
      });
    };

    const onPointerMove: PointerEventHandler<T> = (e) => {
      const g = gestureRef.current;
      if (!g.isActive || g.pointerId !== e.pointerId) return;

      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;

      // ✅ 축 잠금
      if (!g.axisLocked) {
        if (Math.abs(dx) + Math.abs(dy) < lockDirectionPx) {
          onProgressRef.current?.({
            deltaX: dx,
            deltaY: dy,
            axis: null,
            direction: null,
            isDragging: isDraggingRef.current,
            dragAxis: dragAxisRef.current,
          });
          return;
        }

        g.axisLocked = getAxis(dx, dy);
        setDragAxisSafe(g.axisLocked);

        if (draggingMode === "lock") setIsDraggingSafe(true);
      }

      const axis = g.axisLocked;
      const axisDelta = getAxisDelta(axis, dx, dy);
      const nextDirection = setDirectionForAxis(axis, axisDelta);

      onProgressRef.current?.({
        deltaX: dx,
        deltaY: dy,
        axis,
        direction: nextDirection,
        isDragging: isDraggingRef.current,
        dragAxis: dragAxisRef.current,
      });
    };

    const finish = (e: Parameters<PointerEventHandler<T>>[0]) => {
      const g = gestureRef.current;
      if (!g.isActive || g.pointerId !== e.pointerId) return;

      const endT = performance.now();

      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;

      const axis = g.axisLocked ?? getAxis(dx, dy);
      const distancePx = getAxisDistance(axis, dx, dy);
      const durationMs = Math.max(1, endT - g.startT);
      const velocityPxMs = distancePx / durationMs;

      const passed = distancePx >= minDistancePx;

      const axisDelta = getAxisDelta(axis, dx, dy);
      const finalDirection = setDirectionForAxis(axis, axisDelta);

      onEndRef.current?.({
        axis,
        direction: finalDirection,

        totalDx: dx,
        totalDy: dy,
        distancePx,

        durationMs,
        velocityPxMs,

        passed,
      });

      // ✅ 제스처 종료 정리
      g.isActive = false;
      g.pointerId = -1;
      g.axisLocked = null;

      setDragAxisSafe(null);
      setIsDraggingSafe(false);

      onProgressRef.current?.({
        deltaX: 0,
        deltaY: 0,
        axis: null,
        direction: null,
        isDragging: false,
        dragAxis: null,
      });
    };

    const onPointerUp: PointerEventHandler<T> = (e) => finish(e);
    const onPointerCancel: PointerEventHandler<T> = (e) => finish(e);

    return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
  }, [draggingMode, lockDirectionPx, minDistancePx]);

  return {
    bind,

    // ✅ 외부에서 쓰기 좋은 상태들
    isDragging,
    dragAxis,
    direction,

    reset,
  };
};

export default useSwipe;
