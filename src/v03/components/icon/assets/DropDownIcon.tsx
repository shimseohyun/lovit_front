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
        d="M14.518 10.5C15.141 10.5006 15.4527 11.2545 15.0121 11.6953L13.061 13.6465C12.4753 14.2321 11.5257 14.232 10.9399 13.6465L8.98875 11.6953C8.54788 11.2544 8.85954 10.5003 9.48289 10.5H14.518Z"
        fill={color}
      />
    </svg>
  );
};

export default DropDownIcon;
