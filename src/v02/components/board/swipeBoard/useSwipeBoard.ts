import { useMemo } from "react";

import useBoardSwipe from "@hooksV02/board/useBoardSwipe";
import type { BoardAxisDict, SlotCount, SlotDict } from "@interfacesV02/type";
import { useBoardStaticContext } from "@hooksV02/data/context/context";

type Parms = {
  slot: SlotDict;
  getSlot: (s: SlotDict) => void;
  dataDict: BoardAxisDict;
};

const useSwipeBoard = (parms: Parms) => {
  const { slot, getSlot, dataDict } = parms;

  const horizontal = dataDict.HORIZONTAL;
  const vertical = dataDict.VERTICAL;

  const slotCount: SlotCount = {
    HORIZONTAL: horizontal?.slotList.length ?? 0,
    VERTICAL: vertical?.slotList.length ?? 0,
  };

  const isHorizontal = horizontal !== undefined;
  const isVertical = vertical !== undefined;

  const { boardSize, stepPX } = useBoardStaticContext();

  const { bind, onPointerDown, onTransitionEnd, dragAxis, dragDirection } =
    useBoardSwipe({
      slotCount,
      slot,
      getSlot,
      stepPX,
      isHorizontal,
      isVertical,
    });

  const swipeBoardProps = useMemo(
    () => ({
      boardSize,
      stepPX,
      slotCount,
      dataDict,
      slot,
      dragAxis,
      bind,
      onPointerDown,
      onTransitionEnd,
    }),
    [
      boardSize,
      stepPX,
      slotCount,
      dataDict,
      dragAxis,
      bind,
      onPointerDown,
      onTransitionEnd,
    ],
  );

  return { dragDirection, swipeBoardProps };
};

export default useSwipeBoard;
