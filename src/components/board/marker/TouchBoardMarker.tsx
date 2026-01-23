import styled from "@emotion/styled";
import type { Summary } from "../../../type/type";

type Parms = {
  info: Summary;
};
const Wrapper = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 20px;
  border: solid 1px #ddd;
  object-fit: cover;
`;

const TouchBoardMarker = (parms: Parms) => {
  const { info } = parms;
  return <Wrapper src={info.thumbnaeilURL} />;
};

export default TouchBoardMarker;
