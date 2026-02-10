import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType } from "@interfacesV02/type";

export const List = styled.div`
  width: 100%;

  display: flex;
  padding: 20px 16px;
  flex-direction: column;

  gap: 20px;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 10px;
`;

export const Board = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;

  ${(p) => css`
    border: 1px solid ${p.theme.strokeColors.strokeLighter};
  `}
`;

export const BoardPointUser = styled.div<{ $x: number; $y: number }>`
  width: 12px;
  height: 12px;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: white;

  ${({ $x, $y }) => css`
    left: ${$x}%;
    top: ${$y}%;
  `}

  ${(p) => css`
    border: 1.5px solid ${p.theme.foregroundColors.foregroundStrongest};
  `}
`;

export const BoardPointAvg = styled.img<{
  $x: number;
  $y: number;
  $imgURL: string;
}>`
  width: 32px;
  height: 32px;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: white;

  ${({ $x, $y }) => css`
    left: ${$x}%;
    top: ${$y}%;
  `}

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};

    background-image: url(${p.$imgURL});
    background-size: cover;
    background-position: center center;
    border: solid 1.5px ${p.theme.foregroundColors.mainLight};
  `}
`;

export const BoardAxis = styled.div<{ $axis: AxisType }>`
  ${(p) => css`
    background-color: ${p.theme.strokeColors.strokeLightest};
  `}

  position:absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  ${({ $axis }) => {
    if ($axis === "VERTICAL")
      return css`
        width: 1px;
        height: 100%;
      `;
    else
      return css`
        height: 1px;
        width: 100%;
      `;
  }}
`;

export const Contents = styled.div`
  flex-grow: 1;
  padding-top: 4px;
  display: flex;
  flex-direction: column;

  > .name {
    ${(p) => css`
      ${p.theme.fonts.head3}
      color: ${p.theme.fontColors.titleStrongest};
    `}
  }
  > .evaluation {
    ${(p) => css`
      ${p.theme.fonts.body1}
      color: ${p.theme.fontColors.textLighter};
    `}
  }
`;

export const Preference = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;

  > .preferenceTitle {
    margin-bottom: 4px;
    ${(p) => css`
      ${p.theme.fonts.body3}
      color: ${p.theme.fontColors.textLightest};
    `}
  }
`;

export const PreferenceBar = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  margin-bottom: 4px;

  border-radius: 20px;
  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}
`;

export const PreferenceBarValue = styled.div<{ $value: number }>`
  height: 10px;
  position: absolute;
  transform: translateY(-50%);
  left: 0px;
  top: 50%;

  border-radius: 20px;

  ${({ $value }) => css`
    width: ${$value}%;
  `}
  ${() => css`
    background: linear-gradient(90deg, #fef4f8 0%, #fcbed5 100%);
  `}
`;

export const PreferenceBarPoint = styled.div<{
  $isAvg: boolean;
  $value: number;
}>`
  width: 12px;
  height: 12px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;

  ${({ $value }) => css`
    left: calc(${$value}% - 6px);
  `}

  border-radius: 20px;
  background-color: white;

  ${({ $isAvg, ...p }) => {
    if ($isAvg)
      return css`
        border: 1.5px solid ${p.theme.foregroundColors.mainLight};
      `;
    else
      return css`
        border: 1.5px solid ${p.theme.foregroundColors.foregroundStrongest};
      `;
  }}

  > span {
    width: 400%;

    position: absolute;

    transform: translateX(-50%);
    left: 50%;

    top: 10px;

    ${({ $isAvg, ...p }) => {
      if ($isAvg)
        return css`
          ${p.theme.fonts.body3B}
          color:black;
        `;
      else
        return css`
          ${p.theme.fonts.body3B}
          color: white;
        `;
    }}
  }
`;

export const ResultCellTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${(p) => css`
    ${p.theme.fonts.head2}
    color: ${p.theme.fontColors.titleStrongest};
  `}

  > .hint {
    display: flex;
    gap: 12px;

    ${(p) => css`
      ${p.theme.fonts.body3};
      color: ${p.theme.fontColors.textLighter};
    `}
  }
  > .hint > span {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

export const BoardPoint = styled.div<{ $isUser: boolean }>`
  width: 12px;
  height: 12px;

  border-radius: 20px;
  background-color: white;

  ${(p) =>
    p.$isUser
      ? css`
          border: 1.5px solid ${p.theme.foregroundColors.foregroundStrongest};
        `
      : css`
          border: 1.5px solid ${p.theme.foregroundColors.mainLight};
        `}
`;
