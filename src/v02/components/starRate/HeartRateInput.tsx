import { useTheme } from "@emotion/react";
import * as S from "./HeartRateInput.styled";

type Props = {
  value: number;
  onChange: (next: number) => void;
  disabled?: boolean;
};

const STEPS = 10;

const HeartRateInput = (props: Props) => {
  const { value, onChange } = props;
  const theme = useTheme();

  const getFill = (isActive: boolean) =>
    isActive
      ? theme.foregroundColors.mainLight
      : theme.foregroundColors.foregroundLighter;

  const getOpacity = (isActive: boolean) =>
    isActive ? (100 - (STEPS - value) * 8) / 100 : 1;

  const onClickHeartButton = (step: number) => {
    if (step === value) {
      onChange(step - 1);
    } else {
      onChange(step);
    }
  };

  return (
    <S.Container>
      {Array.from({ length: STEPS / 2 }, (_, idx) => {
        const step = idx * 2 + 1;
        const leftStep = step;
        const rightStep = step + 1;

        return (
          <S.HalfHeartButton key={idx}>
            <button
              key={leftStep}
              onClick={() => onClickHeartButton(leftStep + 0)}
            >
              <HeartHalf
                side="LEFT"
                fill={getFill(leftStep <= value)}
                opacity={getOpacity(leftStep <= value)}
              />
            </button>

            <button
              key={rightStep}
              onClick={() => onClickHeartButton(rightStep)}
            >
              <HeartHalf
                side="RIGHT"
                fill={getFill(rightStep <= value)}
                opacity={getOpacity(rightStep <= value)}
              />
            </button>
          </S.HalfHeartButton>
        );
      })}
    </S.Container>
  );
};

export default HeartRateInput;

type HeartHalfProps = {
  side: "LEFT" | "RIGHT";
  fill: string;
  opacity?: number;
};

const HEART_PATH = {
  LEFT: `M19 10C20.7333 10 22.3835 10.3663 23.9502 11.0996C25.4188 11.7871 26.6972 12.7383 27.7852 13.9531L28 14.2002V46.7002L25.0996 44.0996C21.7331 41.0664 18.9499 38.4499 16.75 36.25C14.5501 34.0501 12.8 32.0752 11.5 30.3252C10.2 28.5752 9.29206 26.9666 8.77539 25.5C8.25873 24.0334 8 22.5333 8 21C8 17.8667 9.05039 15.2504 11.1504 13.1504C13.2504 11.0504 15.8667 10 19 10Z`,
  RIGHT: `M9 10C12.1334 10 14.7496 11.0504 16.8496 13.1504C18.9496 15.2504 20 17.8667 20 21C20 22.5333 19.7412 24.0334 19.2246 25.5C18.708 26.9666 17.8 28.5752 16.5 30.3252C15.2 32.0752 13.4499 34.0501 11.25 36.25C9.05009 38.4499 6.26681 41.0664 2.90039 44.0996L0 46.7002V14.2002C1.1334 12.8669 2.48321 11.8329 4.0498 11.0996C5.6164 10.3663 7.2666 10 9 10Z`,
};

const HeartHalf = (props: HeartHalfProps) => {
  const { side, fill, opacity = 1 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="56"
      viewBox="0 0 28 56"
      fill="none"
      aria-hidden="true"
    >
      <path d={HEART_PATH[side]} fill={fill} opacity={opacity} />
    </svg>
  );
};
