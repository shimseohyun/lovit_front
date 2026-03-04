import Flex from "@componentsV03/flex/Flex";
import * as S from "./BoardCard.styled";
import Label from "@componentsV03/label/Label";
import FillButton from "@componentsV03/button/FillButton";
import Spacing from "@componentsV03/spacing/Spacing";
import { useNavigate } from "react-router-dom";
import { getBoard } from "@dataV03/itemSummary";
import { RESULT, SELECT } from "@routersV03/path";

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
      <Flex
        width="100%"
        direction="column"
        onClick={() => navigate(SELECT(boardID))}
      >
        <img src={board.thumbnailURL} />
        <Flex width="100%" direction="column">
          <Spacing size={10} />
          <Flex gap="2px" padding="0px 2px" width="100%" direction="column">
            <Label font="head3" children={board.title} />

            <Label
              font="body1"
              color="textLighter"
              children={board.description}
            />
          </Flex>
        </Flex>
        <Spacing size={10} />
      </Flex>

      <Flex width="100%" direction="row" gap="8px">
        <FillButton
          onClick={() => navigate(SELECT(boardID))}
          buttonType="MAIN_ASSISTIVE"
          children="취향 찾으러 가기"
        />
        <FillButton
          onClick={() => navigate(RESULT(boardID))}
          style={{ width: 160 }}
          children="결과 보기"
        />
      </Flex>
    </S.Container>
  );
};
export default BoardCard;
