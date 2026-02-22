import * as S from "./Share.styled";
import { usePostLogin } from "@hooksV03/api/auth";
import { useAuth } from "@hooksV03/auth/useAuth";

import Label from "@componentsV03/label/Label";

import { Section } from "@componentsV03/layout/DefaultLayout";

import FullSpinner from "@componentsV03/spinner/Spinner";
import Flex from "@componentsV03/flex/Flex";
import { copyLink, shareX } from "./ShareAction";
import { useResultContext } from "@pagesV03/result/context/ResultProvider";

type ActionParms = {
  label: string;
  imgURL: string;
  onClick: () => void;
};

const Action = (parms: ActionParms) => {
  const { label, imgURL, onClick } = parms;
  return (
    <S.ActionButton onClick={onClick}>
      <img className="icon" src={imgURL} />
      <Label font="body3B" color="textLightest">
        {label}
      </Label>
    </S.ActionButton>
  );
};

const Share = () => {
  const { handleCapture, resultLabel, isCaptureLoading } = useResultContext();
  const { isLoggedIn } = useAuth();
  const { mutate: postLogin, isPending: isLoginLoading } = usePostLogin();
  const onClick = () => {
    postLogin();
  };

  const isLoading = isLoginLoading || isCaptureLoading;
  return (
    <Section $gap={16}>
      {isLoading && <FullSpinner />}

      <Label font="body1" color="textLight">
        결과를 공유할 수 있어요
      </Label>

      <Flex width="100%" gap="8px" alignItem="center" justifyContent="center">
        <Action
          onClick={() => shareX(resultLabel)}
          imgURL="/assets/icons/share/x.svg"
          label="X로 공유"
        />
        <Action
          onClick={copyLink}
          imgURL="/assets/icons/share/link.svg"
          label="링크 복사"
        />
        <Action
          onClick={() => handleCapture()}
          imgURL="/assets/icons/share/image.svg"
          label="이미지 저장"
        />
      </Flex>

      {!isLoggedIn && (
        <Flex
          gap="4px"
          onClick={onClick}
          style={{ cursor: "pointer", paddingTop: "8px" }}
        >
          <Label
            font="body2B"
            color="textLightest"
            style={{
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
            }}
          >
            로그인하고 결과 저장하기
          </Label>
        </Flex>
      )}
    </Section>
  );
};
export default Share;
