import styled from "@emotion/styled";
import { icons, type IconKey } from "./icons";
import { css } from "@emotion/react";

interface IconProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: IconKey;
  size?: number;
}

export interface IconAssetProps {
  color?: string;
  size?: number;
}

const Container = styled.div<{ $size: number }>`
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
    display: flex;
  `}
`;

const IconBox = (props: IconProps) => {
  const { icon, size = 24, color, ...attributes } = props;
  const IconComponent = icons[icon];

  if (!IconComponent) return;

  return (
    <Container $size={size} {...attributes}>
      <IconComponent size={size} color={color} />
    </Container>
  );
};

export default IconBox;
