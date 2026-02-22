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
import { useRef, type PropsWithChildren, type RefObject } from "react";

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

  const handleCapture = async () => {
    const node = captureRef.current;
    if (!node) return;

    // 폰트 로딩 대기(글자 깨짐/흐림 방지)
    await (document as any).fonts?.ready;

    // 1) 화면에 영향 없이 clone을 offscreen에 붙인다
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-10000px";
    host.style.top = "0";
    host.style.width = "fit-content";
    host.style.pointerEvents = "none";
    host.style.opacity = "0"; // 혹시 모를 플리커 방지

    const cloned = node.cloneNode(true) as HTMLDivElement;
    host.appendChild(cloned);
    document.body.appendChild(host);

    // 2) clone 내부에서 캡쳐용 UI만 켜기 (html2canvas onclone 대체)
    cloned.querySelectorAll(".captrue").forEach((el) => {
      (el as HTMLElement).style.display = "flex";
    });

    // (선택) 화면용 UI 숨기고 싶으면
    cloned.querySelectorAll(".display").forEach((el) => {
      (el as HTMLElement).style.display = "none";
    });

    const rect = cloned.getBoundingClientRect();
    const targetW = 500;
    const targetH = Math.round(rect.height * (targetW / rect.width));

    const blob = await htmlToImage.toBlob(cloned, {
      backgroundColor: "#fff",
      cacheBust: true,

      pixelRatio: Math.min(4, (window.devicePixelRatio || 1) * 2),
      canvasWidth: targetW,
      canvasHeight: targetH,
    });

    document.body.removeChild(host);

    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.png";
    a.click();
    URL.revokeObjectURL(url);
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
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};
