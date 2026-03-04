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

  const { filteredItemList, itemList, groupItemCount } = data;
  const { openBottomSheet } = useBottomSheet();

  if (board === undefined) return;
  const isFin = filteredItemList.length >= groupItemCount;
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
        padding=" 12px 10px"
        alignItem="center"
        justifyContent="center"
        style={{ position: "relative", overflow: "visible" }}
      >
        <Label font={"element1"} color="textLight">
          추천순으로 진행할게요!
        </Label>
      </Flex>
    </Wrapper>
  );
};

export default GroupAllCard;

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  gap: 0;

  ${({ theme }) => css`
    background-color: ${theme.foregroundColors.foregroundLighter};
    border: solid 1px ${theme.foregroundColors.foregroundLight};
  `}

  > img {
    width: 100%;
    aspect-ratio: 2/1;
    object-fit: cover;
  }
`;
