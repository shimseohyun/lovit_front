import { css } from "@emotion/react";
import styled from "@emotion/styled";
export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 12px 10px 12px;
  flex-direction: column;
  gap: 4px;
`;

export const TitleLabel = styled.div`
  padding: 0px 2px;
  ${(p) => css`
    ${p.theme.fonts.head2}
    color:  ${p.theme.fontColors.titleStrongest};
  `}
`;
export const TitleSubLabel = styled.div`
  padding: 0px 2px;
  ${(p) => css`
    ${p.theme.fonts.body1}
    color:  ${p.theme.fontColors.textLighter};
  `}
`;

export const ScollContainer = styled.div`
  box-sizing: border-box;
  overflow: scroll;
  width: 100%;
  padding: 10px 10px 0px 10px;
`;
export const Scroll = styled.div`
  display: grid;
  row-gap: 12px;
  column-gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-bottom: 40px;
`;
