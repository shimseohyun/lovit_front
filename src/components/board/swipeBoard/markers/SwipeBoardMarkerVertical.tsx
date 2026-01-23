import styled from "@emotion/styled";
import type { Summary } from "@interfaces/type";

type Parms = {
  isSelected: boolean;
  info: Summary;
};

const Container = styled.div`
  z-index: 11;
  position: relative;
  width: 1px;
  height: 1px;
`;

const Marker = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  right: 18px;
`;

const CenterImg = styled.img`
  position: absolute;

  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;

  border-radius: 50%;
  object-fit: cover;
  opacity: 60%;
`;

const Img = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  right: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const SwipeBoardMarkerVertical = (parms: Parms) => {
  const { isSelected, info } = parms;
  return (
    <Container>
      {isSelected ? (
        <>
          <Marker src={`/assets/marker/SwipeBoard_Vertical.svg`} />
          <Img src={info.thumbnaeilURL} />
        </>
      ) : (
        <>
          <CenterImg src={info.thumbnaeilURL} />
        </>
      )}
    </Container>
  );
};

export default SwipeBoardMarkerVertical;
