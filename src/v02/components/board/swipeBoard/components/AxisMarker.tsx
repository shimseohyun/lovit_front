import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisSlotType } from "@interfacesV02/data/user";
import type { AxisType } from "@interfacesV02/type";

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
        background-color: ${p.theme.strokeColors.strokeStorngest};
      `;
    } else {
      return css`
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
  display: flex;

  ${({ $axis }) => css`
    flex-direction: ${$axis === "HORIZONTAL" ? "column" : "row"};
  `}

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

  flex-shrink: 0;
  position: relative;

  border-radius: 52px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: visible;

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

  width: 40px;
  height: 40px;

  ${({ $isSelected, $axis, $isCurrent, ...p }) => {
    if ($isSelected) {
      return css`
        ${$isCurrent ||
        css`
          margin-top: ${$axis === "HORIZONTAL" ? 16 : 0}px;
          margin-left: ${$axis === "HORIZONTAL" ? 0 : 16}px;
        `}

        ${$isCurrent &&
        css`
          width: 56px;
          height: 56px;
          border: solid 2px ${p.theme.strokeColors.strokeStorngest};

          margin-top: ${$axis === "HORIZONTAL" ? 12 : 0}px;
          margin-left: ${$axis === "HORIZONTAL" ? 0 : 12}px;
        `}
      `;
    }
  }}
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
  bottom: -10px;

  box-sizing: border-box;
  max-width: calc(100% + 10px);

  text-align: center;

  ${(p) => css`
    padding: ${p.$isLabel ? "1px 6px" : "2px 5px"};

    ${p.$isLabel ? p.theme.fonts.body3B : p.theme.fonts.body4B};

    ${p.$isCurrent
      ? css`
          color: ${p.theme.fontColors.textInverseLight};
          background-color: ${p.theme.foregroundColors.foregroundStrongest};
        `
      : css`
          color: ${p.theme.fontColors.textLightest};
          background-color: ${p.theme.foregroundColors.foregroundLight};
        `}
  `}
`;

const IconLabel = styled.div<{ $isSelected: boolean; $iconIntensity: number }>`
  ${({ $isSelected, $iconIntensity }) => css`
    font-size: ${$isSelected ? 24 : 20}px;
    line-height: 32px;
    opacity: ${$iconIntensity}%;
  `}
`;

type Parms = {
  isSelected: boolean;
  isVisible: boolean;
  isCurrent: boolean;
  axis: AxisType;
  type: AxisSlotType;
  label?: string;
  imgURL?: string;
  icon?: string;
  iconIntensity?: number;
};

const AxisMarker = (parms: Parms) => {
  const {
    isSelected,
    isVisible,
    isCurrent,
    axis,
    type,
    label,
    imgURL,
    icon = "",
    iconIntensity = 100,
  } = parms;

  const isLabel = type !== "ITEM_LIST";
  const isNone = type === "BETWEEN";

  return (
    <MarkerCotainer
      $isVisible={isVisible}
      $isSelected={isSelected}
      $axis={axis}
    >
      <Spot $isCurrent={isCurrent} />
      {!isNone && (
        <Marker
          $isCurrent={isCurrent}
          $isSelected={isSelected}
          $axis={axis}
          $isLabel={isLabel}
          $imgURL={imgURL}
        >
          {label !== undefined && (
            <MarkerLabel $isCurrent={isCurrent} $isLabel={isLabel}>
              {label}
            </MarkerLabel>
          )}

          {isLabel && (
            <IconLabel $isSelected={isSelected} $iconIntensity={iconIntensity}>
              {icon}
            </IconLabel>
          )}
        </Marker>
      )}
    </MarkerCotainer>
  );
};

export default AxisMarker;
