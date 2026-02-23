import BottomButton from "@componentsV03/button/BottomButton";
import FillButton from "@componentsV03/button/FillButton";
import {
  PageContainer,
  PageViewPort,
} from "@componentsV03/layout/DefaultLayout";
import Navigation from "@componentsV03/navigation/Navigation";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useNavigate } from "react-router-dom";
import LogoOnboarding from "@componentsV03/onboarding/LogoOnboarding";
import Label from "@componentsV03/label/Label";
import Spacing from "@componentsV03/spacing/Spacing";

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <PageContainer>
        <Navigation />
        <Spacing size={16} />
        <Label
          font="head1"
          color={"textStrongest"}
          style={{ textAlign: "center" }}
        >{`내 손으로 채우는\n나만의 취향 사분면`}</Label>
        <Spacing size={10} />
        <Label font="body1" color="textLight">
          나의 취향 대삼각형을 찾아서...
        </Label>
        <PageViewPort>
          <LogoOnboarding />
        </PageViewPort>
        <BottomButton>
          <FillButton
            buttonType="PRIMARY"
            onClick={() => {
              navigate("/evaluate/0");
            }}
          >
            진단 시작하기
          </FillButton>
          {isLoggedIn && (
            <FillButton
              onClick={() => {
                navigate("/result/0");
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
