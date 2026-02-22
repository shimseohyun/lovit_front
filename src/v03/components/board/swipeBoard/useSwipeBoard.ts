import type { BoardAxisDict, SlotCount, SlotDict } from "@interfacesV03/type";
import { useBoardStaticContext } from "@hooksV03/board/context/context";
import useSwipeBoardControl from "./useSwipeBoardControl";
import { useMemo } from "react";

type Parms = {
  slot: SlotDict;
  getSlot: (s: SlotDict) => void;
  dataDict: BoardAxisDict;
};

const useSwipeBoard = (parms: Parms) => {
  const { slot, getSlot, dataDict } = parms;
  const { stepPX } = useBoardStaticContext();

  const horizontal = useMemo(() => dataDict.HORIZONTAL, [dataDict]);
  const vertical = useMemo(() => dataDict.VERTICAL, [dataDict]);

  const isHorizontal = horizontal !== undefined;
  const isVertical = vertical !== undefined;

  const isSolo = !(isHorizontal && isVertical);

  const slotCount: SlotCount = {
    HORIZONTAL: isHorizontal ? horizontal.endIDX - horizontal.startIDX + 1 : 0,
    VERTICAL: isVertical ? vertical.endIDX - vertical.startIDX + 1 : 0,
  };

  const { onPointerDown, onTransitionEnd, bind, dragAxis, dragDirection } =
    useSwipeBoardControl({
      min: {
        HORIZONTAL: isHorizontal ? horizontal.startIDX : 0,
        VERTICAL: isVertical ? vertical.startIDX : 0,
      },
      max: {
        HORIZONTAL: isHorizontal ? horizontal.endIDX : 0,
        VERTICAL: isVertical ? vertical.endIDX : 0,
      },
      slot,
      getSlot,
      stepPX,
      isHorizontal,
      isVertical,
    });

  const swipeBoardProps = {
    stepPX,
    slotCount,
    dataDict,
    slot,
    isSolo,
    dragAxis,
    dragDirection,
    bind,
    onPointerDown,
    onTransitionEnd,
  };

  return {
    dragAxis,
    dragDirection,
    swipeBoardProps,
  };
};

export default useSwipeBoard;
