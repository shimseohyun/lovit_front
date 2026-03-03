import Flex from "@componentsV03/flex/Flex";
import * as S from "./BoardCard.styled";
import Label from "@componentsV03/label/Label";
import FillButton from "@componentsV03/button/FillButton";
import Spacing from "@componentsV03/spacing/Spacing";
import { useNavigate } from "react-router-dom";
import { getBoard } from "@dataV03/itemSummary";
import { SELECT } from "@routersV03/path";

type Parms = {
  boardID: number;
};
const BoardCard = (parms: Parms) => {
  const { boardID } = parms;
  const board = getBoard(boardID);
  const navigate = useNavigate();

  if (board === undefined) return;

  return (
    <S.Container>
      <img src={board.thumbnailURL} />
      <Flex padding="0px 12px" width="100%" direction="column">
        <Spacing size={10} />
        <Label font="body1B" children={board.title} />
        <Label font="body2" color="textLighter" children={board.description} />
      </Flex>
      <Spacing size={10} />
      <Flex padding="0px 12px" width="100%" direction="row" gap="8px">
        <FillButton
          onClick={() => navigate(SELECT(boardID))}
          buttonType="MAIN_ASSISTIVE"
          children="취향 찾으러 가기"
        />
        <FillButton
          onClick={() => navigate(`/result/${boardID}`)}
          style={{ width: 160 }}
          children="결과 보기"
        />
      </Flex>
      <Spacing size={12} />
    </S.Container>
  );
};
export default BoardCard;
