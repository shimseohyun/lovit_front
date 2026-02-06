import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType } from "@interfacesV02/type";

export const BoardContaienr = styled.div`
  touch-action: none;

  width: 100%;

  position: relative;
  overflow: hidden;

  flex-grow: 1;
`;

export const BoardAxisContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BoardAxis = styled.div<{
  $axis: AxisType;
}>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  ${({ $axis, ...p }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        width: 100%;
        height: 1px;
        background-color: ${p.theme.strokeColors.strokeLighter};
      `;
    } else {
      return css`
        height: 100%;
        width: 1px;
        background-color: ${p.theme.strokeColors.strokeLighter};
      `;
    }
  }}
`;

export const BoardAxisWrpper = styled.div<{
  $position: number;
  $axis: AxisType;
  $isCurrent: boolean;
}>`
  transition:
    top 220ms ease-out,
    left 220ms ease-out;

  pointer-events: none;

  display: flex;
  flex-shrink: 0;

  position: absolute;

  ${({ $position, $axis }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        transform: translateX(-50%);
        top: 0px;
        left: calc(50% + ${$position}px);
        width: auto;
        height: 100%;
        flex-direction: row;
      `;
    } else {
      return css`
        transform: translateY(-50%);
        left: 0px;
        top: calc(50% + ${$position}px);
        width: 100%;
        height: auto;
        flex-direction: column;
      `;
    }
  }}

  ${({ $isCurrent, $axis }) => {
    if ($isCurrent) {
      if ($axis === "HORIZONTAL")
        return css`
          top: -48px;
        `;
      else if ($axis === "VERTICAL")
        return css`
          left: -48px;
        `;
    }
  }}
`;

export const LabelConatiner = styled.div<{
  $axis: AxisType;
  $size: number;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: space-between;

  ${({ $axis, $size }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        padding-left: ${$size / 2}px;
        padding-right: ${$size / 2}px;

        flex-direction: row;
      `;
    } else {
      return css`
        padding-top: ${$size / 2}px;
        padding-bottom: ${$size / 2}px;

        flex-direction: column;
      `;
    }
  }}

  display: flex;
  flex-shrink: 0;
`;

export const LabelWrapper = styled.div<{
  $axis: AxisType;
  $size: number;
}>`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  ${({ $size, $axis }) => {
    if ($axis === "HORIZONTAL")
      return css`
        width: ${$size}px;
      `;
    else {
      return css`
        height: ${$size}px;
      `;
    }
  }}
`;

export const Label = styled.div<{
  $axis: AxisType;
}>`
  pointer-events: none;
  opacity: 50%;
  ${({ $axis }) => {
    if ($axis === "VERTICAL") {
      return css`
        padding: 0px 8px;
        margin-left: 32.5px;
        width: 32px;
        height: calc(100%);
        border-top-right-radius: 32px;
        border-bottom-right-radius: 32px;
      `;
    } else if ($axis === "HORIZONTAL") {
      return css`
        padding: 4px 0px;
        white-space: nowrap;
        margin-top: 32.5px;
        width: calc(100%);
        height: 32px;
        border-bottom-right-radius: 32px;
        border-bottom-left-radius: 32px;
      `;
    }
  }}

  text-align: center;
  overflow: visible;
  word-break: break-all;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background-color: ${theme.foregroundColors.foregroundLighter};
    box-shadow: 0 0 0 1px ${theme.strokeColors.strokeLighter};
    color: ${theme.fontColors.textLight};
    ${theme.fonts.body3B}
  `}
`;

export const BoardAxisItem = styled.div<{ $size: number; $axis: AxisType }>`
  ${({ $size, $axis }) => {
    if ($axis === "HORIZONTAL") {
      return css`
        width: ${$size}px;
        height: 100%;
      `;
    } else {
      return css`
        height: ${$size}px;
        width: 100%;
      `;
    }
  }}

  display:flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;
