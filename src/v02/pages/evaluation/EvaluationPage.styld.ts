import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100svh;
  max-width: 100svh;
  display: flex;

  flex-direction: column;
`;

export const ViewPort = styled.div`
  width: 100%;
  flex-grow: 1;

  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
