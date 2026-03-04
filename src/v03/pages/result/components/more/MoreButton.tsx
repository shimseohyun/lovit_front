import LoginBottomsheet from "@componentsV03/bottomsheet/contents/LoginBottomsheet";
import FillButton from "@componentsV03/button/FillButton";

import { useAuth } from "@hooksV03/auth/useAuth";
import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import { useNavigate } from "react-router-dom";

import { useResultContext } from "@pagesV03/result/context/ResultProvider";

import { maxItemCount } from "@constantsV03/auth";

import CompletedProgress from "./CompletedProgress";
import { EVALUATE, SELECT } from "@routersV03/path";

const MoreButton = () => {
  const { isMore, boardID, groupID, totalItemCount } = useResultContext();
  const { isLoggedIn } = useAuth();
  const { openBottomSheet } = useBottomSheet();

  const isGroup = groupID !== undefined;

  const navigate = useNavigate();

  const isFin = !isGroup && !isMore;
  const isNeedLogin = !isLoggedIn && totalItemCount >= maxItemCount;

  const onClickButton = (link: string) => {
    if (isNeedLogin) {
      openBottomSheet(<LoginBottomsheet />);
    } else {
      navigate(link);
    }
  };

  return (
    <>
      {!isFin && <CompletedProgress />}

      {isFin ? (
        <span>추천 인물 분류를 완료했어요!</span>
      ) : (
        <FillButton
          onClick={() =>
            onClickButton(
              isGroup && !isMore ? SELECT(boardID) : EVALUATE(boardID, groupID),
            )
          }
          buttonType={isMore ? "MAIN_PRIMARY" : "MAIN_ASSISTIVE"}
        >
          {isGroup
            ? isMore
              ? "계속 분류하기"
              : "다른 그룹 분류하기"
            : "더 많은 인물 분류하기"}
        </FillButton>
      )}
    </>
  );
};
export default MoreButton;
