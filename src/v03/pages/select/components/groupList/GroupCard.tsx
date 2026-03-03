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
};

const GroupCard = (parms: Parms) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const { boardID, groupID } = parms;
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
  const isFin = filteredItemList.length >= list.length;
  const isNeedLogin = !isLoggedIn && itemList.length >= maxItemCount;

  const path = isFin ? RESULT(boardID, groupID) : EVALUATE(boardID, groupID);
  return (
    <Wrapper
      $isFin={isFin}
      onClick={
        isStart || !isNeedLogin
          ? () => navigate(path)
          : () => openBottomSheet(<LoginBottomsheet />)
      }
    >
      <Flex
        width="100%"
        direction="column"
        alignItem="center"
        gap="10px"
        style={{ opacity: isFin ? 0.4 : 1 }}
      >
        <img src={group.logoURL} />
        <Label font="body3" color="textLighter">
          {group.name}
        </Label>
      </Flex>
    </Wrapper>
  );
};

export default GroupCard;

const Wrapper = styled.button<{ $isFin: boolean }>`
  cursor: pointer;
  width: 100%;
  padding: 16px 4px;

  border-radius: 12px;

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}

  img {
    width: 60px;
    height: 60px;
    aspect-ratio: 1/1;
  }
`;
