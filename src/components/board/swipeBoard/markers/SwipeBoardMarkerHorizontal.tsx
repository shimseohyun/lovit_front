import styled from "@emotion/styled";
import type { Summary } from "@interfaces/type";

type Parms = {
  isSelected: boolean;
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
  top: 18px;
  left: 50%;
`;

const Img = styled.img`
  position: absolute;

  transform: translateX(-50%);
  top: 24px;
  left: 50%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const CenterImg = styled.img`
  position: absolute;

  transform: translate(-50%, -50%);
  top: calc(50% + 24px);
  left: 50%;
  width: 20px;
  height: 20px;

  border-radius: 50%;
  object-fit: cover;

  opacity: 60%;
`;

const SwipeBoardMarkerHorizontal = (parms: Parms) => {
  const { info, isSelected } = parms;
  return (
    <Container>
      {isSelected ? (
        <>
          <Marker src={`/assets/marker/SwipeBoard_Horizontal.svg`} />
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

export default SwipeBoardMarkerHorizontal;
