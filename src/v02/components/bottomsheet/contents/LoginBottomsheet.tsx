import FillButton from "@componentsV02/button/FillButton";
import * as S from "../Bottomsheet.styled";
import { usePostLogin } from "@hooksV02/api/auth";
import FullSpinner from "@componentsV02/spinner/Spinner";

const LoginBottomsheet = () => {
  const { mutate: postLogin, isPending: isLoading } = usePostLogin();
  const onClick = () => {
    postLogin();
  };
  return (
    <>
      {isLoading && <FullSpinner />}
      <S.Title>
        <h3>로그인이 필요해요</h3>
        <span>로그인 후 더 많은 인물을 분석할 수 있어요.</span>
      </S.Title>

      <FillButton onClick={onClick} disabled={isLoading}>
        구글 로그인으로 시작하기
      </FillButton>
    </>
  );
};

export default LoginBottomsheet;
