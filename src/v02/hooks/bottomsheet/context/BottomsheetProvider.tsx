import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type BottomSheetContextValue = {
  /** 열려있는지 */
  isOpen: boolean;
  /** 바텀시트에 들어갈 내용 */
  content: ReactNode | null;

  /** 바텀시트 열기 */
  openBottomSheet: (content: ReactNode) => void;

  /** 바텀시트 닫기 */
  closeBottomSheet: () => void;
};

export const BottomSheetContext = createContext<BottomSheetContextValue | null>(
  null,
);

type BottomSheetProviderProps = {
  children: React.ReactNode;

  /**
   * 닫힐 때 content를 언제 비울지(애니메이션용)
   * - 0이면 즉시 제거
   * - 기본 250ms
   */
  closeUnmountDelayMs?: number;
};

export const BottomSheetProvider = ({
  children,
  closeUnmountDelayMs = 250,
}: BottomSheetProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openBottomSheet = useCallback((nextContent: ReactNode) => {
    clearCloseTimer(); // 닫는 중이었다면 취소
    setContent(nextContent);
    setIsOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);

    // 애니메이션이 끝난 뒤 unmount(원하면 delay 조절)
    clearCloseTimer();
    if (closeUnmountDelayMs <= 0) {
      setContent(null);
      return;
    }

    closeTimerRef.current = window.setTimeout(() => {
      setContent(null);
      closeTimerRef.current = null;
    }, closeUnmountDelayMs);
  }, [closeUnmountDelayMs]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  const value = useMemo<BottomSheetContextValue>(() => {
    return {
      isOpen,
      content,
      openBottomSheet,
      closeBottomSheet,
    };
  }, [isOpen, content, openBottomSheet, closeBottomSheet]);

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};
