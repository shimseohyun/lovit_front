import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ActionButton = styled.button`
  width: 80px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  > .icon {
    width: 56px;
    height: 56px;
    border-radius: 656px;
    ${(p) => css`
      background-color: ${p.theme.foregroundColors.foregroundLighter};
    `}
  }
`;
