import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BottomButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  gap: 12px;
  align-items: center;
  justify-content: end;

  width: 100%;
  padding: 16px 12px;
`;
export const LikeButton = styled.button`
  cursor: pointer;
  height: 40px;
  border-radius: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);

  ${(p) => css`
    border: 1px solid ${p.theme.strokeColors.strokeLighter};
    ${p.theme.fonts.element1}
    color: ${p.theme.fontColors.textLight};
  `}
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: 48px;

  border-radius: 10px;

  ${(p) => css`
    ${p.theme.fonts.element1}

    background-color: ${p.theme.foregroundColors.foregroundStrongest};
    color: ${p.theme.fontColors.textInverseLight};
  `}
`;
