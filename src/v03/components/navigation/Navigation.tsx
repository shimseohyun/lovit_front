import * as S from "./Navigateion.styled";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@hooksV03/api/auth";
const Navigation = () => {
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
        <button onClick={onClickLogout}>로그아웃</button>
      </S.Content>
    </S.Container>
  );
};

export default Navigation;
