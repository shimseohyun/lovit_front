import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";

import { getBoard } from "@dataV03/itemSummary";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

type Parms = {
  boardID: number;
};

const GroupAllCard = (parms: Parms) => {
  const { boardID } = parms;
  const navigate = useNavigate();
  const board = getBoard(boardID);

  if (board === undefined) return;

  return (
    <Wrapper onClick={() => navigate(`/evaluate/${boardID}`)}>
      <img src={board.randomButtonURL} />
      <Flex
        padding=" 10px 10px 16px 10px"
        alignItem="center"
        justifyContent="center"
      >
        <Label font={"element1"} color="textLight">
          추천하는 순서로 할게요!
        </Label>
      </Flex>
    </Wrapper>
  );
};

export default GroupAllCard;

const Wrapper = styled.button`
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}

  > img {
    width: 100%;
  }
`;
