import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { RoughAxisData } from "@interfacesV02/data/user";
import useBoardData from "./useBoardData";
import type { ItemSummaryDict } from "@interfacesV02/data/system";
import type { BoardSlot } from "@interfacesV02/type";
import { createStrictContext } from "@hooksV01/board/context/createStrictContext";

type ProviderParams = {
  itemSummaryDict?: ItemSummaryDict;
  horizontalRough?: RoughAxisData;
  verticalRough?: RoughAxisData;
};

type BoardStaticValue = {
  itemSummaryDict: ItemSummaryDict;
  boardSize: number;
  stepPX: number;
} & ReturnType<typeof useBoardData>;

type BoardSlotValue = {
  boardSlot?: BoardSlot;
  setBoardSlot: (slot: BoardSlot) => void;
};

type BoardDataValue = BoardStaticValue & BoardSlotValue;

const [BoardStaticContext, useBoardStaticContext] =
  createStrictContext<BoardStaticValue>("useBoardStaticContext");

const [BoardSlotContext, useBoardSlotContext] =
  createStrictContext<BoardSlotValue>("useBoardSlotContext");

export const useBoardDataContext = (): BoardDataValue => {
  const staticValue = useBoardStaticContext();
  const slotValue = useBoardSlotContext();

  return useMemo(
    () => ({ ...staticValue, ...slotValue }),
    [staticValue, slotValue],
  );
};

export { useBoardStaticContext, useBoardSlotContext };

export const BoardDataProvider = (props: PropsWithChildren<ProviderParams>) => {
  const { children, horizontalRough, verticalRough, itemSummaryDict } = props;

  const data = useBoardData({ horizontalRough, verticalRough });

  const [boardSlot, setBoardSlotState] = useState<BoardSlot | undefined>(
    undefined,
  );

  const rafIdRef = useRef<number | null>(null);
  const pendingSlotRef = useRef<BoardSlot | null>(null);

  const setBoardSlot = useCallback((slot: BoardSlot) => {
    pendingSlotRef.current = slot;

    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const next = pendingSlotRef.current;
      if (!next) return;
      setBoardSlotState(next);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const staticValue: BoardStaticValue = useMemo(
    () => ({
      itemSummaryDict: itemSummaryDict ?? {},
      boardSize: 400,
      stepPX: 80,
      ...data,
    }),

    [itemSummaryDict, data],
  );

  const slotValue: BoardSlotValue = useMemo(
    () => ({ boardSlot, setBoardSlot }),
    [boardSlot, setBoardSlot],
  );

  return (
    <BoardStaticContext.Provider value={staticValue}>
      <BoardSlotContext.Provider value={slotValue}>
        {children}
      </BoardSlotContext.Provider>
    </BoardStaticContext.Provider>
  );
};
