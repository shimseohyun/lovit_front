import LoginBottomsheet from "@componentsV03/bottomsheet/contents/LoginBottomsheet";
import FillButton from "@componentsV03/button/FillButton";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import Progress from "@pagesV03/evaluation/components/navigation/Progress";
import { useNavigate } from "react-router-dom";

type Parms = {
  isMore: boolean;
};

const MoreButton = (parms: Parms) => {
  const { isMore } = parms;
  const { isLoggedIn } = useAuth();
  const { openBottomSheet } = useBottomSheet();

  const navigate = useNavigate();
  const navigateEvaluationBoard = () => {
    navigate("/evaluate");
  };

  if (isMore)
    return (
      <>
        <span>취향 분석 진행률 50%</span>
        <Progress totalCount={50} currentCount={25} />
        <FillButton
          style={{
            backgroundColor: "#F42572",
            // justifyContent: "space-between",
          }}
          buttonType="PRIMARY"
          onClick={navigateEvaluationBoard}
        >
          <span>더 많은 인물 분석하기</span>
        </FillButton>
      </>
    );

  if (!isLoggedIn && !isMore) {
    return (
      <>
        <span>취향 분석 진행률 50%</span>
        <Progress totalCount={50} currentCount={25} />
        <FillButton
          style={{
            backgroundColor: "#F42572",
            // justifyContent: "space-between",
          }}
          buttonType="PRIMARY"
          onClick={navigateEvaluationBoard}
        >
          <span>더 많은 인물 분석하기</span>
        </FillButton>
      </>
    );
  }

  if (isLoggedIn && !isMore) {
    return (
      <>
        <span>대단해요 모든 인물을 추가했어요!</span>
        {/* <FillButton
          style={{ backgroundColor: "#F42572" }}
          disabled={true}
          onClick={navigateEvaluationBoard}
          buttonType="PRIMARY"
        >
          사분면에 인물 추가하기
        </FillButton> */}
      </>
    );
  }
};
export default MoreButton;
