import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisSlotType } from "@interfacesV03/data/user";
import type { AxisType } from "@interfacesV03/type";

const Spot = styled.div<{ $isCurrent: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;

  border-radius: 6px;
  width: 6px;
  height: 6px;

  ${(p) => {
    if (p.$isCurrent) {
      return css`
        width: 6px;
        height: 6px;
        background-color: ${p.theme.strokeColors.strokeStorngest};
      `;
    } else {
      return css`
        width: 5px;
        height: 5px;
        background-color: ${p.theme.strokeColors.strokeLight};
      `;
    }
  }}
`;

const MarkerCotainer = styled.div<{
  $isSelected: boolean;
  $axis: AxisType;
  $isVisible: boolean;
}>`
  transition: opacity ease-out 120ms;

  opacity: 100%;
  ${({ $isVisible }) =>
    $isVisible ||
    css`
      opacity: 0%;
    `}

  pointer-events: none;
  position: relative;

  width: 2px;
  height: 2px;

  justify-content: center;
  align-items: center;

  ${({ $isSelected }) => {
    if ($isSelected) {
      return css`
        justify-content: start;
        align-items: center;
      `;
    } else {
      return css`
        justify-content: center;
        align-items: center;
      `;
    }
  }};
`;

const Marker = styled.div<{
  $isBetween: boolean;
  $isCurrent: boolean;
  $isSelected: boolean;
  $axis: AxisType;
  $isLabel: boolean;
  $imgURL?: string;
}>`
  transition:
    border 120ms ease-out,
    margin ease-out 220ms,
    width 220ms ease-out,
    height 220ms ease-out;

  position: absolute;
  ${({ $axis }) => css`
    transform: translate(
      ${$axis === "VERTICAL" ? "0%" : "-50%"},
      ${$axis === "VERTICAL" ? "-50%" : "0%"}
    );
    bottom: ${$axis === "VERTICAL" ? "" : "12px"};
    right: ${$axis === "VERTICAL" ? "12px" : ""};
  `}

  border-radius: 52px;

  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  overflow: visible;

  ${({ $axis }) => css`
    flex-direction: ${$axis === "HORIZONTAL" ? "row" : "column"};
  `}

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
    ${p.$isLabel
      ? css``
      : css`
          background-image: url(${p.$imgURL});
          background-size: cover;
          background-position: center center;
          border: solid 1px ${p.theme.strokeColors.strokeLighter};
        `}
  `}

  width: 48px;
  height: 48px;

  ${({ $isSelected, $axis, $isCurrent, $isLabel, ...p }) => {
    if ($isSelected && $isCurrent && !$isLabel) {
      return css`
        width: 60px;
        height: 60px;
        border: solid 2px ${p.theme.strokeColors.strokeStorngest};
      `;
    } else if ($isSelected && $isCurrent && $isLabel) {
      return css`
        width: 60px;
        height: 60px;
        border: solid 2px ${p.theme.strokeColors.strokeLightest};
      `;
    }
  }}

  ${({ $isBetween, $axis }) =>
    $isBetween &&
    css`
      height: ${$axis === "VERTICAL" ? "76px" : "48px"};
      width: ${$axis === "HORIZONTAL" ? "76px" : "48px"};
      gap: ${$axis === "HORIZONTAL" ? 2 : 0}px;
    `}
`;

const MarkerLabel = styled.div<{ $isLabel: boolean; $isCurrent: boolean }>`
  transition: background-color 120ms ease-out;

  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 20px;

  position: absolute;

  transform: translateX(-50%);
  left: 50%;
  top: -16px;

  box-sizing: border-box;
  max-width: calc(100% + 10px);

  text-align: center;

  ${(p) => css`
    padding: 2px 6px;

    ${p.theme.fonts.body3B};
    color: ${p.theme.fontColors.textLightest};
    background-color: ${p.theme.foregroundColors.foregroundLight};
    ${p.$isCurrent &&
    !p.$isLabel &&
    css`
      color: ${p.theme.fontColors.textInverseLight};
      background-color: ${p.$isLabel
        ? p.theme.foregroundColors.foregroundLighter
        : p.theme.foregroundColors.foregroundStrongest};
    `}

    ${p.$isCurrent &&
    p.$isLabel &&
    css`
      color: ${p.theme.fontColors.textLight};
    `}
  `}
`;

const IconLabel = styled.div<{
  $isVisible?: boolean;
  $isSelected: boolean;
  $iconIntensity: number;
}>`
  transition:
    width 220ms ease-out,
    height 220ms ease-out;

  opacity: 100%;
  width: 32px;
  height: 32px;

  text-align: center;
  ${({ $isVisible }) =>
    $isVisible === false &&
    css`
      width: 0px;
      height: 0px;
      overflow: hidden;
    `}

  ${({ $isSelected, $iconIntensity }) => css`
    font-size: ${$isSelected ? 24 : 20}px;
    line-height: 32px;
    opacity: ${$iconIntensity}%;
  `}
`;

type Parms = {
  isWillCurrent: boolean;
  isSelected: boolean;
  isVisible: boolean;
  isCurrent: boolean;
  axis: AxisType;
  type: AxisSlotType;
  label?: string;
  imgURL?: string;
  icon?: string;
  startIcon?: string;
  endIcon?: string;
  iconIntensity?: number;
};

const AxisMarker = (parms: Parms) => {
  const {
    isWillCurrent,
    isSelected,
    isVisible,
    isCurrent,
    axis,
    type,
    label,
    imgURL,
    icon = "",
    startIcon = "",
    endIcon = "",
    iconIntensity = 100,
  } = parms;

  const isLabel = type !== "ITEM_LIST";

  const isBetween = type === "BETWEEN" && isCurrent;

  return (
    <MarkerCotainer
      $isVisible={isVisible}
      $isSelected={isSelected}
      $axis={axis}
    >
      <Spot $isCurrent={isCurrent} />

      <Marker
        $isBetween={isBetween}
        $isCurrent={isCurrent || isWillCurrent}
        $isSelected={isSelected}
        $axis={axis}
        $isLabel={isLabel}
        $imgURL={imgURL}
      >
        {label !== undefined && (
          <MarkerLabel
            $isCurrent={isCurrent || isWillCurrent}
            $isLabel={isLabel}
          >
            {label}
          </MarkerLabel>
        )}

        {isLabel && (
          <>
            <IconLabel $isSelected={isSelected} $iconIntensity={iconIntensity}>
              {isBetween ? startIcon : icon}
            </IconLabel>
            <IconLabel
              $isVisible={isBetween}
              $isSelected={isSelected}
              $iconIntensity={iconIntensity}
            >
              {endIcon}
            </IconLabel>
          </>
        )}
      </Marker>
    </MarkerCotainer>
  );
};

export default AxisMarker;
