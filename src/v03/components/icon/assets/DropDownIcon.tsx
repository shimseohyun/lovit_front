import { useTheme } from "@emotion/react";
import type { IconAssetProps } from "../IconBox";

const DropDownIcon = (props: IconAssetProps) => {
  const theme = useTheme();
  const { color = theme.fontColors.textDisable, size = 24 } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2002 8.5C17.9417 8.50015 18.3649 9.34717 17.9199 9.94043L14 15.167C13 16.5 11 16.5 10 15.167L6.08008 9.94043C5.63515 9.34717 6.0583 8.50016 6.79981 8.5H17.2002Z"
        fill={color}
      />
    </svg>
  );
};

export default DropDownIcon;
