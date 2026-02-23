import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.nav`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button .label {
    ${(p) => css`
      ${p.theme.fonts.body3B}
      color: ${p.theme.fontColors.textLighter};
      background-color: ${p.theme.foregroundColors.foregroundLighter};
      padding: 4px 8px;
      border-radius: 8px;
    `}
  }
`;

export const LabelButton = styled.button`
  ${(p) => css`
    ${p.theme.fonts.body3B}
    color: ${p.theme.fontColors.textLighter};
    background-color: ${p.theme.foregroundColors.foregroundLighter};
    padding: 4px 8px;
    border-radius: 8px;
  `}
`;
