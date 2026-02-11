import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import type { AxisType, DirectionType } from "@interfacesV03/type";

type params = {
  axis: AxisType | null;
  direction: DirectionType | null;
  imgURL: string;
  chipInfo?: Record<DirectionType, chip>;
};

const directionList: DirectionType[] = ["START", "END"];
const CurrentMarker = ({ axis, imgURL, direction, chipInfo }: params) => {
  const isDragging = axis !== null;

  return (
    <MarkerContainer $axis={axis}>
      {isDragging && <AxisPoint axis={axis} />}
      <Marker $imgURL={imgURL} $isDragging={isDragging} $axis={axis} />

      {axis !== null &&
        chipInfo &&
        directionList.map((d, id) => (
          <ChipMotion
            key={id}
            $axis={axis}
            $direction={d}
            $isCurrent={direction === d}
          >
            <GroupChip
              $isCurrent={direction === d}
              $axis={axis}
              $direction={d}
              $background={chipInfo[d].colorLightest}
            >
              {d === "START" && (
                <CursorIcon
                  axis={axis}
                  direction={d}
                  fill={chipInfo[d].colorLighter}
                />
              )}

              <span>{chipInfo[d].icon}</span>

              {d === "END" && (
                <CursorIcon
                  axis={axis}
                  direction={d}
                  fill={chipInfo[d].colorLighter}
                />
              )}
            </GroupChip>
          </ChipMotion>
        ))}
    </MarkerContainer>
  );
};

export default CurrentMarker;

const chipMovePx = 10;

const nudgeLeft = keyframes`
  0% { transform: translate3d(0,0,0); }
  45% { transform: translate3d(-${chipMovePx}px,0,0); }
  100% { transform: translate3d(0,0,0); }
`;
const nudgeRight = keyframes`
  0% { transform: translate3d(0,0,0); }
  45% { transform: translate3d(${chipMovePx}px,0,0); }
  100% { transform: translate3d(0,0,0); }
`;
const nudgeUp = keyframes`
  0% { transform: translate3d(0,0,0); }
  45% { transform: translate3d(0,-${chipMovePx}px,0); }
  100% { transform: translate3d(0,0,0); }
`;
const nudgeDown = keyframes`
  0% { transform: translate3d(0,0,0); }
  45% { transform: translate3d(0,${chipMovePx}px,0); }
  100% { transform: translate3d(0,0,0); }
`;

type chipNudgeKeyframesDict = Record<
  AxisType,
  Record<DirectionType, ReturnType<typeof keyframes>>
>;

const chipNudgeKeyframesByAxisDir: chipNudgeKeyframesDict = {
  HORIZONTAL: { START: nudgeLeft, END: nudgeRight },
  VERTICAL: { START: nudgeUp, END: nudgeDown },
};

const ChipMotion = styled.div<{
  $axis: AxisType;
  $direction: DirectionType;
  $isCurrent: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  ${({ $axis }) =>
    $axis === "HORIZONTAL"
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
        `}

  will-change: transform;

  ${({ $isCurrent, $axis, $direction }) =>
    $isCurrent &&
    css`
      animation: ${chipNudgeKeyframesByAxisDir[$axis][$direction]} 650ms
        cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

type chip = {
  icon: string;
  colorLightest: string;
  colorLighter: string;
};

type cursorIconParams = {
  fill: string;
  axis: AxisType;
  direction: DirectionType;
};

type cursorIconPathDict = Record<AxisType, Record<DirectionType, string>>;

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
      bottom: 4px;
    `;
  }
  return css`
    transform: translateY(-50%);
    top: 50%;
    right: 4px;
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
    path: "M3.59955 7.5C3.98445 8.16667 4.9467 8.16667 5.3316 7.5L8.7957 1.5C9.1806 0.833334 8.69948 0 7.92968 0H1.00147C0.231674 0 -0.249451 0.833333 0.135449 1.5L3.59955 7.5Z",
  },
  VERTICAL: {
    width: 8,
    height: 9,
    viewBox: "0 0 8 9",
    path: "M7.5 5.3316C8.16667 4.9467 8.16667 3.98445 7.5 3.59955L1.5 0.13545C0.833334 -0.24945 0 0.231675 0 1.00148V7.92968C0 8.69948 0.833333 9.1806 1.5 8.7957L7.5 5.3316Z",
  },
};

