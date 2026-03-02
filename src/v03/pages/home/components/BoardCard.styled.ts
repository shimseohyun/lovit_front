import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;

  ${(p) => css`
    border: 1px solid ${p.theme.strokeColors.strokeLighter};
  `}
  background-color:white;
`;
