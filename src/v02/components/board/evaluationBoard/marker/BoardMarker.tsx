import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Parms = {
  preferencePercent?: number;
  img: string;

  left: number;
  top: number;
};

const BoardMarker = (parms: Parms) => {
  const { preferencePercent, img, left, top } = parms;

  const size =
    preferencePercent === undefined ? 12 : (preferencePercent / 100) * 24;
  const opacity =
    preferencePercent === undefined ? 100 : preferencePercent + 10;
  return (
    <Marker src={img} $top={top} $left={left} $size={size} $opacity={opacity} />
  );
};

export default BoardMarker;

export const Marker = styled.img<{
  $top: number;
  $left: number;
  $size: number;
  $opacity: number;
}>`
  touch-action: none;

  ${({ $left, $top, $size, $opacity }) => css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${$top}%;
    left: ${$left}%;

    width: ${$size + 12}px;
    height: ${$size + 12}px;
    opacity: ${$opacity}%;
  `}

  ${(p) => {
    return css`
      box-shadow: 0 0 0 1px ${p.theme.strokeColors.strokeLight};
    `;
  }}

  border-radius: 40px;

  object-fit: cover;
`;
