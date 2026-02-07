import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: pre-wrap;

  width: 100%;

  ${(p) => css`
    ${p.theme.fonts.head1}
    color:${p.theme.fontColors.titleStrongest};
  `}
`;

export const BoardTitleMain = styled.div`
  ${(p) => css`
    ${p.theme.fonts.head1}
    color:${p.theme.fontColors.textStrongest};
  `}
`;

export const BoardTitleDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  white-space: pre-wrap;

  width: 100%;

  flex-shrink: 0;

  ${(p) => css`
    ${p.theme.fonts.body1}
    color:${p.theme.fontColors.textLightest};
  `}
`;

export const BoardTitleInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  width: 100%;

  flex-shrink: 0;

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
  width: calc(3 * 40px);
  height: calc(4 * 40px);
  border-radius: 8px;
  aspect-ratio: 3/4;

  object-fit: cover;
`;

export const BoardTitleSubContainer = styled.h1`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
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
      opacity: 15%;
    `}
`;

export const BoardTitleSubChip = styled.div`
  border-radius: 80px;

  ${(p) => css`
    ${p.theme.fonts.narrative}
    background-color:${p.theme.foregroundColors.foregroundLighter};
  `}
`;
