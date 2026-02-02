import { useEffect, useState } from "react";

type ViewportSize = { width: number; height: number };

const getViewportSize = (): ViewportSize => {
  if (typeof window === "undefined") return { width: 0, height: 0 };

  const vv = window.visualViewport;

  return {
    width: Math.round(vv?.width ?? window.innerWidth),
    height: Math.round(vv?.height ?? window.innerHeight),
  };
};

const clampWidth = (width: number, height: number) => {
  let newW = width > 500 ? 500 : width;
  let newH = height - 270;
  return newW < newH ? newW : newH;
};

const useViewport = () => {
  const [size, setSize] = useState<ViewportSize>(() => {
    const { width, height } = getViewportSize();
    return {
      width: clampWidth(width, height),
      height: clampWidth(width, height),
    };
  });

  useEffect(() => {
    const onResize = () => {
      const { width, height } = getViewportSize();
      setSize({
        width: clampWidth(width, height),
        height: clampWidth(width, height),
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize, {
      passive: true,
    });
    window.visualViewport?.addEventListener("scroll", onResize, {
      passive: true,
    });

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onResize);
    };
  }, []);

  return size;
};

export default useViewport;
