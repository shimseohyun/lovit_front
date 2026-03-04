import LoginBottomsheet from "@componentsV03/bottomsheet/contents/LoginBottomsheet";
import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { maxItemCount } from "@constantsV03/auth";
import { getItemGroup } from "@dataV03/itemSummary";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useGetUserBoardData } from "@hooksV03/api/userBoardData";
import { useAuth } from "@hooksV03/auth/useAuth";

import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import { EVALUATE, RESULT } from "@routersV03/path";
import { useNavigate } from "react-router-dom";

type Parms = {
  boardID: number;
  groupID: number;
  isResult: boolean;
  isCurrent: boolean;
};

const GroupCard = (parms: Parms) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const { boardID, groupID, isResult, isCurrent } = parms;
  const group = getItemGroup(boardID, groupID);

  const { data } = useGetUserBoardData({
    boardID: boardID,
  });
  const { itemList } = data;

  const { openBottomSheet } = useBottomSheet();

  const list = group.itemIDList;
  const checkedGroupIDSet = new Set(list);
  const filteredItemList = itemList.filter((id) => checkedGroupIDSet.has(id));

  const isStart = filteredItemList.length > 0;
  const disable = isResult ? !isStart : filteredItemList.length >= list.length;
  const isNeedLogin = !isLoggedIn && itemList.length >= maxItemCount;

  const path =
    isResult || disable ? RESULT(boardID, groupID) : EVALUATE(boardID, groupID);
  return (
    <Wrapper
      $isCurrent={isCurrent}
      onClick={
        isResult && disable
          ? () => {}
          : isStart || !isNeedLogin
            ? () => navigate(path)
            : () => openBottomSheet(<LoginBottomsheet />)
      }
      style={{ opacity: disable ? 0.4 : 1 }}
    >
      <Flex width="100%" direction="column" alignItem="center" gap="10px">
        <img src={group.logoURL} />
        <Label font="body3" color="textLighter">
          {group.name}
        </Label>
      </Flex>
    </Wrapper>
  );
};

export default GroupCard;

const Wrapper = styled.button<{ $isCurrent: boolean }>`
  cursor: pointer;
  width: 100%;
  padding: 16px 4px;

  border-radius: 12px;

  ${({ theme, $isCurrent }) => css`
    background-color: ${theme.foregroundColors.foregroundLighter};
    border: solid 2px
      ${$isCurrent
        ? theme.strokeColors.strokeStorngest
        : theme.foregroundColors.foregroundLighter};
  `}

  img {
    width: 60px;
    height: 60px;
    aspect-ratio: 1/1;
  }
`;
