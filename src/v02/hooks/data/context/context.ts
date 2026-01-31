import { createStrictContext } from "@hooksV01/board/context/createStrictContext";
import type { BoardStaticValue } from "./type";

export const [BoardStaticContext, useBoardStaticContext] =
  createStrictContext<BoardStaticValue>("useBoardStaticContext");
