import * as htmlToImage from "html-to-image";

import type { GetTotalBoardDataReturn } from "@apisV03/firebase/domain/total";

import { createStrictContext } from "@hooksV01/board/context/createStrictContext";
import useGetBoardPoint from "@hooksV03/board/useGetBoardPoint";
import useGetBoardResult from "@hooksV03/board/useGetBoardResult";
import type {
  BoardInformation,
  ItemSummaryDict,
} from "@interfacesV03/data/system";
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
import { useGetTotalBoardData } from "@hooksV03/api/userTotalData";
import { useGetUserBoardData } from "@hooksV03/api/userBoardData";

import { BOARD_INFO_DICT } from "@dataV03/boardInformation";
import { getItemGroupList } from "@dataV03/itemSummary";

type ResultValue = {
  isFetching: boolean;
  isMore: boolean;
  hasNoCalcData: boolean;
  resultLabel: string;

  resultImgURL: string;
  itemList: ItemIDList;
  itemPointDict: UserPointDict;
  likedItemPointList: UserPoint[];
  totalBoardDataDict: GetTotalBoardDataReturn;
  itemPositionDict: Record<BoardAxisType, UserAxisItemPositionDict>;
  boardID: number;
  groupID?: number;
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;

  captureRef: RefObject<HTMLDivElement | null>;
  handleCapture: () => Promise<void>;
  isCaptureLoading: boolean;
};

export const [ResultContext, useResultContext] =
  createStrictContext<ResultValue>("useResultContext");

type Parms = PropsWithChildren<{
  boardID: number;
  groupID?: number;
}>;

export const ResultProvider = (parms: Parms) => {
  const { children, boardID, groupID } = parms;
  const { boardInformation, itemSummaryDict } = BOARD_INFO_DICT[boardID];

  const { data: userBoardData, isFetching: isUserBoardFetching } =
    useGetUserBoardData({
      boardID: boardID,
      groupID: groupID,
    });

  const { data: totalBoardDataDict, isFetching: isTotalBoardFetching } =
    useGetTotalBoardData();

  const isFetching = isUserBoardFetching || isTotalBoardFetching;

  const { itemList: origonItemList, axis } = userBoardData;

  const checkedGroupIDSet =
    groupID !== undefined
      ? new Set(getItemGroupList(boardID, groupID))
      : new Set(origonItemList);

  const itemList = origonItemList.filter((id) => checkedGroupIDSet.has(id));

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
    new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

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

        // 현재 로딩된 리소스로 고정 (srcset/sizes 변경 타이밍 이슈 방지)
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

  // selector 기반 background-image 프리로드 (기본값: 전체)
  const preloadBackgroundImages = async (
    root: HTMLElement,
    selector: string = "*",
  ) => {
    const all = Array.from(root.querySelectorAll(selector)) as HTMLElement[];
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

  // 특정 background-image 엘리먼트가 실제 렌더 반영될 때까지 한 번 더 안정화
  const waitForBackgroundImageElements = async (
    root: HTMLElement,
    selector: string,
  ) => {
    await preloadBackgroundImages(root, selector);
    await nextFrame();
    await nextFrame();
  };

  const prepareForCapture = async (cloned: HTMLDivElement) => {
    try {
      // @ts-ignore
      await (document.fonts?.ready ?? Promise.resolve());
    } catch {}

    cloned.querySelectorAll(".capture").forEach((el) => {
      (el as HTMLElement).style.display = "flex";
    });

    cloned.querySelectorAll(".display").forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });

    await nextFrame();
    await nextFrame();

    // 1) 일반 img 태그 대기
    await waitForImgs(cloned);

    // 2) 핵심 background-image(div.resultImg) 먼저 명시 대기
    await waitForBackgroundImageElements(cloned, ".resultImg");

    // 3) 나머지 background-image 전체 프리로드
    await preloadBackgroundImages(cloned);

    // 4) 최종 렌더 안정화
    await nextFrame();
    await nextFrame();
  };

  const handleCapture = async () => {
    if (isCaptureLoading) return;

    const node = captureRef.current;
    if (!node) return;

    setIsCaptureLoading(true);

    try {
      const host = document.createElement("div");
      host.style.position = "fixed";
      host.style.left = "-10000px";
      host.style.top = "0";
      host.style.pointerEvents = "none";
      host.style.zIndex = "-1";

      const cloned = node.cloneNode(true) as HTMLDivElement;

      // 필요하면 원본 너비 기준 유지 (레이아웃 흔들림 방지)
      const sourceRect = node.getBoundingClientRect();
      if (sourceRect.width > 0) {
        cloned.style.width = `${Math.round(sourceRect.width)}px`;
      }

      host.appendChild(cloned);
      document.body.appendChild(host);

      let blob: Blob | null = null;

      try {
        await prepareForCapture(cloned);

        const rect = cloned.getBoundingClientRect();
        const targetW = 500;
        const safeWidth = rect.width || sourceRect.width || 1;
        const safeHeight = rect.height || sourceRect.height || 1;
        const targetH = Math.max(
          1,
          Math.round(safeHeight * (targetW / safeWidth)),
        );

        blob = await htmlToImage.toBlob(cloned, {
          backgroundColor: "white",
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
        isFetching,
        isMore: userBoardData.isMore,
        boardID,
        groupID,
        boardInformation,
        itemSummaryDict,
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
