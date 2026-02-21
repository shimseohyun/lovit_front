import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType, DirectionType } from "@interfacesV03/type";

type Params = {
  axis: AxisType | null;
  direction: DirectionType | null;
  isVisible: boolean;
  isSelected: boolean;
  label: string;
};

const AxisMarkerLabel = ({
  axis,
  direction,
  isVisible,
  isSelected,
  label,
}: Params) => {
  if (axis === null) return;

  return (
    <MarkerContainer $axis={axis} $direction={direction} $isVisible={isVisible}>
      <AxisPoint axis={axis} isCurrent={isSelected} />

      <Marker $axis={axis} $isVisible={isVisible} $isSelected={isSelected}>
        <span>{label}</span>
      </Marker>
    </MarkerContainer>
  );
};

export default AxisMarkerLabel;

const markerContainerAxisStyle = (axis: AxisType | null) => {
  switch (axis) {
    case null:
      return css`
        justify-content: center;
      `;
    case "HORIZONTAL":
      return css`
        justify-content: end;
        flex-direction: column;
      `;
    case "VERTICAL":
      return css`
        justify-content: end;
        flex-direction: row;
      `;
  }
};

const pointContainerAxisStyle = (axis: AxisType) => {
  if (axis === "HORIZONTAL") {
    return css`
      transform: translateX(-50%);
      left: 50%;
      top: 6px;
    `;
  }
  return css`
    transform: translateY(-50%);
    top: 50%;
    left: 6px;
  `;
};

const pointSvgByAxis: Record<
  AxisType,
  { width: number; height: number; viewBox: string; path: string }
> = {
  HORIZONTAL: {
    width: 9,
    height: 8,
    viewBox: "0 0 9 8",
    path: "M 3.59955 0.5 C 3.98445 -0.16667 4.9467 -0.16667 5.3316 0.5 L 8.7957 6.5 C 9.1806 7.166666 8.69948 8 7.92968 8 H 1.00147 C 0.231674 8 -0.249451 7.166667 0.135449 6.5 L 3.59955 0.5 Z",
  },

  VERTICAL: {
    width: 8,
    height: 9,
    viewBox: "0 0 8 9",
    path: "M 0.5 5.3316 C -0.16667 4.9467 -0.16667 3.98445 0.5 3.59955 L 6.5 0.13545 C 7.166666 -0.24945 8 0.231675 8 1.00148 V 7.92968 C 8 8.69948 7.166667 9.1806 6.5 8.7957 L 0.5 5.3316 Z",
  },
};

const AxisPoint = ({
  axis,
  isCurrent,
}: {
  axis: AxisType;
  isCurrent: boolean;
}) => {
  const theme = useTheme();
  const svg = pointSvgByAxis[axis];
  return (
    <PointContainer $axis={axis}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svg.width}
        height={svg.height}
        viewBox={svg.viewBox}
        fill="none"
      >
        <path
          d={svg.path}
          fill={
            isCurrent
              ? theme.foregroundColors.foregroundStrongest
              : theme.foregroundColors.foregroundLighter
          }
        />
      </svg>
    </PointContainer>
  );
};

const MarkerContainer = styled.div<{
  $axis: AxisType | null;
  $direction: DirectionType | null;
  $isVisible: boolean;
}>`
  transition: opacity 220ms ease-out;
  position: absolute;
  transform: translate(-50%, -50%);

  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;

  ${({ $isVisible }) => css`
    opacity: ${$isVisible ? 100 : 0}%;
  `}
  ${({ $axis }) => markerContainerAxisStyle($axis)}
`;

const PointContainer = styled.div<{ $axis: AxisType }>`
  position: absolute;
  transform: translate(-50%, -50%);

  width: 12px;
  height: 12px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  svg path {
    transition: fill 220ms ease 120ms;
  }
  ${({ $axis }) => pointContainerAxisStyle($axis)}
`;

const Marker = styled.div<{
  $axis: AxisType | null;
  $isVisible: boolean;
  $isSelected: boolean;
}>`
  transition:
    width 200ms ease-out 120ms,
    height 200ms ease-out 120ms,
    color 220ms ease-in-out 120ms,
    background-color 220ms ease-in-out 120ms;
  position: absolute;

  z-index: 1;

  border-radius: 8px;
  padding: 8px 12px;

  overflow: visible;
  text-align: center;
  white-space: pre;

  max-width: calc(100px);

  > span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;

    width: 58px;
    height: 48px;
  }

  ${({ $axis }) => css`
    transform: translate(
      ${$axis === "VERTICAL" ? "0%" : "-50%"},
      ${$axis === "VERTICAL" ? "-50%" : "0%"}
    );
    top: ${$axis === "VERTICAL" ? "" : "14px"};
    left: ${$axis === "VERTICAL" ? "14px" : ""};
  `}

  ${(p) => css`
    ${p.theme.fonts.body3}
    color:${p.theme.fontColors.textLighter};
  `};

  ${({ $isSelected, ...p }) => {
    if ($isSelected)
      return css`
        ${p.theme.fonts.body3B}
        color: ${p.theme.fontColors.textInverseLight};
        background-color: ${p.theme.foregroundColors.foregroundStrongest};
      `;
    else {
      return css`
        ${p.theme.fonts.body3}
        color: ${p.theme.fontColors.textLighter};
        background-color: ${p.theme.foregroundColors.foregroundLighter};
      `;
    }
  }}
  ${({ $isVisible }) => {
    if ($isVisible) {
      return css`
        width: 58px;
        height: 48px;
      `;
    } else {
      return css`
        color: transparent;
        width: 0px;
        height: 0px;
      `;
    }
  }}
`;
