import EvaluationBoard from "@componentsV03/board/evaluationBoard/EvaluationBoard";
import ResultPoly from "../ResultPoly";
import { useResultContext } from "@pagesV03/result/context/ResultProvider";

import * as Title from "@componentsV03/title/Title.styled";
import Spacing from "@componentsV03/spacing/Spacing";
import Label from "@componentsV03/label/Label";

export const ResultBoard = () => {
  const {
    hasNoCalcData,
    resultImgURL,
    resultLabel,
    boardInformation,
    itemList,
    itemPointDict,
    likedItemPointList,
    captureRef,
  } = useResultContext();

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
          <h1>{resultLabel}</h1>
          <Spacing size={8} />

          <Title.BoardTitleImg
            $imgURL={resultImgURL}
            style={{ minHeight: 260, height: 260, minWidth: 10 }}
          />
        </Title.BoardTitleContainer>
      </>
    );
  };

  const Board = () => {
    return (
      <EvaluationBoard
        boardSize={340}
        boardInformation={boardInformation}
        itemList={itemList}
        itemPointDict={itemPointDict}
      >
        <ResultPoly points={likedItemPointList} />
      </EvaluationBoard>
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
            $imgURL={resultImgURL}
            data-capture="result-img"
            style={{ minHeight: 160, height: 160, minWidth: 10 }}
          />
          <Label font="head2" color="textStrongest">
            {resultLabel}
          </Label>
          <Spacing size={8} />
        </Title.BoardTitleContainer>
      </>
    );
  };

  return (
    <>
      <ResultTitle />
      <Spacing size={12} />
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
    </>
  );
};

export default ResultBoard;
