import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BoardRateContaienr = styled.div`
  width: 100%;
  padding: 10px 24px 20px 24px;

  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${(p) => css`
    ${p.theme.fonts.body2B}
    color: ${p.theme.fontColors.textLight};
  `}
`;

export const SwipePreferenceBoardContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  padding-top: 20px;
  overflow: visible;
`;

export const SwipeBoardContainer = styled.section`
  width: 100%;

  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  overflow: hidden;
`;
