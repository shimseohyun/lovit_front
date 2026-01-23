import * as S from "./Button.styled";

import type { ComponentPropsWithoutRef } from "react";

type Parms = ComponentPropsWithoutRef<"button"> & {};

const FillButton = (parms: Parms) => {
  const { children, ...props } = parms;
  return <S.Button {...props}>{children}</S.Button>;
};
export default FillButton;
