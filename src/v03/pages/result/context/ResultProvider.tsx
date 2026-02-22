import * as htmlToImage from "html-to-image";

import type { GetTotalBoardDataReturn } from "@apisV03/firebase/domain/total";
import type { GetUserBoardDataReturn } from "@apisV03/firebase/domain/user";
import { createStrictContext } from "@hooksV01/board/context/createStrictContext";
import useGetBoardPoint from "@hooksV03/board/useGetBoardPoint";
import useGetBoardResult from "@hooksV03/board/useGetBoardResult";
import type { BoardInformation } from "@interfacesV03/data/system";
import type {
  ItemIDList,
  UserAxisItemPositionDict,
  UserPoint,
  UserPointDict,
} from "@interfacesV03/data/user";
import type { BoardAxisType } from "@interfacesV03/type";
import {
  useRef,
  useState,
  type PropsWithChildren,
  type RefObject,
} from "react";

type ResultValue = {
  hasNoCalcData: boolean;
  resultLabel: string;
  resultImgURL: string;
  itemList: ItemIDList;
  itemPointDict: UserPointDict;
  likedItemPointList: UserPoint[];
  totalBoardDataDict: GetTotalBoardDataReturn;
  itemPositionDict: Record<BoardAxisType, UserAxisItemPositionDict>;
  boardInformation: BoardInformation;

  captureRef: RefObject<HTMLDivElement | null>;
  handleCapture: () => Promise<void>;
  isCaptureLoading: boolean;
};

export const [ResultContext, useResultContext] =
  createStrictContext<ResultValue>("useResultContext");

type Parms = PropsWithChildren<{
  userBoardData: GetUserBoardDataReturn;
  totalBoardDataDict: GetTotalBoardDataReturn;
  boardInformation: BoardInformation;
}>;

export const ResultProvider = (parms: Parms) => {
  const { userBoardData, totalBoardDataDict, boardInformation, children } =
    parms;
  const { itemList, axis } = userBoardData;

  const { horizontal, vertical, hasNoCalcData, topLikedItemIDList } =
    useGetBoardResult({
      vertical: axis.VERTICAL,
      horizontal: axis.HORIZONTAL,
      preference: axis.PREFERENCE,
      itemList,
    });

  const { points: itemPointDict, likedPointsList: likedItemPointList } =
    useGetBoardPoint({
      vertical: axis.VERTICAL,
      horizontal: axis.HORIZONTAL,
      preference: axis.PREFERENCE,
      itemList,
      likedItemList: topLikedItemIDList,
    });

  const itemPositionDict = {
    HORIZONTAL: axis.HORIZONTAL.itemPositionDict,
    VERTICAL: axis.VERTICAL.itemPositionDict,
    PREFERENCE: axis.PREFERENCE.itemPositionDict,
  };

  const verticalZone = vertical.zone;
  const horizontalZone = horizontal.zone;

  const focus = () => {
    if (verticalZone !== "MIDDLE" || horizontalZone !== "MIDDLE") return 0;
    return horizontal.profile === "FOCUSED" && vertical.profile === "FOCUSED"
      ? 0
      : 1;
  };

  const result = () => {
    return boardInformation.resultDict[verticalZone][horizontalZone][focus()];
  };

  const captureRef = useRef<HTMLDivElement>(null);
  const [isCaptureLoading, setIsCaptureLoading] = useState(false);

  const nextFrame = () =>
    new Promise<void>((r) => requestAnimationFrame(() => r()));

  const extractBgUrls = (bg: string) => {
    const urls: string[] = [];
    const re = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(bg))) {
      const u = m[1];
      if (!u || u.startsWith("data:")) continue;
      urls.push(u);
    }
    return urls;
  };

  const waitForImgs = async (root: HTMLElement) => {
    const imgs = Array.from(root.querySelectorAll("img")) as HTMLImageElement[];

    imgs.forEach((img) => {
      try {
        img.loading = "eager";
        img.decoding = "sync";

        // 현재 로딩된 리소스로 고정 (srcset/sizes 변경으로 누락되는 케이스 방지)
        const stableSrc = img.currentSrc || img.src;
        if (stableSrc) img.src = stableSrc;

        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
      } catch {}
    });

    await Promise.all(
      imgs.map(async (img) => {
        if (img.complete && img.naturalWidth > 0) {
          if (img.decode) {
            try {
              await img.decode();
            } catch {}
          }
          return;
        }

        await new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });

        if (img.decode) {
          try {
            await img.decode();
          } catch {}
        }
      }),
    );
  };

  const preloadBackgroundImages = async (root: HTMLElement) => {
    const all = Array.from(root.querySelectorAll("*")) as HTMLElement[];
    const urls = new Set<string>();

    for (const el of all) {
      const bg = getComputedStyle(el).backgroundImage;
      extractBgUrls(bg).forEach((u) => urls.add(u));
    }

    await Promise.all(
      Array.from(urls).map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          }),
      ),
    );
  };

  const handleCapture = async () => {
    if (isCaptureLoading) return;

    const node = captureRef.current;
    if (!node) return;

    setIsCaptureLoading(true);

    try {
      try {
        // @ts-ignore
        await (document.fonts?.ready ?? Promise.resolve());
      } catch {}

      const host = document.createElement("div");
      host.style.position = "fixed";
      host.style.left = "-10000px";
      host.style.top = "0";

      host.style.pointerEvents = "none";

      const cloned = node.cloneNode(true) as HTMLDivElement;

      host.appendChild(cloned);
      document.body.appendChild(host);

      let blob: Blob | null = null;

      try {
        cloned.querySelectorAll(".captrue").forEach((el) => {
          (el as HTMLElement).style.display = "flex";
        });

        cloned.querySelectorAll(".display").forEach((el) => {
          (el as HTMLElement).style.display = "none";
        });

        await nextFrame();
        await nextFrame();

        await waitForImgs(cloned);
        await preloadBackgroundImages(cloned);

        await nextFrame();

        // 4) 최종 캡쳐 사이즈 계산
        const rect = cloned.getBoundingClientRect();
        const targetW = 500;
        const targetH = Math.round(rect.height * (targetW / rect.width));

        blob = await htmlToImage.toBlob(cloned, {
          backgroundColor: "#fff",
          cacheBust: true,
          includeQueryParams: true,

          pixelRatio: Math.min(4, (window.devicePixelRatio || 1) * 2),
          canvasWidth: targetW,
          canvasHeight: targetH,
        });
      } finally {
        document.body.removeChild(host);
      }

      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "result.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCaptureLoading(false);
    }
  };

  return (
    <ResultContext.Provider
      value={{
        boardInformation,
        hasNoCalcData,
        resultLabel: result().label,
        resultImgURL: result().img,
        itemList,
        itemPointDict,
        likedItemPointList,
        totalBoardDataDict,
        itemPositionDict,
        captureRef,
        handleCapture,
        isCaptureLoading,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};
