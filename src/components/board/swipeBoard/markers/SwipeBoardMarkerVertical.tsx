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

const CenterImg = styled.img`
  position: absolute;

  transform: translate(-50%, -50%);
  top: 50%;
  left: calc(50% - 24px);
  width: 28px;
  height: 28px;

  border-radius: 50%;
  object-fit: cover;
  opacity: 90%;
`;

const Marker = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  right: 20px;
`;

const Img = styled.img`
  position: absolute;

  transform: translateY(-50%);
  top: 50%;
  right: 28px;
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
