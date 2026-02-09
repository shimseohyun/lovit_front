import * as S from "./ResultCell.styld";
import type { PropsWithChildren } from "react";
type Parms = PropsWithChildren;

const ResultCellLsit = (parms: Parms) => {
  const { children } = parms;
  return <S.List>{children}</S.List>;
};

export default ResultCellLsit;
