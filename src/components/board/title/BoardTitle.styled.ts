import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BoardTitleContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${(p) => css`
    ${p.theme.fonts.narrative}
    color: ${p.theme.fontColors.titleStrongest};
  `}
`;

export const BoardTitleImg = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 4px;

  border-radius: 50%;
  object-fit: cover;

  ${(p) => css`
    border-radius: 1px solid ${p.theme.strokeColors.strokeLighter};
  `}
`;

export const BoardTitle = styled.div`
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const BoardTitleChip = styled.div`
  padding: 4px 10px;
  border-radius: 80px;

  ${(p) => css`
    display: flex;
    flex-direction: row;
    gap: 4px;
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}
`;

export const BoardSubTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0px 8px 0px;

  ${(p) => css`
    ${p.theme.fonts.body3}
    color: ${p.theme.fontColors.textLightest};
  `}
`;
