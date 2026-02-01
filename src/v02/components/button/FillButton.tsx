import * as S from "./Button.styled";

import type { ComponentPropsWithoutRef } from "react";

export type FillButtonType = "ASSISTIVE" | "PRIMARY";

type Parms = ComponentPropsWithoutRef<"button"> & {
  buttonType?: FillButtonType;
};

const FillButton = (parms: Parms) => {
  const {
    children,
    disabled = false,
    buttonType = "ASSISTIVE",
    ...props
  } = parms;
  return (
    <S.Button $buttonType={buttonType} disabled={disabled} {...props}>
      {children}
    </S.Button>
  );
};
export default FillButton;
