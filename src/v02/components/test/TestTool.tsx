import { useResetUserBoardData } from "@apisV02/firebase/domain/user";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 10px;
  background-color: white;
  border: 1px solid black;

  position: fixed;
  z-index: 20;

  display: flex;
  flex-direction: column;
`;

const TestTool = () => {
  return (
    <Container className="test-tool">
      <ResetLocalSorage />
      <ResetDatabase />
    </Container>
  );
};

export default TestTool;

const ResetLocalSorage = () => {
  const onClick = () => {
    localStorage.clear();
    console.log("모든 로컬 스토리지를 삭제합니다.");
  };
  return <button onClick={onClick}>로컬 스토리지 삭제</button>;
};

const ResetDatabase = () => {
  const { mutate } = useResetUserBoardData();
  const onClick = () => {
    mutate();
  };
  return <button onClick={onClick}>디비 초기화</button>;
};
