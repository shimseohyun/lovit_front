import * as Title from "@componentsV03/title/Title.styled";

import EvaluationBoard from "@componentsV03/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV03/board/useGetBoardResult";

import { FACE_BOARD_INFO } from "@dataV03/boardInfoDummy";

import useGetBoardPoint from "@hooksV03/board/useGetBoardPoint";
import ResultPoly from "./ResultPoly";

import useResultCell from "./cell/useResultCell";
import ResultCell from "./cell/ResultCell";

import type { GetUserBoardDataReturn } from "@apisV03/firebase/domain/user";
import type { GetTotalBoardDataReturn } from "@apisV03/firebase/domain/total";
import { Section } from "@componentsV03/layout/DefaultLayout";

import { BoardPoint, ResultCellTitle } from "./cell/ResultCell.styld";
import Spacing from "@componentsV03/spacing/Spacing";

type Parms = {
  userBoardData: GetUserBoardDataReturn;
  totalBoardDataDict: GetTotalBoardDataReturn;
};

const Result = (parms: Parms) => {
  const { userBoardData, totalBoardDataDict } = parms;
  const { itemList, axis } = userBoardData;

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

  const { resultDict } = useResultCell({
    data: totalBoardDataDict,
    itemList,
    boardInfromation: FACE_BOARD_INFO,
    itemPositionDict,
  });

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
        <>
          <Title.BoardTitleContainer>
            아직 취향을 발견하지 못했어요.
          </Title.BoardTitleContainer>
          <Spacing size={20} />
          {/* 
          <Title.BoardDescription>
            사분면을 채울수록 정확해져요!
          </Title.BoardDescription> */}
        </>
      );
    } else {
      console.log(result().img);
      return (
        <>
          <Title.BoardTitleContainer>
            <span>{result().label}</span>
            <Title.BoardTitleImg
              $imgURL={result().img}
              style={{ height: 160 }}
            />
          </Title.BoardTitleContainer>

          <Title.BoardDescription>
            사분면을 바탕으로 취향을 찾았어요!
          </Title.BoardDescription>
        </>
      );
    }
  };

  return (
    <>
      <ResultTitle />

      <EvaluationBoard
        boardInformation={FACE_BOARD_INFO}
        itemList={itemList}
        itemPointDict={points}
      >
        <ResultPoly points={likedPointsList} />
      </EvaluationBoard>

      {itemList.length > 0 && (
        <>
          <Spacing size={20} />
          <Section $gap={20}>
            <ResultCellTitle>
              <span>다른 유저와 비교해요!</span>

              <div className="hint">
                <span>
                  <BoardPoint $isUser={false} />
                  <span>평균</span>
                </span>
                <span>
                  <BoardPoint $isUser={true} />
                  <span>내 평가</span>
                </span>
              </div>
            </ResultCellTitle>
            {Object.entries(resultDict)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([idx, cell]) => {
                if (!cell) return null;
                return <ResultCell key={idx} {...cell} />;
              })}
          </Section>
        </>
      )}

      <Spacing size={40} />
    </>
  );
};

export default Result;
