import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ActionButton = styled.button`
  width: 72px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  > .icon {
    width: 48px;
    height: 48px;
    border-radius: 48px;
    ${(p) => css`
      background-color: ${p.theme.foregroundColors.foregroundLighter};
    `}
  }
`;
