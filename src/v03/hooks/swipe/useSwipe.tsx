import {
  emptyDirection,
  type AxisType,
  type BoardDirection,
  type DirectionType,
} from "@interfacesV03/type";
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

  axis: AxisType | null;

  /** axis가 null이면 dragDirection도 null */
  dragDirection: BoardDirection | null;

  isDragging: boolean;
  dragAxis: AxisType | null;
};

export type SwipeResult = {
  axis: AxisType;
  dragDirection: BoardDirection;

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

  /**
   * ✅ 손을 떼지 않고 방향을 바꿀 때,
   * 너무 미세한 흔들림으로 direction이 왔다갔다 하지 않도록 하는 deadzone
   */
  directionDeadzonePx?: number;

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
  axisDelta >= 0 ? "END" : "START";

const computeNextBoardDirection = (
  axis: AxisType,
  axisDelta: number,
  prev: BoardDirection | null,
): BoardDirection => {
  const nextDir = getAxisDirection(axisDelta);
  const base = prev ?? emptyDirection;

  if (base[axis] === nextDir) return base;
  return { ...base, [axis]: nextDir };
};

const useSwipe = <T extends HTMLElement = HTMLElement>(
  options: SwipeOptions,
) => {
  const {
    minDistancePx = 1,
    lockDirectionPx = 1,
    draggingMode = "down",
    directionDeadzonePx = 1,
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
    pointerID: -1,

    startX: 0,
    startY: 0,
    startT: 0,

    axisLocked: null as AxisType | null,

    // ✅ 방향 전환 감지용(프레임 간 이동량)
    lastX: 0,
    lastY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragAxis, setDragAxis] = useState<AxisType | null>(null);
  const [dragDirection, setDragDirection] = useState<BoardDirection | null>(
    null,
  );

  const isDraggingRef = useRef(false);
  const dragAxisRef = useRef<AxisType | null>(null);
  const dragDirectionRef = useRef<BoardDirection | null>(null);

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

  const clearDragDirection = () => {
    if (dragDirectionRef.current === null) return;
    dragDirectionRef.current = null;
    setDragDirection(null);
  };

  const setDragDirectionForAxis = (axis: AxisType, axisDelta: number) => {
    const prev = dragDirectionRef.current;
    const next = computeNextBoardDirection(axis, axisDelta, prev);

    // 변경 없으면 state 업데이트 X
    if (prev && next === prev) return prev;
    // prev가 null이고 next가 emptyDirection일 수는 없지만(축 업데이트로 들어오므로),
    // 안전하게 동일 체크는 위에서 끝났음

    // 실제로 값이 바뀐 케이스만 반영
    if (
      prev &&
      prev.HORIZONTAL === next.HORIZONTAL &&
      prev.VERTICAL === next.VERTICAL
    ) {
      return prev;
    }

    dragDirectionRef.current = next;
    setDragDirection(next);
    return next;
  };

  const reset = () => {
    const g = gestureRef.current;
    g.isActive = false;
    g.pointerID = -1;
    g.axisLocked = null;

    clearDragDirection();
    setDragAxisSafe(null);
    setIsDraggingSafe(false);

    onProgressRef.current?.({
      deltaX: 0,
      deltaY: 0,
      axis: null,
      dragDirection: null,
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
      g.pointerID = e.pointerId;

      g.startX = e.clientX;
      g.startY = e.clientY;
      g.startT = now;

      g.lastX = e.clientX;
      g.lastY = e.clientY;

      g.axisLocked = null;

      setDragAxisSafe(null);
      clearDragDirection();

      if (draggingMode === "down") setIsDraggingSafe(true);
      else setIsDraggingSafe(false);

      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

      onProgressRef.current?.({
        deltaX: 0,
        deltaY: 0,
        axis: null,
        dragDirection: null,
        isDragging: isDraggingRef.current,
        dragAxis: dragAxisRef.current,
      });
    };

    const onPointerMove: PointerEventHandler<T> = (e) => {
      const g = gestureRef.current;
      if (!g.isActive || g.pointerID !== e.pointerId) return;

      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;

      // ✅ 축 잠금
      if (!g.axisLocked) {
        if (Math.abs(dx) + Math.abs(dy) < lockDirectionPx) {
          onProgressRef.current?.({
            deltaX: dx,
            deltaY: dy,
            axis: null,
            dragDirection: null,
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

      // ✅ 손을 떼지 않고 방향 전환 감지: 프레임 간 이동량(step delta) 기준
      const stepDx = e.clientX - g.lastX;
      const stepDy = e.clientY - g.lastY;
      g.lastX = e.clientX;
      g.lastY = e.clientY;

      const stepAxisDelta = axis === "HORIZONTAL" ? stepDx : stepDy;

      // 너무 작은 흔들림은 방향 업데이트 안 함
      let nextDirection: BoardDirection | null = dragDirectionRef.current;
      if (Math.abs(stepAxisDelta) >= directionDeadzonePx) {
        nextDirection = setDragDirectionForAxis(axis, stepAxisDelta);
      }

      onProgressRef.current?.({
        deltaX: dx, // UI 이동량/보간은 누적값 유지
        deltaY: dy,
        axis,
        dragDirection: nextDirection,
        isDragging: isDraggingRef.current,
        dragAxis: dragAxisRef.current,
      });
    };

    const finish = (e: Parameters<PointerEventHandler<T>>[0]) => {
      const g = gestureRef.current;
      if (!g.isActive || g.pointerID !== e.pointerId) return;

      const endT = performance.now();

      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;

      const axis = g.axisLocked ?? getAxis(dx, dy);
      const distancePx = getAxisDistance(axis, dx, dy);
      const durationMs = Math.max(1, endT - g.startT);
      const velocityPxMs = distancePx / durationMs;

      const passed = distancePx >= minDistancePx;

      // ✅ onEnd는 "최종 결과 방향"이므로 누적(start→end) 기준이 일반적으로 안정적
      const axisDelta = getAxisDelta(axis, dx, dy);
      const finalDirection = computeNextBoardDirection(
        axis,
        axisDelta,
        dragDirectionRef.current,
      );

      onEndRef.current?.({
        axis,
        dragDirection: finalDirection,
        totalDx: dx,
        totalDy: dy,
        distancePx,
        durationMs,
        velocityPxMs,
        passed,
      });

      // ✅ 제스처 종료 정리
      g.isActive = false;
      g.pointerID = -1;
      g.axisLocked = null;

      setDragAxisSafe(null);
      setIsDraggingSafe(false);
      clearDragDirection();

      onProgressRef.current?.({
        deltaX: 0,
        deltaY: 0,
        axis: null,
        dragDirection: null,
        isDragging: false,
        dragAxis: null,
      });
    };

    const onPointerUp: PointerEventHandler<T> = (e) => finish(e);
    const onPointerCancel: PointerEventHandler<T> = (e) => finish(e);

    return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
  }, [draggingMode, lockDirectionPx, minDistancePx, directionDeadzonePx]);

  return {
    bind,
    isDragging,
    dragAxis,
    dragDirection, // 손 떼면 null, 드래그 중엔 방향 전환 즉시 반영
    reset,
  };
};

export default useSwipe;
