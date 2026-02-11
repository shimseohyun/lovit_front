import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 4px;

  display: flex;
  justify-content: start;

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}
`;

const Bar = styled.div<{ $width: number }>`
  height: 4px;
  transition: width 220ms ease-in-out;
  ${({ $width }) => css`
    width: ${$width}%;
  `}

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.mainLight};
  `}
`;

type Parms = {
  totalCount: number;
  currentCount: number;
};

const Progress = (parms: Parms) => {
  const { totalCount, currentCount } = parms;
  return (
    <Container>
      <Bar $width={(currentCount / totalCount) * 100} />
    </Container>
  );
};

export default Progress;
