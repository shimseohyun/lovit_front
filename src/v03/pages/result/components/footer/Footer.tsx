import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.section`
  width: 100%;
  padding: 40px 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;

  ${(p) => css`
    background-color: ${p.theme.foregroundColors.foregroundLighter};
  `}
`;

const Button = styled.div`
  cursor: pointer;

  display: flex;
  padding: 4px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 20px;

  > span {
    padding: 0px 2px;
  }

  ${(p) => css`
    ${p.theme.fonts.element2}
    background-color: ${p.theme.foregroundColors.foregroundStrongest};
    color: ${p.theme.fontColors.textInverseLight};
  `}
`;

const Footer = () => {
  return (
    <Container>
      <Flex
        justifyContent="center"
        alignItem="center"
        direction="column"
        gap="4px"
      >
        <Label font="body2B" color="textLight">
          인물을 추가하고 싶으신가요?
        </Label>
        <Label font="body2" color="textLighter" style={{ textAlign: "center" }}>
          {
            "추천 인물 혹은 개선 사항을 제보해주세요!\n검토 후 적극 반영됩니다 🫶"
          }
        </Label>
      </Flex>
      <Button
        onClick={() => {
          window.open(
            "https://spin-spin.com/user23028",
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        <span>제보하기</span>
      </Button>
      <Label
        font="body3"
        color="textLightest"
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "4px",
        }}
        onClick={() => {
          window.open(
            "https://x.com/findmylovit",
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        X (구 트위터) @findmylovit
      </Label>
    </Container>
  );
};

export default Footer;
