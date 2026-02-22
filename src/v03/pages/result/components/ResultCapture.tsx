import * as Title from "@componentsV03/title/Title.styled";

import Spacing from "@componentsV03/spacing/Spacing";
import EvaluationBoard from "@componentsV03/board/evaluationBoard/EvaluationBoard";
import { FACE_BOARD_INFO } from "@dataV03/boardInfoDummy";
import ResultPoly from "./ResultPoly";

import type {
  ItemIDList,
  UserPoint,
  UserPointDict,
} from "@interfacesV03/data/user";
import styled from "@emotion/styled";

const FixedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: ${(p) => p.theme.maxWidth};
  height: 100svh;
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  top: 0;
  background-color: white;
  z-index: 9999;
`;

type Parms = {
  hasNoCalcData: boolean;
  resultImgURL: string;
  resultLabel: string;

  itemList: ItemIDList;
  itemPointDict: UserPointDict;
  points: UserPoint[];
};

const ResultCapture = (parms: Parms) => {
  const {
    hasNoCalcData,
    resultImgURL,
    resultLabel,
    itemList,
    itemPointDict,
    points,
  } = parms;
  const BoardTitle = () => {
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
            <Title.BoardTitleImg
              $imgURL={resultImgURL}
              style={{ minHeight: 160, height: 160, minWidth: 10 }}
            />
            <h2>{resultLabel}</h2>
            <Spacing size={4} />
          </Title.BoardTitleContainer>
        </>
      );
    }
  };

  const Board = () => {
    return (
      <EvaluationBoard
        boardInformation={FACE_BOARD_INFO}
        itemList={itemList}
        itemPointDict={itemPointDict}
      >
        <ResultPoly points={points} />
      </EvaluationBoard>
    );
  };

  return (
    <FixedContainer>
      <div style={{ padding: 16 }}>
        <BoardTitle />
        <Spacing size={4} />
        <Board />
      </div>
    </FixedContainer>
  );
};

export default ResultCapture;
