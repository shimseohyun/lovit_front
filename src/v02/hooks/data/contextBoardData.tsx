import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import type { RoughAxisData } from "@interfacesV02/data/user";
import useBoardData from "./useBoardData";
import type { ItemSummaryDict } from "@interfacesV02/data/system";

type BoardSlot = {
  vertical: number;
  horizontal: number;
};
type BoardDataValue = {
  itemSummaryDict: ItemSummaryDict;
  boardSize: number;
  boardSlot?: BoardSlot;
  setBoardSlot: (vertical: number, horizontal: number) => void;
} & ReturnType<typeof useBoardData>;

const createStrictContext = <T,>(name: string) => {
  const ctx = createContext<T | null>(null);

  const useCTX = () => {
    const value = useContext(ctx);
    if (value === null) throw new Error(`${name} must be used within Provider`);
    return value;
  };

  return [ctx, useCTX] as const;
};

type ProviderParams = {
  itemSummaryDict?: ItemSummaryDict;
  horizontalRough?: RoughAxisData;
  verticalRough?: RoughAxisData;
};

const [BoardDataContext, useBoardDataContext] =
  createStrictContext<BoardDataValue>("useBoardDataContext");

export { useBoardDataContext };

export const BoardDataProvider = (props: PropsWithChildren<ProviderParams>) => {
  const {
    children,
    horizontalRough,
    verticalRough,
    itemSummaryDict = {},
  } = props;

  const data = useBoardData({ horizontalRough, verticalRough });

  const [boardSlot, setBoardSlotValue] = useState<BoardSlot>();

  const setBoardSlot = (v: number, h: number) => {
    setBoardSlotValue({ vertical: v, horizontal: h });
  };

  const value: BoardDataValue = {
    itemSummaryDict,
    boardSize: 400,
    setBoardSlot,
    boardSlot,
    ...data,
  };

  return (
    <BoardDataContext.Provider value={value}>
      {children}
    </BoardDataContext.Provider>
  );
};