const groupChipAxisBaseStyle = (axis: AxisType) => {
  if (axis === "HORIZONTAL") {
    return css`
      flex-direction: row;
      transform: translateY(-50%);
      top: -50px;
    `;
  }
  return css`
    flex-direction: column;
    transform: translateX(-50%);
    left: -50px;
  `;
};

const groupChipAxisDirectionStyle = (
  axis: AxisType,
  direction: DirectionType,
) => {
  if (axis === "HORIZONTAL") {
    return direction === "START"
      ? css`
          right: 48px;
        `
      : css`
          left: 48px;
        `;
  }

  return direction === "START"
    ? css`
        bottom: 48px;
      `
    : css`
        top: 48px;
      `;
};

const cursorIconPathDict: cursorIconPathDict = {
  HORIZONTAL: {
    END: "M10 6.86603C10.6667 6.48113 10.6667 5.51887 10 5.13397L4 1.66987C3.33333 1.28497 2.5 1.7661 2.5 2.5359V9.4641C2.5 10.2339 3.33333 10.715 4 10.3301L10 6.86603Z",
    START:
      "M2 5.13397C1.33333 5.51887 1.33333 6.48113 2 6.86603L8 10.3301C8.66667 10.715 9.5 10.2339 9.5 9.4641V2.5359C9.5 1.7661 8.66667 1.28497 8 1.66987L2 5.13397Z",
  },
  VERTICAL: {
    END: "M5.13397 10C5.51887 10.6667 6.48113 10.6667 6.86603 10L10.3301 4C10.715 3.33333 10.2339 2.5 9.4641 2.5H2.5359C1.7661 2.5 1.28497 3.33333 1.66987 4L5.13397 10Z",
    START:
      "M6.86603 2C6.48113 1.33333 5.51887 1.33333 5.13397 2L1.66987 8C1.28497 8.66667 1.7661 9.5 2.5359 9.5H9.4641C10.2339 9.5 10.715 8.66667 10.3301 8L6.86603 2Z",
  },
};

/** ---------- components ---------- */

const CursorIcon = ({ fill, axis, direction }: cursorIconParams) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d={cursorIconPathDict[axis][direction]} fill={fill} />
    </svg>
  );
};

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

const MarkerContainer = styled.div<{ $axis: AxisType | null }>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;

  display: flex;
  align-items: center;

  ${({ $axis }) => markerContainerAxisStyle($axis)}
`;

const PointContainer = styled.div<{ $axis: AxisType }>`
  position: absolute;

  width: 12px;
  height: 12px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $axis }) => pointContainerAxisStyle($axis)}
`;

const GroupChip = styled.div<{
  $axis: AxisType;
  $direction: DirectionType;
  $isCurrent: boolean;
  $background: string;
}>`
  position: absolute;

  padding: 6px;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  ${({ $axis }) => groupChipAxisBaseStyle($axis)}
  ${({ $axis, $direction }) => groupChipAxisDirectionStyle($axis, $direction)}
  ${({ $background }) => css`
    background-color: ${$background};
  `}

  > span {
    ${(p) => css`
      ${p.theme.fonts.narrative};
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  }
  ${({ $isCurrent }) => {
    if ($isCurrent) {
      return css`
        opacity: 100%;
      `;
    } else {
      return css`
        opacity: 20%;
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

  ${({ $isDragging, $axis }) =>
    $axis !== null &&
    $isDragging &&
    css`
      width: 72px;
      height: 72px;

      margin-bottom: ${$axis === "VERTICAL" ? "0px" : "14px"};
      margin-right: ${$axis === "VERTICAL" ? "14px" : "0px"};
    `}

  ${({ $imgURL }) => css`
    background-image: url(${$imgURL});
    background-size: cover;
    background-position: center center;
  `}

  ${(p) => css`
    box-shadow: 0 0 0 2px ${p.theme.foregroundColors.foregroundStrongest};
  `}
`;
