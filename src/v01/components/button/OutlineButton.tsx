import * as S from "./Button.styled";
import type { ComponentPropsWithoutRef } from "react";

type Parms = ComponentPropsWithoutRef<"button"> & { isSelected: boolean };

const OutlineButton = (parms: Parms) => {
  const { children, isSelected, ...props } = parms;
  return (
    <S.LikeButton isSelected={isSelected} {...props}>
      {children}
    </S.LikeButton>
  );
};

export default OutlineButton;
