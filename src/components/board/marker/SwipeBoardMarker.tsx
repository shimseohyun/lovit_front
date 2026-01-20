import styled from "@emotion/styled";
import type { Summary } from "../../../type/type";

type Parms = {
  info: Summary;
};
const Wrapper = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: solid 1px #ddd;
`;

const SwipeBoardMarker = (parms: Parms) => {
  const { info } = parms;
  return <Wrapper src={info.thumbnaeilURL} />;
};

export default SwipeBoardMarker;
