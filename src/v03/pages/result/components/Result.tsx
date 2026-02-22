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
import { Section, Separator } from "@componentsV03/layout/DefaultLayout";

import { BoardPoint } from "./cell/ResultCell.styld";
import Spacing from "@componentsV03/spacing/Spacing";
import Share from "./share/Share";
import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";

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
            <h2>아직 취향을 발견하지 못했어요.</h2>
          </Title.BoardTitleContainer>
        </>
      );
    } else {
      return (
        <>
          <Title.BoardTitleContainer>
            <h6>나의 취향은...</h6>
            <h1>{result().label}</h1>
            <Spacing size={8} />

            <Title.BoardTitleImg
              $imgURL={result().img}
              style={{ minHeight: 260, height: 148, minWidth: 10 }}
            />
          </Title.BoardTitleContainer>
        </>
      );
    }
  };

  const Board = () => {
    return (
      <EvaluationBoard
        boardSize={350}
        boardInformation={FACE_BOARD_INFO}
        itemList={itemList}
        itemPointDict={points}
      >
        <ResultPoly points={likedPointsList} />
      </EvaluationBoard>
    );
  };

  const TotalResultList = () => {
    return (
      itemList.length > 0 && (
        <>
          <Section $gap={20}>
            <Flex
              justifyContent="space-between"
              alignItem="center"
              width="100%"
            >
              <Label font="head2" color="titleStrongest">
                다른 유저와 비교해요!
              </Label>

              <Flex gap="12px">
                <Flex gap="2px" alignItem="center" justifyContent="center">
                  <BoardPoint $isUser={false} />
                  <Label font="body3" color="textLighter">
                    평균
                  </Label>
                </Flex>

                <Flex gap="2px" alignItem="center" justifyContent="center">
                  <BoardPoint $isUser={true} />
                  <Label font="body3" color="textLighter">
                    내 평가
                  </Label>
                </Flex>
              </Flex>
            </Flex>

            {Object.entries(resultDict)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([idx, cell]) => {
                if (!cell) return null;
                return <ResultCell key={idx} {...cell} />;
              })}
          </Section>
        </>
      )
    );
  };
  return (
    <>
      <ResultTitle />
      <Spacing size={12} />
      <Board />
      <Spacing size={12} />
      <Share />
      <Separator $size={8} />
      <TotalResultList />
      <Spacing size={40} />
    </>
  );
};

export default Result;
