import Label from "@componentsV03/label/Label";
import { getItemGroup } from "@dataV03/itemSummary";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

type Parms = {
  boardID: number;
  groupID: number;
};

const GroupCard = (parms: Parms) => {
  const navigate = useNavigate();
  const { boardID, groupID } = parms;
  const group = getItemGroup(boardID, groupID);

  return (
    <Wrapper onClick={() => navigate(`/evaluate/${boardID}/${groupID}`)}>
      <img src={group.logoURL} />
      <Label font="body2" color="textLighter">
        {group.name}
      </Label>
    </Wrapper>
  );
};

export default GroupCard;

const Wrapper = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 16px 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}

  > img {
    width: 40px;
    height: 40px;
    aspect-ratio: 1/1;
  }
`;
