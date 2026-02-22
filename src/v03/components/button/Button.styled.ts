import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { FillButtonType } from "./FillButton";

export const BottomButtonGradient = styled.div`
  touch-action: none;
  pointer-events: none;

  width: 100%;
  height: 40px;
  transform: translate(-50%, 0%);
  position: absolute;
  left: 50%;
  top: -40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
`;
export const BottomButtonContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  gap: 10px;
  align-items: center;
  justify-content: end;

  width: 100%;
  padding: 10px 12px;

  white-space: pre-wrap;
  text-align: center;

  ${(p) => css`
    ${p.theme.fonts.body2}
    color: ${p.theme.fontColors.textLighter};
  `}
`;

export const Button = styled.button<{
  disabled: boolean;
  $buttonType: FillButtonType;
}>`
  width: 100%;
  height: 52px;

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px 20px;

  ${({ $buttonType, ...p }) => {
    if ($buttonType === "ASSISTIVE") {
      return css`
        background-color: ${p.theme.foregroundColors.foregroundLighter};
        color: ${p.theme.fontColors.textLight};
      `;
    } else if ($buttonType === "PRIMARY") {
      return css`
        background-color: ${p.theme.foregroundColors.foregroundStrongest};
        color: ${p.theme.fontColors.textInverseLight};
      `;
    }
  }}

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

        cursor: pointer;
      `;
  }}
`;
