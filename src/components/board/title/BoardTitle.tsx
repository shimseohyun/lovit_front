import * as S from "./BoardTitle.styled";

import {
  useBoardState,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";

type Parms = {
  newDataID: number;
};

const BoardTitle = (parms: Parms) => {
  const { title } = useBoardState();
  const { summaryData } = useBoardStatic();
  const { newDataID } = parms;
  const newData = summaryData[newDataID];

  const getTitle = () => {
    if (title === undefined) {
      return <S.BoardTitle>어디에 속하나요?</S.BoardTitle>;
    }

    if (title.groupName !== undefined) {
      return (
        <S.BoardTitle>
          <S.BoardTitleChip>{title.groupName}</S.BoardTitleChip>{" "}
          <span>예요</span>
        </S.BoardTitle>
      );
    } else if (title.comparisonID !== undefined) {
      return (
        <S.BoardTitle>
          <S.BoardTitleChip>
            {summaryData[title.comparisonID].name}
          </S.BoardTitleChip>
          <span>보다</span>
          <S.BoardTitleChip>{title.comparisonLabel}</S.BoardTitleChip>
          <span>예요</span>
        </S.BoardTitle>
      );
    }
  };

  const {} = parms;
  return (
    <>
      <S.BoardTitleContainer>
        <S.BoardTitleImg src={newData.thumbnaeilURL} />
        <S.BoardTitle>
          {newData.name}
          <span>은</span>
        </S.BoardTitle>

        {getTitle()}
      </S.BoardTitleContainer>
      <S.BoardSubTitle>세부적인 내용을 작성해요</S.BoardSubTitle>
    </>
  );
};

export default BoardTitle;
