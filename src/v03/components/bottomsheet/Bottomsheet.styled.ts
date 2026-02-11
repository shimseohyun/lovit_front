import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Viewport = styled.div`
  z-index: 100;
  width: 100%;
  height: 100svh;

  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: end;

  background-color: #00000040;

  ${(p) => css`
    max-width: ${p.theme.maxWidth};
  `}
`;

export const Container = styled.div`
  z-index: 100;

  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0px;

  width: 100%;
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  padding: 20px 16px 20px 16px;

  ${(p) => css`
    max-width: ${p.theme.maxWidth};
  `}
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;

  margin-bottom: 12px;
  > h3 {
    ${(p) => css`
      ${p.theme.fonts.head2}
      color:${p.theme.fontColors.titleStrongest}
    `}
  }

  > span {
    ${(p) => css`
      ${p.theme.fonts.body1}
      color:${p.theme.fontColors.textLight}
    `}
  }
`;
