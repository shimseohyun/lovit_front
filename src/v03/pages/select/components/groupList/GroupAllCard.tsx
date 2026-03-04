import LoginBottomsheet from "@componentsV03/bottomsheet/contents/LoginBottomsheet";
import FillButton from "@componentsV03/button/FillButton";
import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { maxItemCount } from "@constantsV03/auth";

import { getBoard } from "@dataV03/itemSummary";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useGetUserBoardData } from "@hooksV03/api/userBoardData";
import { useAuth } from "@hooksV03/auth/useAuth";

import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import { EVALUATE, RESULT } from "@routersV03/path";
import { useNavigate } from "react-router-dom";

type Parms = {
  boardID: number;
  isResult: boolean;
  isCurrent: boolean;
};

const GroupAllCard = (parms: Parms) => {
  const { isLoggedIn } = useAuth();

  const { boardID, isResult, isCurrent } = parms;
  const navigate = useNavigate();
  const board = getBoard(boardID);

  const { data } = useGetUserBoardData({
    boardID: boardID,
  });

  const { filteredItemList, itemList, totalItemCount } = data;
  const { openBottomSheet } = useBottomSheet();

  if (board === undefined) return;
  const isFin = filteredItemList.length >= totalItemCount;
  const isStart = filteredItemList.length > 0;
  const isNeedLogin = !isLoggedIn && itemList.length >= maxItemCount;

  const path = isResult || isFin ? RESULT(boardID) : EVALUATE(boardID);

  const theme = useTheme();
  if (isResult)
    return (
      <FillButton
        onClick={() => navigate(path)}
        children="전체 결과"
        style={{
          border: isCurrent
            ? `2px solid ${theme.strokeColors.strokeStorngest}`
            : ``,
        }}
      />
    );

  return (
    <Wrapper
      onClick={
        isStart || !isNeedLogin
          ? () => navigate(path)
          : () => openBottomSheet(<LoginBottomsheet />)
      }
    >
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
