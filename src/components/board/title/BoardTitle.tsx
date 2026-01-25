import useGetResult from "@hooks/result/useGetResult";
import * as S from "./BoardTitle.styled";

import {
  useBoardState,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";
import type { Step } from "@hooks/board/type";

type Parms = {
  newDataID: number;
  step: Step;
};

const BoardTitle = (parms: Parms) => {
  const { newDataID, step } = parms;

  const { title, likeList, slot } = useBoardState();
  const { summaryData, getPoints } = useBoardStatic();

  const newData = summaryData[newDataID];

  const { config } = useBoardStatic();
  const points = getPoints(likeList, config.screenWidth);

  const { label, img } = useGetResult({
    points: points,
    screenSize: config.screenWidth,
  });

  if (newData === undefined && step !== "RESULT") return;
  if (step === "RESULT") {
    return (
      <>
        <S.BoardTitleContainer>
          <S.BoardTitleImg src={img} />
          <S.BoardTitle>{label}</S.BoardTitle>
        </S.BoardTitleContainer>
        <S.BoardSubTitle>사분면을 토대로 취향을 찾았어요!</S.BoardSubTitle>
      </>
    );
  }

  // Touch Board
  if (step === "BOARD" && slot === undefined) {
    return (
      <>
        <S.BoardTitleContainer>
          <S.BoardTitleImg src={newData.thumbnaeilURL} />
          <S.BoardTitle>{newData.name}</S.BoardTitle>

          <S.BoardTitle>어디에 속하나요?</S.BoardTitle>
        </S.BoardTitleContainer>
        <S.BoardSubTitle>
          사분면에서 꼭 맞는 그룹을 선택할 수 있어요.
        </S.BoardSubTitle>
      </>
    );
  }

  // Swipe Board
  if (step === "BOARD" && slot !== undefined) {
    if (title === undefined) {
      // 아무것도 선택하지 않았을 경우
      return (
        <>
          <S.BoardTitleContainer>
            <S.BoardTitleImg src={newData.thumbnaeilURL} />
            <S.BoardTitle>{newData.name}</S.BoardTitle>
            <S.BoardTitle>드래그해서 딱 맞는 위치에 놓아주세요!</S.BoardTitle>
          </S.BoardTitleContainer>
          <S.BoardSubTitle>
            상하좌우로 드래그해서 점에 놓을 수 있어요.
          </S.BoardSubTitle>
        </>
      );
    }

    if (title.groupName !== undefined) {
      // 그룹일 경우
      return (
        <>
          <S.BoardTitleContainer>
            <S.BoardTitleImg src={newData.thumbnaeilURL} />
            <S.BoardTitle>{newData.name}</S.BoardTitle>
            <S.BoardTitle>
              <S.BoardTitleChip>{title.groupName}</S.BoardTitleChip>{" "}
              <span>예요</span>
            </S.BoardTitle>
          </S.BoardTitleContainer>
          <S.BoardSubTitle>
            상하좌우로 드래그해서 점에 놓을 수 있어요.
          </S.BoardSubTitle>
        </>
      );
    } else if (title.comparisonID !== undefined) {
      // 사람일 경우
      return (
        <>
          <S.BoardTitleContainer>
            <S.BoardTitleImg src={newData.thumbnaeilURL} />
            <S.BoardTitle>{newData.name}</S.BoardTitle>
            <S.BoardTitle>
              <S.BoardTitleChip>
                {summaryData[title.comparisonID].name}
              </S.BoardTitleChip>
              <span>보다</span>
              <S.BoardTitleChip>{title.comparisonLabel}</S.BoardTitleChip>
              <span>예요</span>
            </S.BoardTitle>
          </S.BoardTitleContainer>
          <S.BoardSubTitle>
            상하좌우로 드래그해서 점에 놓을 수 있어요.
          </S.BoardSubTitle>
        </>
      );
    }
  }
};

export default BoardTitle;
