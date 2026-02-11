import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const blink = keyframes`
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.6; }
`;

const Viewport = styled.div`
  width: 100%;

  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: grid;
  width: 240px;
  height: 268px;
  padding-bottom: 28px;
  row-gap: 10px;
  column-gap: 10px;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const Item = styled.div`
  border-radius: 12px;
  opacity: 0.1;
  background: var(--main-main-600, #f42572);

  /* 4번째만 깜빡 */
  &:nth-of-type(4) {
    animation: ${blink} 1200ms ease-in-out infinite;
  }
`;

const LogoOnboarding = () => {
  return (
    <Viewport>
      <Container>
        <Item />
        <Item />
        <Item />
        <Item />
      </Container>
    </Viewport>
  );
};

export default LogoOnboarding;
