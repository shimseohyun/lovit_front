import * as Title from "@componentsV02/title/Title.styled";

import EvaluationBoard from "@componentsV02/board/evaluationBoard/EvaluationBoard";
import useGetBoardResult from "@hooksV02/board/useGetBoardResult";

import { FACE_BOARD_INFO } from "@dataV02/boardInfoDummy";
import { useGetUserBoardData } from "@hooksV02/api/userBoardData";
import { useAuth } from "@hooksV02/auth/useAuth";
import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";
import ResultPoly from "./ResultPoly";

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
          <Title.BoardTitleItemImg src={result.img} />
          <span>{result.label}</span>
        </Title.BoardTitleContainer>

        <Title.BoardTitleDescription>
          사분면을 토대로 취향을 분석했어요!
        </Title.BoardTitleDescription>
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
      <div style={{ width: "100%", height: "40px", flexShrink: 0 }} />
    </>
  );
};

export default Result;
