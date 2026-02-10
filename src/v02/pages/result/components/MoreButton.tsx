import LoginBottomsheet from "@componentsV02/bottomsheet/contents/LoginBottomsheet";
import FillButton from "@componentsV02/button/FillButton";
import { useAuth } from "@hooksV02/auth/useAuth";
import { useBottomSheet } from "@hooksV02/bottomsheet/useBottomsheet";
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
        <span>사분면이 채워진만큼 구체적인 취향을 찾을 수 있어요.</span>
        <FillButton buttonType="PRIMARY" onClick={navigateEvaluationBoard}>
          사분면에 인물 추가하기
        </FillButton>
      </>
    );

  if (!isLoggedIn && !isMore) {
    return (
      <>
        <span>사분면이 채워진만큼 구체적인 취향을 찾을 수 있어요.</span>
        <FillButton
          onClick={() => openBottomSheet(<LoginBottomsheet />)}
          buttonType="PRIMARY"
        >
          사분면에 인물 추가하기
        </FillButton>
      </>
    );
  }

  if (isLoggedIn && !isMore) {
    return (
      <>
        <span>대단해요 모든 인물을 추가했어요!</span>
        <FillButton
          disabled={true}
          onClick={navigateEvaluationBoard}
          buttonType="PRIMARY"
        >
          사분면에 인물 추가하기
        </FillButton>
        {/* <FillButton>인물 추가하기</FillButton> */}
      </>
    );
  }
};
export default MoreButton;
