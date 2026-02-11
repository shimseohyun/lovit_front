import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  /* 전체 영역에 투명 레이어를 깔아서 터치/클릭 차단 */
  background: rgba(0, 0, 0, 0);
  pointer-events: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  /* iOS 사파리에서 스크롤/터치 억제 보강 */
  touch-action: none;
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 9999px;

  /* 기본 스피너 */
  border: 4px solid #f4257220;
  border-top-color: #f42572ff;

  animation: ${spin} 800ms linear infinite;
`;

const FullSpinner = () => {
  return (
    <Overlay aria-busy="true" aria-label="Loading">
      <Spinner />
    </Overlay>
  );
};

export default FullSpinner;
