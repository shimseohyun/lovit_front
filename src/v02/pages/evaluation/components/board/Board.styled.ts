import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 10px 16px 0 16px;

  ${(p) => css`
    ${p.theme.fonts.head1}
    color:${p.theme.fontColors.titleStrongest};
  `}
`;

export const BoardTitleMain = styled.div`
  padding-top: 4px;
  ${(p) => css`
    ${p.theme.fonts.head1}
    color:${p.theme.fontColors.titleStrongest};
  `}
`;

export const BoardTitleDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding-top: 4px;
  padding-bottom: 12px;

  ${(p) => css`
    ${p.theme.fonts.body2}
    color:${p.theme.fontColors.textLightest};
  `}
`;

export const BoardTitleItemSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h6 {
    ${(p) => css`
      ${p.theme.fonts.body3}
      color:${p.theme.fontColors.textLighter};
    `}
  }

  > h3 {
    ${(p) => css`
      ${p.theme.fonts.head2}
      color:${p.theme.fontColors.titleStrongest};
    `}
  }
`;

export const BoardTitleItemImg = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 8px;
  aspect-ratio: 3/4;
  margin-bottom: 12px;

  object-fit: cover;
`;

export const BoardTitleSubContainer = styled.h1`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8px 0 4px 0;
  gap: 4px;
`;

export const BoardTitleSubWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;

  ${(p) => css`
    ${p.theme.fonts.narrative}
    color: ${p.theme.fontColors.titleStronger};
  `}
  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      opacity: 30%;
    `}
`;

export const BoardTitleSubChip = styled.div`
  padding: 4px 10px;

  border-radius: 80px;

  ${(p) => css`
    ${p.theme.fonts.narrative}
    background-color:${p.theme.foregroundColors.foregroundLighter};
  `}
`;

export const BoardRateContaienr = styled.div`
  width: 100%;
  padding: 10px 24px 20px 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${(p) => css`
    ${p.theme.fonts.body2B}
    color: ${p.theme.fontColors.textLight};
  `}
`;
