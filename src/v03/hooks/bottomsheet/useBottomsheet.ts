import { useContext } from "react";
import {
  BottomSheetContext,
  type BottomSheetContextValue,
} from "./context/BottomsheetProvider";

export const useBottomSheet = (): BottomSheetContextValue => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx)
    throw new Error(
      "useBottomSheet must be used within <BottomSheetProvider />",
    );
  return ctx;
};
