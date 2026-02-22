/** @jsxImportSource @emotion/react */
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { css, type Interpolation, type Theme } from "@emotion/react";

export type FlexStyle = {
  width?: "100%" | "auto" | string;
  height?: string;
  flexGrow?: 0 | 1;
  flexShrink?: 0 | 1;
  gap?: string;
  direction?: "column" | "row";
  alignItem?: "center" | "flex-start" | "flex-end" | "stretch";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  padding?: string;
  zIndex?: number | "auto";
};

export const getFlexStyle = (style: FlexStyle) => css`
  width: ${style.width};
  height: ${style.height};
  flex-grow: ${style.flexGrow};

  display: flex;
  flex-direction: ${style.direction};
  flex-shrink: ${style.flexShrink};
  gap: ${style.gap};
  align-items: ${style.alignItem};
  justify-content: ${style.justifyContent};

  overflow: ${style.overflow};

  padding: ${style.padding};
  z-index: ${style.zIndex};
`;

type FlexOwnProps = FlexStyle & {
  css?: Interpolation<Theme>;
};

export type FlexProps<T extends ElementType = "div"> = {
  as?: T;
} & FlexOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof FlexOwnProps | "as">;

const Flex = <T extends ElementType = "div">(props: FlexProps<T>) => {
  const {
    as,
    width = "auto",
    height = "auto",
    flexGrow = 0,
    flexShrink = 0,
    gap = "0rem",
    direction = "row",
    alignItem = "stretch",
    justifyContent = "flex-start",
    overflow = "hidden",
    padding = "0rem",
    zIndex = "auto",
    css: userCss,
    ...attributes
  } = props;

  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      {...attributes}
      css={[
        getFlexStyle({
          width,
          height,
          flexGrow,
          flexShrink,
          gap,
          direction,
          alignItem,
          justifyContent,
          overflow,
          padding,
          zIndex,
        }),
        userCss,
      ]}
    />
  );
};

export default Flex;
