import { createStrictContext } from "@hooksV01/board/context/createStrictContext";
import type { BoardStaticValue, BoardSlotValue, BoardStepValue } from "./type";

export const [BoardStaticContext, useBoardStaticContext] =
  createStrictContext<BoardStaticValue>("useBoardStaticContext");

export const [BoardSlotContext, useBoardSlotContext] =
  createStrictContext<BoardSlotValue>("useBoardSlotContext");

export const [BoardStepContext, useBoardStepContext] =
  createStrictContext<BoardStepValue>("useBoardStepContext");
