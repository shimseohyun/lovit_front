import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useBoardActions,
  useBoardState,
} from "@hooks/board/context/BoardContext";
import type { Summary } from "@interfaces/type";

type Parms = {
  info: Summary;
};

const Wrapper = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  width: 100%;
  height: 120px;

  display: flex;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  ${(p) => {
    if (p.isSelected) {
      return css`
        box-shadow: 0 0 0 3px ${p.theme.strokeColors.strokeStorngest};
        transform: scale(0.9);
      `;
    }
  }}
`;
const Img = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;
const Label = styled.div`
  position: absolute;
  height: 32px;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  ${(p) => css`
    ${p.theme.fonts.body3B}
    color: ${p.theme.fontColors.textInverseLight};
  `}
`;

const Checked = styled.img`
  position: absolute;
  right: 0px;
  top: 0px;
`;
const SelectorItem = (parms: Parms) => {
  const { likeDic } = useBoardState();
  const { setLike } = useBoardActions();
  const { info } = parms;
  const id = info.id;
  const liked = likeDic[id];

  const onClick = () => {
    setLike(id, !liked);
  };

  return (
    <Wrapper onClick={onClick} isSelected={liked}>
      <Img src={info.thumbnaeilURL} />
      {info.name}
      <Gradient />
      <Label>{info.name}</Label>
      {liked && <Checked src={`/assets/marker/Checked.svg`} />}
    </Wrapper>
  );
};
export default SelectorItem;
