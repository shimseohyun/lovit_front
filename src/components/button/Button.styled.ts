import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BottomButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  gap: 10px;
  align-items: center;
  justify-content: end;

  width: 100%;
  padding: 10px 12px;
`;
export const LikeButton = styled.button<{ isSelected: boolean }>`
  cursor: pointer;
  height: 40px;
  border-radius: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 80px);

  ${(p) => {
    if (p.isSelected)
      return css`
        border: 1px solid #ff8f8f;
        color: #ff8f8f;
        ${p.theme.fonts.element1}
        background-color: #FFF4F4;
      `;
    else
      return css`
        border: 1px solid ${p.theme.strokeColors.strokeLighter};
        ${p.theme.fonts.element1}
        color: ${p.theme.fontColors.textLight};
      `;
  }}

  gap:10px
`;

export const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 48px;

  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0px 20px;
  ${(p) => {
    if (p.disabled)
      return css`
        ${p.theme.fonts.element1}

        background-color: ${p.theme.foregroundColors.foregroundLighter};
        color: ${p.theme.fontColors.textDisable};
      `;
    else
      return css`
        ${p.theme.fonts.element1}

        background-color: ${p.theme.foregroundColors.foregroundStrongest};
        color: ${p.theme.fontColors.textInverseLight};
        cursor: pointer;
      `;
  }}
`;
