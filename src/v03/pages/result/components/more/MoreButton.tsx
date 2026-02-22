import LoginBottomsheet from "@componentsV03/bottomsheet/contents/LoginBottomsheet";
import FillButton from "@componentsV03/button/FillButton";

import { useAuth } from "@hooksV03/auth/useAuth";
import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import { useNavigate } from "react-router-dom";
import CompletedProgress from "./CompletedProgress";

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
        <CompletedProgress />

        <FillButton
          buttonType="PRIMARY"
          onClick={
            isLoggedIn
              ? navigateEvaluationBoard
              : () => openBottomSheet(<LoginBottomsheet />)
          }
          style={{ backgroundColor: "#F42572" }}
        >
          더 많은 인물 분류하기
        </FillButton>
      </>
    );

  if (isLoggedIn && !isMore) {
    return (
      <>
        <span>대단해요 모든 인물을 추가했어요!</span>
        {/* <FillButton
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
