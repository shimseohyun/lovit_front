import styled from "@emotion/styled";
import type { Summary } from "../../../../type/type";

type Parms = {
  info: Summary;
};

const Container = styled.div`
  z-index: 11;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 1px;
  height: 1px;
`;

const Marker = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  left: 4px;
`;

const Img = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const SelectedSwipeBoardMarkerVertical = (parms: Parms) => {
  const { info } = parms;
  return (
    <Container>
      <Marker src={`/assets/marker/Selected_SwipeBoard_Vertical.svg`} />
      <Img src={info.thumbnaeilURL} />
    </Container>
  );
};

export default SelectedSwipeBoardMarkerVertical;
