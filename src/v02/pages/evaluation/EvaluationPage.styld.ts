import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  max-height: 100svh;

  display: flex;

  position: fixed;
  transform: translateX(-50%);
  left: 50%;

  flex-direction: column;

  ${(p) => css`
    max-width: ${p.theme.maxWidth};
  `}
`;

export const ViewPort = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
`;
