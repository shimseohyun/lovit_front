import * as Title from "@componentsV02/title/Title.styled";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV02/board/useGetBoardResult";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";
import { useGetUserBoardData } from "@hooksV02/api/userBoardData";
import { useAuth } from "@hooksV02/auth/useAuth";
import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";
import ResultPoly from "./ResultPoly";

import useResultCell from "./cell/useResultCell";
import ResultCell from "./cell/ResultCell";
import { useGetTotalBoardData } from "@hooksV02/api/userTotalData";

import type { GetUserBoardDataReturn } from "@apisV02/firebase/domain/user";
import type { GetTotalBoardDataReturn } from "@apisV02/firebase/domain/total";
import { Section, Separator } from "@componentsV02/layout/DefaultLayout";

import { BoardPoint, ResultCellTitle } from "./cell/ResultCell.styld";
import Spacing from "@componentsV02/spacing/Spacing";
import MoreButton from "./MoreButton";
import FullSpinner from "@componentsV02/spinner/Spinner";

type Parms = {
  userBoardData: GetUserBoardDataReturn;
  totalBoardDataDict: GetTotalBoardDataReturn;
};

const ResultContent = (parms: Parms) => {
  const { userBoardData, totalBoardDataDict } = parms;
  const { itemList, axis } = userBoardData;

  const { horizontal, vertical, hasNoCalcData, topLikedItemIdList } =
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
    likedItemList: topLikedItemIdList,
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

          <Title.BoardDescription>
            사분면을 채울수록 정확해져요!
          </Title.BoardDescription>
        </>
      );
    } else {
      return (
        <>
          <Title.BoardTitleContainer>
            <img src={result().img} alt={result().label} />
            <span>{result().label}</span>
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

      <Section $gap={8}>
        <MoreButton isMore={userBoardData.isMore} />
      </Section>

      {itemList.length > 0 && (
        <>
          <Separator $size={8} />
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
      {/* <Separator $size={8} />
      <Section>
        <ResultCellTitle>
          <span>원하는 인물이 없었나요?</span>
        </ResultCellTitle>
        <FillButton>인물 제안하기</FillButton>
      </Section> */}
      <Spacing size={40} />
    </>
  );
};

const Result = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  const { data: userBoardData, isFetching: isUserBoardFetching } =
    useGetUserBoardData(uid);
  const { data: totalBoardDataDict, isFetching: isTotalBoardFetching } =
    useGetTotalBoardData();

  if (isUserBoardFetching || isTotalBoardFetching) return <FullSpinner />;

  return (
    <ResultContent
      userBoardData={userBoardData}
      totalBoardDataDict={totalBoardDataDict}
    />
  );
};

export default Result;
