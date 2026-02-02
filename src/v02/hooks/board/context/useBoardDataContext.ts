import { useMemo } from "react";
import { useBoardStaticContext } from "./context";

export const useBoardDataContext = () => {
  const staticValue = useBoardStaticContext();

  return useMemo(() => ({ ...staticValue }), [staticValue]);
};
