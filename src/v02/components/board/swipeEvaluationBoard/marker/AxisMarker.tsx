import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisSlotType } from "@interfacesV02/data/user";
import type { AxisType } from "@interfacesV02/type";

const Spot = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;

  width: 4px;
  height: 4px;
  border-radius: 2px;
  ${(p) => css`
    background-color: ${p.theme.strokeColors.strokeLight};
  `}
`;
const MarkerCotainer = styled.div<{ $isSelected: boolean; $axis: AxisType }>`
  position: relative;

  width: 2px;
  height: 2px;
  display: flex;

  ${({ $axis }) => css`
    flex-direction: ${$axis === "HORIAONTAL" ? "column" : "row"};
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
        margin-top: ${$axis === "HORIAONTAL" ? 24 : 0}px;
        margin-left: ${$axis === "HORIAONTAL" ? 0 : 24}px;
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
          box-shadow: 0 0 0 1px {p.theme.strokeColors.strokeLighter};
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
  axis: AxisType;
  type: AxisSlotType;
  label: string;
  imgURL?: string;
};

const AxisMarker = (parms: Parms) => {
  const { isSelected, axis, type, label, imgURL } = parms;

  const isLabel = type !== "ITEM_LIST";
  const isNone = type === "BETWEEN";

  if (isNone) {
    <MarkerCotainer $isSelected={isSelected} $axis={axis}>
      <Spot />
    </MarkerCotainer>;
  }
  return (
    <MarkerCotainer $isSelected={isSelected} $axis={axis}>
      <Spot />
      <Marker
        $isSelected={isSelected}
        $axis={axis}
        $isLabel={isLabel}
        $imgURL={imgURL}
      >
        <MarkerLabel $isLabel={isLabel}>{label}</MarkerLabel>
        {isLabel && <>🥞</>}
      </Marker>
    </MarkerCotainer>
  );
};

export default AxisMarker;
