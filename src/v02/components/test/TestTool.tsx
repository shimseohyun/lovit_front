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
    <Container>
      <ResetLocalSorage />
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
