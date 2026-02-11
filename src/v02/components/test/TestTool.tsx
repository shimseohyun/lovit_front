import { postGoogleLogin, postLogout } from "@apisV02/firebase/domain/auth";
import LoginBottomsheet from "@componentsV02/bottomsheet/contents/LoginBottomsheet";

import styled from "@emotion/styled";
import { useResetUserBoardData } from "@hooksV02/api/userBoardData";
import { useAuth } from "@hooksV02/auth/useAuth";
import { useBottomSheet } from "@hooksV02/bottomsheet/useBottomsheet";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 10px;
  background-color: white;
  border: 1px solid black;

  position: fixed;
  z-index: 20;
  opacity: 40%;

  top: 44px;
  right: 0px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  > button {
    cursor: pointer;
    width: auto;
    text-align: start;
    padding: 4px;
  }
  > button:hover {
    background-color: aliceblue;
  }
`;

const TestTool = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openBottomSheet } = useBottomSheet();

  return (
    <Container className="test-tool">
      <ReactQueryDevtools />
      {user ? (
        <span>{user?.name} 님 안녕하세요!</span>
      ) : (
        <span>게스트 로그인</span>
      )}
      {user ? <Logout /> : <Login />}
      <ResetLocalSorage />
      <ResetDatabase />
      <button onClick={() => navigate("/evaluate")}> 평가보드</button>
      <button onClick={() => navigate("/result")}> 결과</button>
      <button onClick={() => openBottomSheet(<LoginBottomsheet />)}>
        바텀시트 열기
      </button>
    </Container>
  );
};

export default TestTool;

const ResetLocalSorage = () => {
  const onClick = () => {
    localStorage.clear();
  };
  return <button onClick={onClick}>로컬 스토리지 삭제</button>;
};

const ResetDatabase = () => {
  const { user } = useAuth();
  const { mutate } = useResetUserBoardData(user?.uid);
  const onClick = () => {
    mutate();
  };
  return <button onClick={onClick}>디비 초기화</button>;
};

const Login = () => {
  const onClick = () => {
    postGoogleLogin();
  };
  return <button onClick={onClick}>로그인</button>;
};

const Logout = () => {
  const onClick = () => {
    postLogout();
  };
  return <button onClick={onClick}>로그아웃</button>;
};
