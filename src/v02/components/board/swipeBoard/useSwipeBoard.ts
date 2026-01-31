import { useMemo } from "react";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import useBoardSwipe from "@hooksV02/board/useBoardSwipe";
import type { AxisType, SlotDict } from "@interfacesV02/type";
import type { AxisData } from "@hooksV02/data/board/useHandleAxisData";

type Parms = {
  slot: SlotDict;
  getSlot: (s: SlotDict) => void;
  dataList: AxisData[];
  axisList: AxisType[];
};

const useSwipeBoard = (parms: Parms) => {
  const { slot, getSlot, dataList, axisList } = parms;

  const slotCount = dataList[0].slotList.length;
  const isHorizontal = axisList.includes("HORIZONTAL");
  const isVertical = axisList.includes("VERTICAL");

  const { boardSize, itemSummaryDict, stepPX } = useBoardDataContext();

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
      dataList,
      axisList,
      slot,
      dragAxis,
      bind,
      onPointerDown,
      onTransitionEnd,
      itemSummaryDict,
    }),
    [
      boardSize,
      stepPX,
      slotCount,
      dataList,
      axisList,

      dragAxis,
      bind,
      onPointerDown,
      onTransitionEnd,
      itemSummaryDict,
    ],
  );

  return { dragDirection, swipeBoardProps };
};

export default useSwipeBoard;
