import * as Title from "@componentsV02/title/Title.styled";
import BottomButton from "@componentsV02/button/BottomButton";
import FillButton from "@componentsV02/button/FillButton";
import {
  PageContainer,
  PageViewPort,
} from "@componentsV02/layout/DefaultLayout";
import Navigation from "@componentsV02/navigation/Navigation";
import { useAuth } from "@hooksV02/auth/useAuth";
import { useNavigate } from "react-router-dom";
import LogoOnboarding from "@componentsV02/onboarding/LogoOnboarding";

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <PageContainer>
        <Navigation />
        <Title.BoardTitleContainer>
          <h1>{`사분면에서 찾는\n나의 취향 버뮤다 라인`}</h1>
        </Title.BoardTitleContainer>
        <Title.BoardDescription>
          내 버뮤다 라인은 누구일까?
        </Title.BoardDescription>
        <PageViewPort>
          <LogoOnboarding />
        </PageViewPort>
        <BottomButton>
          <FillButton
            buttonType="PRIMARY"
            onClick={() => {
              navigate("/evaluate");
            }}
          >
            진단 시작하기
          </FillButton>
          {isLoggedIn && (
            <FillButton
              onClick={() => {
                navigate("/result");
              }}
            >
              내 사분면 확인하기
            </FillButton>
          )}
        </BottomButton>
      </PageContainer>
    </>
  );
};

export default HomePage;
