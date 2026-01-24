import styled from "@emotion/styled";
import type { Summary } from "@interfaces/type";

type Parms = {
  info: Summary;
};

const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 1px;
  height: 1px;
`;

const Marker = styled.img`
  position: absolute;

  transform: translateX(-50%);
  bottom: 4px;
  left: 50%;
`;

const Img = styled.img`
  position: absolute;

  transform: translateX(-50%);
  bottom: 10px;
  left: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const SelectedSwipeBoardMarkerHorizontal = (parms: Parms) => {
  const { info } = parms;
  return (
    <Container>
      <Marker src={`/assets/marker/Selected_SwipeBoard_Horizontal.svg`} />
      <Img src={info.thumbnaeilURL} />
    </Container>
  );
};

export default SelectedSwipeBoardMarkerHorizontal;
