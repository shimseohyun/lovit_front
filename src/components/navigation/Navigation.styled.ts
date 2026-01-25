import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  height: 32px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  ${(p) => css`
    max-width: ${p.theme.maxWidth};
  `}

  padding: 0px 12px;
`;

export const Padding = styled.div`
  height: 32px;
  width: 100%;

  flex-shrink: 0;
`;
