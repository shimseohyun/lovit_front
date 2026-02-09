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
