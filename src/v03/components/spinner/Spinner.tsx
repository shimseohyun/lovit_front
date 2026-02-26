import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import Label from "@componentsV03/label/Label";
import Flex from "@componentsV03/flex/Flex";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div<{ $isBackground: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;

  ${({ $isBackground }) => css`
    background: ${$isBackground
      ? "rgba(255, 255, 255, 100)"
      : "rgba(255, 255, 255, 0)"};
  `}

  pointer-events: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  touch-action: none;
  pointer-events: none;
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 9999px;

  ${(p) => css`
    border: 4px solid ${p.theme.foregroundColors.mainLightest};
    border-top-color: ${p.theme.foregroundColors.mainStrongest};
  `}

  animation: ${spin} 800ms linear infinite;
`;

type Parms = {
  label?: string;
  isBackground?: boolean;
};
const FullSpinner = (parms: Parms) => {
  const { label, isBackground = false } = parms;
  return (
    <Overlay aria-busy="true" aria-label="Loading" $isBackground={isBackground}>
      <Flex direction="column" gap="16px" alignItem="center">
        <Spinner />
        {label && (
          <Label font="body1" color="textLight">
            {label}
          </Label>
        )}
      </Flex>
    </Overlay>
  );
};

export default FullSpinner;
