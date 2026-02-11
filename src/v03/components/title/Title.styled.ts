import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BoardDescription = styled.div`
  padding: 4px 16px 12px 16px;

  ${(p) => css`
    ${p.theme.fonts.body1}
    color:${p.theme.fontColors.textLightest};
  `}
`;

export const BoardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;

  padding: 10px 16px 0 16px;

  width: 100%;

  ${(p) => css`
    ${p.theme.fonts.head1}
    color:${p.theme.fontColors.titleStrongest};
  `}
  > h1 {
    ${(p) => css`
      ${p.theme.fonts.head1}
      color:${p.theme.fontColors.textStrongest};
    `}
  }
  > h6 {
    padding-bottom: 4px;
    ${(p) => css`
      ${p.theme.fonts.body1}
      color:${p.theme.fontColors.textLighter};
    `}
  }

  > img {
    width: calc(3 * 35px);
    height: calc(4 * 35px);
    border-radius: 8px;
    aspect-ratio: 3/4;

    margin-top: 10px;
    margin-bottom: 12px;
    object-fit: cover;
  }

  > .name {
    ${(p) => css`
      ${p.theme.fonts.head2}
      color:${p.theme.fontColors.titleStrongest};
    `}
  }
  > .category {
    ${(p) => css`
      ${p.theme.fonts.body3}
      color:${p.theme.fontColors.textLighter};
    `}
  }
`;

export const BoardTitleSubContainer = styled.h1`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
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
    color: ${p.theme.fontColors.textLightest};
  `}

  ${({ $isSelected }) => css`
    opacity: ${$isSelected ? 100 : 15}%;
  `}
`;

export const BoardTitleGroupWrapper = styled.div`
  display: flex;
  padding-bottom: 12px;
  align-items: center;
  justify-content: center;

  gap: 4px;
`;

export const BoardTitelGroupChip = styled.div`
  display: flex;
  padding-bottom: 8px;
  justify-content: center;
  align-items: center;
  gap: 2px;

  ${(p) => css`
    ${p.theme.fonts.body3}
    color: ${p.theme.fontColors.textLightest};
  `}
`;

export const BoardTitleSubChip = styled.div<{
  $lightColor?: string;
  $lighterColor?: string;
  $isMinus?: boolean;
}>`
  border-radius: 80px;
  padding: 4px 10px;
  ${({ $isMinus }) => css`
    opacity: ${$isMinus === true ? 50 : 100}%;
  `}

  ${(p) => {
    if (p.$lightColor && p.$lighterColor)
      return css`
        ${p.theme.fonts.narrative}
        color: ${p.$lightColor};
        background-color: ${p.$lighterColor};
      `;

    return css`
      ${p.theme.fonts.narrative}
      color: ${p.theme.fontColors.titleStronger};
      background-color: ${p.theme.foregroundColors.foregroundLighter};
    `;
  }}
`;
