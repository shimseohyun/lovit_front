import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType } from "@interfacesV02/type";

type Parms = {
  axis: AxisType | null;
  imgURL: string;
};

const CurrentMarker = (parms: Parms) => {
  const { axis, imgURL } = parms;

  const isDragging = axis !== null;

  return (
    <MarkerContainer $axis={axis}>
      {isDragging &&
        (axis === "HORIZONTAL" ? <HorizontalPoint /> : <VerticalPoint />)}
      <Marker $imgURL={imgURL} $isDragging={isDragging} $axis={axis} />
    </MarkerContainer>
  );
};

const MarkerContainer = styled.div<{ $axis: AxisType | null }>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;

  display: flex;

  align-items: center;

  ${({ $axis }) => {
    if ($axis === null)
      return css`
        justify-content: center;
      `;
    else if ($axis === "HORIZONTAL") {
      return css`
        justify-content: end;
        flex-direction: column;
      `;
    } else if ($axis === "VERTICAL") {
      return css`
        justify-content: end;
        flex-direction: row;
      `;
    }
  }}
`;

const Marker = styled.div<{
  $imgURL: string;
  $isDragging: boolean;
  $axis: AxisType | null;
}>`
  z-index: 1;
  transition: margin 220ms ease-out;

  flex-shrink: 0;

  border-radius: 48px;

  width: 48px;
  height: 48px;

  ${({ $isDragging, $axis }) => {
    if ($axis === null) return;
    if ($isDragging) {
      return css`
        width: 72px;
        height: 72px;

        margin-bottom: ${$axis === "VERTICAL" ? "0px" : "64px"};
        margin-right: ${$axis === "VERTICAL" ? "64px" : "0px"};
      `;
    }
  }}

  ${({ $imgURL }) => css`
    background-image: url(${$imgURL});
    background-size: cover;
    background-position: center center;
  `}

  ${(p) => css`
    box-shadow: 0 0 0 2px ${p.theme.foregroundColors.foregroundStrongest};
  `}
`;

const PointContainerVertical = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;

  right: 54px;
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PointContainerHorizontal = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;

  bottom: 54px;
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HorizontalPoint = () => {
  return (
    <PointContainerHorizontal>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
      >
        <path
          d="M3.59955 7.5C3.98445 8.16667 4.9467 8.16667 5.3316 7.5L8.7957 1.5C9.1806 0.833334 8.69948 0 7.92968 0H1.00147C0.231674 0 -0.249451 0.833333 0.135449 1.5L3.59955 7.5Z"
          fill="#212730"
        />
      </svg>
    </PointContainerHorizontal>
  );
};

const VerticalPoint = () => {
  return (
    <PointContainerVertical>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="9"
        viewBox="0 0 8 9"
        fill="none"
      >
        <path
          d="M7.5 5.3316C8.16667 4.9467 8.16667 3.98445 7.5 3.59955L1.5 0.13545C0.833334 -0.24945 0 0.231675 0 1.00148V7.92968C0 8.69948 0.833333 9.1806 1.5 8.7957L7.5 5.3316Z"
          fill="#212730"
        />
      </svg>
    </PointContainerVertical>
  );
};

export default CurrentMarker;
