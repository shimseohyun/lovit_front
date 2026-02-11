import styled from "@emotion/styled";

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

const Item = styled.div<{ $delayMs: number }>`
  border-radius: 12px;
  background: var(--main-main-600, #f42572);

  /* 기본 상태 */
  opacity: 0.1;

  /* 1→2→3→4 순서로 깜빡 */
  animation: blink 4000ms ease-in-out infinite;
  animation-delay: ${(p) => p.$delayMs}ms;

  @keyframes blink {
    0% {
      opacity: 0.1;
    }
    12% {
      opacity: 0.2;
    }
    25% {
      opacity: 0.1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

const FinOnboarding = () => {
  // 총 4개가 1.2초 안에 순서대로 한번씩 "번쩍"
  const step = 4000 / 4; // 300ms

  return (
    <Viewport>
      <Container>
        <Item $delayMs={1 * step} />
        <Item $delayMs={0 * step} />
        <Item $delayMs={2 * step} />
        <Item $delayMs={3 * step} />
      </Container>
    </Viewport>
  );
};

export default FinOnboarding;
