import styled from "@emotion/styled";
import type { Summary } from "../../../type/type";

type Parms = {
  info: Summary;
};

const Container = styled.div`
  position: relative;
  width: 1px;
  height: 1px;
`;

const Marker = styled.img`
  position: absolute;

  transform: translateX(-50%);
  top: 3px;
  left: 50%;
`;

const Img = styled.img`
  position: absolute;

  transform: translateX(-50%);
  top: 8px;
  left: 50%;
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const SwipeBoardMarkerHorizontal = (parms: Parms) => {
  const { info } = parms;
  return (
    <Container>
      <Marker src={`/assets/marker/SwipeBoard_Horizontal.svg`} />
      <Img src={info.thumbnaeilURL} />
    </Container>
  );
};

export default SwipeBoardMarkerHorizontal;
