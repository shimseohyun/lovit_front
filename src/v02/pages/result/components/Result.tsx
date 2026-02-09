import * as Title from "@componentsV02/title/Title.styled";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV02/board/useGetBoardResult";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";
import { useGetUserBoardData } from "@hooksV02/api/userBoardData";
import { useAuth } from "@hooksV02/auth/useAuth";
import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";
import ResultPoly from "./ResultPoly";

import Spacing from "@componentsV02/spacing/Spacing";

import ResultCellLsit from "./cell/ResultCellList";
import useResultCell from "./cell/useResultCell";
import ResultCell from "./cell/ResultCell";
import { useGetTotalBoardData } from "@hooksV02/api/userTotalData";

const Result = () => {
  const { user } = useAuth();
  const { data, isFetching } = useGetUserBoardData(user?.uid);

  const { horizontal, vertical, hasNoCalcData, topLikedItemIdList } =
    useGetBoardResult({
      vertical: data.axis.VERTICAL,
      horizontal: data.axis.HORIZONTAL,
      preference: data.axis.PREFERENCE,
      itemList: data.itemList,
    });

  const { points, likedPointsList } = useGetBoardPoint({
    vertical: data.axis.VERTICAL,
    horizontal: data.axis.HORIZONTAL,
    preference: data.axis.PREFERENCE,
    itemList: data.itemList,
    likedItemList: topLikedItemIdList,
  });

  const { data: totalBoardDataDict } = useGetTotalBoardData();
  const { resultDict } = useResultCell({
    data: totalBoardDataDict,
    itemList: data.itemList,
    boardInfromation: FACE_BOARD_INFO,
    itemPositionDict: {
      HORIZONTAL: data.axis.HORIZONTAL.itemPositionDict,
      VERTICAL: data.axis.VERTICAL.itemPositionDict,
      PREFERENCE: data.axis.PREFERENCE.itemPositionDict,
    },
  });

  const verticalZone = vertical.zone;
  const horizontalZone = horizontal.zone;

  const horizontalVariance = horizontal.profile;
  const verticalValVariance = vertical.profile;

  const focus =
    verticalZone === "MIDDLE" && horizontalZone === "MIDDLE"
      ? horizontalVariance === "FOCUSED" && verticalValVariance === "FOCUSED"
        ? 0
        : 1
      : 0;

  const result =
    FACE_BOARD_INFO.resultDict[verticalZone][horizontalZone][focus];

  const CurrentTitle = () => {
    if (hasNoCalcData) return <div>없어요!</div>;
    return (
      <>
        <Title.BoardTitleContainer>
          <img src={result.img} />
          <span>{result.label}</span>
        </Title.BoardTitleContainer>
      </>
    );
  };

  if (isFetching) {
    return <div>결과를 로딩중</div>;
  }
  if (data.itemList.length === 0) {
    return <div>아직 결과가 없어요</div>;
  }

  return (
    <>
      <CurrentTitle />
      <EvaluationBoard
        boardInformation={FACE_BOARD_INFO}
        itemList={data.itemList}
        itemPointDict={points}
      >
        <ResultPoly points={likedPointsList} />
      </EvaluationBoard>
      <Spacing size={40} />

      <ResultCellLsit>
        {Object.keys(resultDict).map((idx) => {
          const result = resultDict[Number(idx)];
          if (result === undefined) return;
          return <ResultCell key={idx} {...result} />;
        })}
      </ResultCellLsit>
    </>
  );
};

export default Result;
