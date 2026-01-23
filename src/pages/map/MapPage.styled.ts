import styled from "@emotion/styled";

export const MainPageContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MapBoard = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 20px;

  cursor: pointer;
`;
