import { FixedPageContainer } from "@componentsV01/board/Board.styled";
import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";

import Spacing from "@componentsV03/spacing/Spacing";

export const copyLink = async () => {
  const shareUrl = window.location.href;

  try {
    await navigator.clipboard.writeText(shareUrl);
    alert("링크가 복사되었어요!");
  } catch {}
};

type Parms = {
  appKey?: string;
};
const InAppPage = (parms: Parms) => {
  const { appKey = "" } = parms;
  const targetUrl = window.location.href;

  if (appKey === "kakaotalk") {
    const scheme = `kakaotalk://web/openExternal?url=${encodeURIComponent(
      targetUrl,
    )}`;

    window.location.href = scheme;
  } else {
    // ✅ 3) 나머지 앱들: 강제 외부열기는 대부분 불가/불안정 → 새탭 시도 + 복사 폴백
    try {
      //   window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch {}

    try {
      copyLink();
    } catch {}
  }

  return (
    <FixedPageContainer>
      <Flex
        direction="column"
        alignItem="center"
        justifyContent="center"
        width="100%"
        height="100%"
        padding="16px"
      >
        <img style={{ width: 100 }} src="/logo.svg" />
        <Spacing size={10} />
        <Label style={{ textAlign: "center" }} font="head2">
          {"lovit\n내가 만드는 취향 사분면"}
        </Label>

        <Spacing size={24} />
        <Flex direction="column" alignItem="center" onClick={() => copyLink()}>
          <Label
            font="body2B"
            color="textLighter"
            style={{ textAlign: "center" }}
          >
            {`${appKey === "kakaotalk" ? "공유하기" : "점 3개"} 버튼을 누르고\n외부 브라우저에서 열어주세요`}
          </Label>
          <Spacing size={8} />
          <img src="/hint.png" width={"60%"} style={{ borderRadius: 12 }} />

          <Spacing size={16} />
          <Label font={"body3"} color="textDisable">
            혹은
          </Label>
          <Spacing size={16} />

          <Label
            font="body1B"
            color="textLighter"
            style={{
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
            }}
          >
            클립보드에 링크 복사하기
          </Label>
        </Flex>

        <Spacing size={32} />
        <Label font="body2B" color="textLightest">
          {appKey} 안에서 열려 있어요
        </Label>
        <Spacing size={4} />
        <Label
          font="body2"
          color="textLightest"
          style={{ textAlign: "center" }}
        >
          {`다른 어플 안에서는 일부 기능이 작동하지 않아요.\n외부 브라우저에서 다시 이용해주세요!`}
        </Label>
      </Flex>
    </FixedPageContainer>
  );
};

export default InAppPage;
