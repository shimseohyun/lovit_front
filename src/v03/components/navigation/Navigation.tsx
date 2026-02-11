import * as S from "./Navigateion.styled";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@hooksV03/api/auth";
import { useAuth } from "@hooksV03/auth/useAuth";
const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const { mutate: postLogout } = usePostLogout();
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };
  const onClickLogout = () => {
    postLogout();
  };

  return (
    <S.Container>
      <S.Content>
        <span onClick={onClickLogo}>lovit</span>
        {isLoggedIn ? (
          <button onClick={onClickLogout}>로그아웃</button>
        ) : (
          <div></div>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Navigation;
