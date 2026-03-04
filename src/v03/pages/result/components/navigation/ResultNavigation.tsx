import * as S from "@componentsV03/navigation/Navigateion.styled";

import { useAuth } from "@hooksV03/auth/useAuth";
import { usePostLogout } from "@hooksV03/api/auth";

import { postGoogleLogin } from "@apisV03/firebase/domain/auth";
import { useResultContext } from "@pagesV03/result/context/ResultProvider";
import { getItemGroup } from "@dataV03/itemSummary";
import { useBottomSheet } from "@hooksV03/bottomsheet/useBottomsheet";
import SelectGroupBottomsheet from "@componentsV03/bottomsheet/contents/SelectGroupBottomsheet";
import Label from "@componentsV03/label/Label";
import IconBox from "@componentsV03/icon/IconBox";
import Flex from "@componentsV03/flex/Flex";

const ResultNavigation = () => {
  const { isLoggedIn } = useAuth();
  const { mutate: postLogout } = usePostLogout();

  const { openBottomSheet } = useBottomSheet();
  const onClickGroupButton = () => {
    openBottomSheet(<SelectGroupBottomsheet />);
  };

  const onClickLogin = () => {
    postGoogleLogin();
  };
  const onClickLogout = () => {
    postLogout();
  };

  const { boardID, groupID } = useResultContext();
  const name =
    groupID !== undefined ? getItemGroup(boardID, groupID).name : "전체 결과";

  return (
    <>
      <S.Container>
        <S.Content>
          <Flex onClick={onClickGroupButton} gap="0px">
            <Label font="body1B" color="titleStrongest">
              {name}
            </Label>
            <IconBox icon="dropDown" />
          </Flex>

          {isLoggedIn ? (
            <S.LabelButton onClick={onClickLogout}>로그아웃</S.LabelButton>
          ) : (
            <S.LabelButton onClick={onClickLogin}>로그인</S.LabelButton>
          )}
        </S.Content>
      </S.Container>
    </>
  );
};

export default ResultNavigation;
