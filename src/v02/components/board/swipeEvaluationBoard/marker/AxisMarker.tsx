import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisSlotType } from "@interfacesV02/data/user";
import type { AxisType } from "@interfacesV02/type";

const Spot = styled.div<{ $isCurrent: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;

  border-radius: 2px;
  ${(p) => {
    if (p.$isCurrent) {
      return css`
        width: 6px;
        height: 6px;
        background-color: ${p.theme.strokeColors.strokeStorngest};
      `;
    } else {
      return css`
        width: 4px;
        height: 4px;
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
  opacity: 100%;
  ${({ $isVisible }) =>
    $isVisible ||
    css`
      opacity: 0%;
    `}

  transition: opacity ease-out 120ms;
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
  }}
`;

const Marker = styled.div<{
  $isSelected: boolean;
  $axis: AxisType;
  $isLabel: boolean;
  $imgURL?: string;
}>`
  flex-shrink: 0;
  position: relative;

  border-radius: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: visible;

  ${({ $isSelected, $axis }) => {
    if ($isSelected) {
      return css`
        margin-top: ${$axis === "HORIZONTAL" ? 24 : 0}px;
        margin-left: ${$axis === "HORIZONTAL" ? 0 : 24}px;
        width: 48px;
        height: 48px;
      `;
    } else {
      return css`
        width: 36px;
        height: 36px;
      `;
    }
  }}
  transition: margin ease-out 120ms;

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
    ${p.$isLabel
      ? css`
          font-size: 19px;
          line-height: 32px;
        `
      : css`
          background-image: url(${p.$imgURL});
          background-size: cover;
          background-position: center center;
          box-shadow: 0 0 0 1px ${p.theme.strokeColors.strokeLighter};
        `}
  `}
`;

const MarkerLabel = styled.div<{ $isLabel: boolean }>`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 20px;

  position: absolute;

  transform: translateX(-50%);
  left: 50%;
  top: -11px;

  box-sizing: border-box;
  max-width: calc(100% + 10px);

  text-align: center;

  ${(p) => css`
    padding: ${p.$isLabel ? "1px 6px" : "2px 5px"};

    ${p.$isLabel ? p.theme.fonts.body3B : p.theme.fonts.body4B}
    color: ${p.$isLabel
      ? p.theme.fontColors.titleStronger
      : p.theme.fontColors.textLight};

    background-color: ${p.theme.foregroundColors.foregroundLight};
  `}
`;

type Parms = {
  isSelected: boolean;
  isVisible: boolean;
  isCurrent: boolean;
  axis: AxisType;
  type: AxisSlotType;
  label: string;
  imgURL?: string;
};

const AxisMarker = (parms: Parms) => {
  const { isSelected, isVisible, isCurrent, axis, type, label, imgURL } = parms;

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
          $isSelected={isSelected}
          $axis={axis}
          $isLabel={isLabel}
          $imgURL={imgURL}
        >
          <MarkerLabel $isLabel={isLabel}>{label}</MarkerLabel>
          {isLabel && <>🥞</>}
        </Marker>
      )}
    </MarkerCotainer>
  );
};

export default AxisMarker;
