import { useRef } from "react";
import html2canvas from "html2canvas";

import * as Title from "@componentsV03/title/Title.styled";

import EvaluationBoard from "@componentsV03/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV03/board/useGetBoardResult";

import { FACE_BOARD_INFO } from "@dataV03/boardInfoDummy";

import useGetBoardPoint from "@hooksV03/board/useGetBoardPoint";
import ResultPoly from "./ResultPoly";

import type { GetUserBoardDataReturn } from "@apisV03/firebase/domain/user";
import type { GetTotalBoardDataReturn } from "@apisV03/firebase/domain/total";
import { Separator } from "@componentsV03/layout/DefaultLayout";

import Spacing from "@componentsV03/spacing/Spacing";

import ResultTotalList from "./ResultTotalList";
import Label from "@componentsV03/label/Label";
import Share from "./share/Share";

type Parms = {
  userBoardData: GetUserBoardDataReturn;
  totalBoardDataDict: GetTotalBoardDataReturn;
};

const Result = (parms: Parms) => {
  const { userBoardData, totalBoardDataDict } = parms;
  const { itemList, axis } = userBoardData;

  // ✅ 이 영역만 캡쳐
  const captureRef = useRef<HTMLDivElement>(null);

  const { horizontal, vertical, hasNoCalcData, topLikedItemIDList } =
    useGetBoardResult({
      vertical: axis.VERTICAL,
      horizontal: axis.HORIZONTAL,
      preference: axis.PREFERENCE,
      itemList,
    });

  const { points, likedPointsList } = useGetBoardPoint({
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
    return FACE_BOARD_INFO.resultDict[verticalZone][horizontalZone][focus()];
  };

  const ResultTitle = () => {
    if (hasNoCalcData) {
      return (
        <Title.BoardTitleContainer>
          <h2>아직 취향을 발견하지 못했어요.</h2>
        </Title.BoardTitleContainer>
      );
    }

    return (
      <>
        <Title.BoardTitleContainer
          className="display"
          style={{ display: "flex" }}
        >
          <h6>나의 취향은...</h6>
          <h1>{result().label}</h1>
          <Spacing size={8} />

          <Title.BoardTitleImg
            $imgURL={result().img}
            style={{ minHeight: 260, height: 260, minWidth: 10 }}
          />
        </Title.BoardTitleContainer>
      </>
    );
  };

  const ResultCaptrueTitle = () => {
    if (hasNoCalcData) {
      return (
        <Title.BoardTitleContainer
          className="captrue"
          style={{ display: "none" }}
        >
          <h2>아직 취향을 발견하지 못했어요.</h2>
          <Spacing size={8} />
        </Title.BoardTitleContainer>
      );
    }

    return (
      <>
        <Title.BoardTitleContainer
          className="captrue"
          style={{ display: "none" }}
        >
          <Title.BoardTitleImg
            $imgURL={result().img}
            data-capture="result-img"
            style={{ minHeight: 160, height: 160, minWidth: 10 }}
          />
          <Label font="head2" color="textStrongest">
            {result().label}
          </Label>
          <Spacing size={8} />
        </Title.BoardTitleContainer>
      </>
    );
  };

  const Board = () => {
    return (
      <EvaluationBoard
        boardSize={340}
        boardInformation={FACE_BOARD_INFO}
        itemList={itemList}
        itemPointDict={points}
      >
        <ResultPoly points={likedPointsList} />
      </EvaluationBoard>
    );
  };

  const handleCapture = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
      onclone: (doc) => {
        // 2) 캡쳐 버전 보여주기 (display:none이면 html2canvas가 아예 렌더 안 함)
        const captureEl = doc.querySelector(".captrue") as HTMLElement | null; // 네 클래스명 유지
        if (captureEl) {
          captureEl.style.display = "flex";
        }
      },
    });

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png"),
    );
    if (!blob) return;

    // 예시: 다운로드
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <ResultTitle />
      <Spacing size={12} />
      {/* ✅ 캡쳐 대상 */}
      <div
        ref={captureRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          boxSizing: "border-box",
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: "#fff",
        }}
      >
        {/* 상단 결과 */}
        <ResultCaptrueTitle />

        <Board />
        <Spacing size={12} />
      </div>
      <Share saveImage={handleCapture} />
      <Separator $size={8} />

      {/* 전체 결과 */}
      <ResultTotalList
        data={totalBoardDataDict}
        itemList={itemList}
        boardInfromation={FACE_BOARD_INFO}
        itemPositionDict={itemPositionDict}
      />
      <Spacing size={40} />
    </>
  );
};

export default Result;
