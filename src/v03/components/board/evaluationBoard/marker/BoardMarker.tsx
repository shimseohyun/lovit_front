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
    preferencePercent === undefined
      ? 1
      : Math.min(1, (preferencePercent + 10) / 100);

  return (
    <Marker
      $imgURL={img}
      $top={top}
      $left={left}
      $size={size}
      $opacity={opacity}
      $isLiked={isLiked}
    />
  );
};

export default BoardMarker;

export const Marker = styled.div<{
  $imgURL: string;
  $top: number;
  $left: number;
  $size: number;
  $opacity: number; // ✅ 0~1
  $isLiked: boolean;
}>`
  touch-action: none;
  pointer-events: none;

  ${({ $left, $top, $size, $opacity, $imgURL }) => css`
    position: absolute;
    transform: translate(-50%, -50%);
    top: ${$top}%;
    left: ${$left}%;

    width: ${$size + 12}px;
    height: ${$size + 12}px;
    opacity: ${$opacity};

    background-image: url(${$imgURL});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}

  border-radius: 9999px;

  ${(p) => {
    return css`
      border: solid ${p.$isLiked ? 2 : 1}px;
      border-color: ${p.$isLiked
        ? p.theme.foregroundColors.mainLight
        : p.theme.strokeColors.strokeLight};
    `;
  }}
`;
