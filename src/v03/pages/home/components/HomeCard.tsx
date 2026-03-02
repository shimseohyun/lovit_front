import Flex from "@componentsV03/flex/Flex";
import * as S from "./HomeCard.styled";
import Label from "@componentsV03/label/Label";
import FillButton from "@componentsV03/button/FillButton";
import Spacing from "@componentsV03/spacing/Spacing";
import { useNavigate } from "react-router-dom";
const HomeCard = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <img src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/8927/live/5e0ddc10-4bf6-11f0-8c47-237c2e4015f5.png.webp" />
      <Flex padding="0px 12px" width="100%" direction="column">
        <Spacing size={10} />
        <Label font="body1B">남자 연예인에서 취향찾기</Label>
        <Label font="body2" color="textLighter">
          이중에 하나쯤은 있겠지 ~ ⁺˚⋆୭🌸⋆⁺
        </Label>
      </Flex>
      <Spacing size={10} />
      <Flex padding="0px 12px" width="100%" direction="row" gap="8px">
        <FillButton
          onClick={() => navigate("/select/0")}
          buttonType="MAIN_ASSISTIVE"
          children="취향 찾으러 가기"
        />
        <FillButton
          onClick={() => navigate("/result/0")}
          style={{ width: 160 }}
          children="결과 보기"
        />
      </Flex>
      <Spacing size={12} />
    </S.Container>
  );
};
export default HomeCard;
