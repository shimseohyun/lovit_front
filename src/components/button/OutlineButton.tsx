import * as S from "./Button.styled";
import type { ComponentPropsWithoutRef } from "react";

type Parms = ComponentPropsWithoutRef<"button"> & {};

const OutlineButton = (parms: Parms) => {
  const { children, ...props } = parms;
  return <S.LikeButton {...props}>{children}</S.LikeButton>;
};

export default OutlineButton;
