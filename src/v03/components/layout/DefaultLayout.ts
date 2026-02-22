import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100svh;
  max-height: 100svh;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  transform: translateX(-50%);
  left: 50%;

  ${(p) => css`
    max-width: ${p.theme.maxWidth};
  `}
`;

export const PageViewPort = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
`;

export const PageViewPortScroll = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
`;

export const Section = styled.section<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px 16px;

  > span {
    ${(p) => css`
      ${p.theme.fonts.body2};
      color: ${p.theme.fontColors.textLightest};
    `}
  }

  > .subTitle {
    ${(p) => css`
      ${p.theme.fonts.body1};
      color: ${p.theme.fontColors.textLight};
    `}
  }

  ${({ $gap }) => css`
    gap: ${$gap !== undefined ? $gap : 0}px;
  `}
`;

export const Separator = styled.div<{ $size: number }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  margin: 12px 0px;
  ${({ $size }) => css`
    height: ${$size}px;
  `}

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}
`;
