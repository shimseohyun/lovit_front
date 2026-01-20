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

  transform: translateY(-50%);
  top: 50%;
  right: 3px;
`;

const Img = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const SwipeBoardMarkerVertical = (parms: Parms) => {
  const { info } = parms;
  return (
    <Container>
      <Marker src={`/assets/marker/SwipeBoard_Vertical.svg`} />
      <Img src={info.thumbnaeilURL} />
    </Container>
  );
};

export default SwipeBoardMarkerVertical;
