import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { Summary } from "@interfaces/type";

type Parms = {
  isSelected: boolean;
  info: Summary;
};
const Wrapper = styled.img<{ isSelected: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  ${({ isSelected }) => {
    if (isSelected) {
      return css`
        width: 28px;
        height: 28px;
        border: solid 2px rgba(255, 0, 0, 0.7);
      `;
    } else {
      return css`
        width: 24px;
        height: 24px;
        border: solid 1px #ddd;
      `;
    }
  }}

  border-radius: 20px;
  object-fit: cover;
`;

const TouchBoardMarker = (parms: Parms) => {
  const { info, isSelected } = parms;
  return <Wrapper src={info.thumbnaeilURL} isSelected={isSelected} />;
};

export default TouchBoardMarker;
