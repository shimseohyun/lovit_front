import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useResultContext } from "@pagesV03/result/context/ResultProvider";

const pulseGrow = (width: number) => keyframes`
  0% {
    transform: ${width + 0}%;
    opacity: 0.6;
  }
  50% {
    width: ${width + 10}%; /* +10% */
    opacity: 0.4;
  }
  100% {
    transform: ${width + 0}%;
    opacity: 0.6;
  }
`;

const Container = styled.div`
  flex-grow: 1;
  height: 10px;

  border-radius: 80px;
  overflow: hidden;
  position: relative;

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}
`;

/** 실제 진행률 (고정) */
const Bar = styled.div<{ $width: number }>`
  position: absolute;
  top: 0;
  left: 0;

  height: 10px;
  border-radius: 80px;

  ${({ $width }) => css`
    width: ${$width}%;
  `}

  ${({ theme }) => css`
    background: linear-gradient(
      90deg,
      ${theme.foregroundColors.mainLightest} 0%,
      ${theme.foregroundColors.mainStrongest} 100%
    );
  `}
`;

/** 늘어나는 잔상 바 (반투명) */
const PulseBar = styled.div<{ $width: number; $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  height: 10px;
  border-radius: 80px;

  ${({ $width }) => css`
    width: ${$width}%;
  `}

  transform-origin: left center;
  will-change: transform, opacity;
  pointer-events: none;

  ${({ $isActive, $width }) =>
    $isActive &&
    css`
      animation: ${pulseGrow($width)} 2s ease-in-out infinite;
    `}

  ${({ theme }) => css`
    background-color: ${theme.foregroundColors.mainLighter};
  `}
`;

// TODO: - 그룹, 전체 고민좀...
const CompletedProgress = () => {
  const { itemList, groupItemCount } = useResultContext();

  const currentCount = itemList.length;

  const safeTotal = Math.max(groupItemCount, 1);
  const percent = Math.max(0, Math.min(100, (currentCount / safeTotal) * 100));

  // 0% 또는 100%일 때는 굳이 펄스 안 돌려도 됨
  const isPulseActive = percent > 0 && percent < 100;

  return (
    <Flex gap="8px" width="100%" alignItem="center" padding="0px 16px">
      <Label font="body1" color="textLighter" style={{ width: "64px" }}>
        진행률
      </Label>

      <Container>
        <Bar $width={percent} />
        <PulseBar $width={percent} $isActive={isPulseActive} />
      </Container>

      <Label font="body1" color="textLighter" style={{ width: "64px" }}>
        {Math.round(percent)}%
      </Label>
    </Flex>
  );
};

export default CompletedProgress;
