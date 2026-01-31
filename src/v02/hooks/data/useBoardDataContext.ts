import { useMemo } from "react";
import { useBoardStaticContext } from "./context/context";

export const useBoardDataContext = () => {
  const staticValue = useBoardStaticContext();

  return useMemo(() => ({ ...staticValue }), [staticValue]);
};
