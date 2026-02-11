import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Parms = {
  preferencePercent?: number;
  isLiked: boolean;
  img: string;

  left: number;
  top: number;
};

const BoardMarker = (parms: Parms) => {
  const { preferencePercent, img, left, top, isLiked } = parms;

  const size =
    preferencePercent === undefined ? 12 : (preferencePercent / 100) * 24;
  const opacity =
    preferencePercent === undefined ? 100 : preferencePercent + 10;

  return (
    <Marker
      src={img}
      $top={top}
      $left={left}
      $size={size}
      $opacity={opacity}
      $isLiked={isLiked}
    />
  );
};

export default BoardMarker;

export const Marker = styled.img<{
  $top: number;
  $left: number;
  $size: number;
  $opacity: number;
  $isLiked: boolean;
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
      border: solid ${p.$isLiked ? 2 : 1}px;
      border-color: ${p.$isLiked
        ? p.theme.foregroundColors.mainLight
        : p.theme.strokeColors.strokeLight};
    `;
  }}

  border-radius: 40px;

  object-fit: cover;
`;
