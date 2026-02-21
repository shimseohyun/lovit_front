import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType, DirectionType } from "@interfacesV03/type";

type params = {
  axis: AxisType | null;
  direction: DirectionType | null;
  imgURL: string;
};

const CurrentMarker = ({ axis, direction, imgURL }: params) => {
  const isDragging = axis !== null;

  return (
    <MarkerContainer $axis={axis} $direction={direction}>
      {isDragging && <AxisPoint axis={axis} />}
      <Marker $imgURL={imgURL} $isDragging={isDragging} $axis={axis} />
    </MarkerContainer>
  );
};

export default CurrentMarker;

/** ---------- helpers (축/방향별 스타일/데이터) ---------- */

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

/** ---------- components ---------- */

const AxisPoint = ({ axis }: { axis: AxisType }) => {
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
        <path d={svg.path} fill="#212730" />
      </svg>
    </PointContainer>
  );
};

/** ---------- styled ---------- */

const MarkerContainer = styled.div<{
  $axis: AxisType | null;
  $direction: DirectionType | null;
}>`
  position: absolute;
  transition: transform 320ms ease-out;

  ${({ $direction, $axis }) => {
    if ($direction === null)
      return css`
        transform: translate(-50%, -50%);
      `;
    else if (
      ($direction === "START" && $axis === "HORIZONTAL") ||
      ($direction === "END" && $axis === "VERTICAL")
    )
      return css`
        transform: translate(-50%, -50%) rotate(12deg);
      `;
    else if (
      ($direction === "END" && $axis === "HORIZONTAL") ||
      ($direction === "START" && $axis === "VERTICAL")
    )
      return css`
        transform: translate(-50%, -50%) rotate(-12deg);
      `;
  }}

  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;

  ${({ $axis }) => markerContainerAxisStyle($axis)}
`;

const PointContainer = styled.div<{ $axis: AxisType }>`
  position: absolute;

  width: 13px;
  height: 13px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $axis }) => pointContainerAxisStyle($axis)}
`;

const Marker = styled.div<{
  $imgURL: string;
  $isDragging: boolean;
  $axis: AxisType | null;
}>`
  position: absolute;

  z-index: 1;
  transition: margin 220ms ease-out;

  flex-shrink: 0;
  border-radius: 48px;

  ${({ $axis }) => css`
    width: 72px;
    height: 72px;

    transform: translate(
      ${$axis === "VERTICAL" ? "0%" : "-50%"},
      ${$axis === "VERTICAL" ? "-50%" : "0%"}
    );
    top: ${$axis === "VERTICAL" ? "" : "16px"};
    left: ${$axis === "VERTICAL" ? "16px" : ""};
  `}

  ${({ $imgURL }) => css`
    background-image: url(${$imgURL});
    background-size: cover;
    background-position: center center;
  `}

  ${(p) => css`
    box-shadow: 0 0 0 2.5px ${p.theme.foregroundColors.foregroundStrongest};
  `}
`;
