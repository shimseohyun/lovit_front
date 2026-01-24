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
        width: 32px;
        height: 32px;
      `;
    } else {
      return css`
        width: 24px;
        height: 24px;
      `;
    }
  }}

  border-radius: 20px;
  border: solid 1px #ddd;
  object-fit: cover;
`;

const TouchBoardMarker = (parms: Parms) => {
  const { info, isSelected } = parms;
  return <Wrapper src={info.thumbnaeilURL} isSelected={isSelected} />;
};

export default TouchBoardMarker;
