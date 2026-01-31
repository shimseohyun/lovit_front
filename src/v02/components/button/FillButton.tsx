import * as S from "./Button.styled";

import type { ComponentPropsWithoutRef } from "react";

type Parms = ComponentPropsWithoutRef<"button"> & {};

const FillButton = (parms: Parms) => {
  const { children, disabled = true, ...props } = parms;
  return (
    <S.Button disabled={disabled} {...props}>
      {children}
    </S.Button>
  );
};
export default FillButton;
