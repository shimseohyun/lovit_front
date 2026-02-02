import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100svh;
  max-width: 100svh;
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

  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
