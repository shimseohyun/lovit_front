import LoginBottomsheet from "@componentsV03/bottomsheet/contents/LoginBottomsheet";
import FillButton from "@componentsV03/button/FillButton";

import { useAuth } from "@hooksV03/auth/useAuth";
import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import { useNavigate } from "react-router-dom";
import CompletedProgress from "./CompletedProgress";
import { useResultContext } from "@pagesV03/result/context/ResultProvider";
import Flex from "@componentsV03/flex/Flex";

const MoreButton = () => {
  const { isMore, boardID, groupID } = useResultContext();
  const { isLoggedIn } = useAuth();
  const { openBottomSheet } = useBottomSheet();

  // TODO: 고민좀 해보기..
  const navigate = useNavigate();
  const navigateEvaluationBoard = () => {
    groupID !== undefined
      ? navigate(`/evaluate/${boardID}/${groupID}`)
      : navigate(`/evaluate/${boardID}`);
  };

  const isMoreItem = (isMore && isLoggedIn) || !isLoggedIn;
  const isNeedLoginLogin = !isLoggedIn && !isMore;

  if (isMoreItem)
    return (
      <>
        <CompletedProgress />

        <Flex width="100%" direction="row" gap="10px">
          <FillButton
            buttonType="MAIN_PRIMARY"
            onClick={
              !isNeedLoginLogin
                ? navigateEvaluationBoard
                : () => openBottomSheet(<LoginBottomsheet />)
            }
          >
            더 많은 인물 분류하기
          </FillButton>
          {groupID !== undefined && (
            <FillButton
              buttonType="ASSISTIVE"
              onClick={
                !isNeedLoginLogin
                  ? navigateEvaluationBoard
                  : () => openBottomSheet(<LoginBottomsheet />)
              }
            >
              전체 결과
            </FillButton>
          )}
        </Flex>
      </>
    );

  if (isLoggedIn && !isMore) {
    return (
      <>
        <span>대단해요 모든 인물을 추가했어요!</span>
      </>
    );
  }
};
export default MoreButton;
