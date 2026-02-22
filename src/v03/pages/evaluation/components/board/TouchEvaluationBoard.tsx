import * as Title from "@componentsV03/title/Title.styled";

import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV03/board/context/context";

import EvaluationBoard from "@componentsV03/board/evaluationBoard/EvaluationBoard";

import useBoardControl from "@hooksV03/board/useBoardControl";

import useGetBoardPoint from "@hooksV03/board/useGetBoardPoint";
import Spacing from "@componentsV03/spacing/Spacing";
import { useEffect, useState } from "react";
import FullSpinner from "@componentsV03/spinner/Spinner";

const TouchEvaluationBoard = () => {
  const { vertical, horizontal, preference, itemList, boardInformation } =
    useBoardStaticContext();

  const { points } = useGetBoardPoint({
    vertical,
    horizontal,
    preference,
    itemList,
  });
  const { currentItem } = useBoardStepContext();
  const { navigateEvaluationTouchNext } = useBoardControl();

  const onClickBoardGrid = (v: number, h: number) => {
    navigateEvaluationTouchNext(v, h);
  };

  // ✅ 로딩 상태 네이밍
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);

  useEffect(() => {
    // 새 아이템이면 다시 로딩 시작
    setIsThumbnailLoading(true);

    const url = currentItem?.thumbnailURL;
    if (!url) {
      setIsThumbnailLoading(false);
      return;
    }

    const img = new Image();
    img.src = url;

    img.onload = () => setIsThumbnailLoading(false);
    img.onerror = () => setIsThumbnailLoading(false);
  }, [currentItem?.thumbnailURL]);

  return (
    <>
      {isThumbnailLoading && (
        <FullSpinner isBackground={true} label="다음 인물을 불러오고 있어요" />
      )}

      <Title.BoardTitleContainer style={{ flexGrow: 1 }}>
        <span className="category">{currentItem.category}</span>
        <span className="name">{currentItem.name}</span>

        <Title.BoardTitleImg $imgURL={currentItem.thumbnailURL} />
      </Title.BoardTitleContainer>
      <Title.BoardDescription>
        사분면 중 어디에 속하는지 선택해주세요.
      </Title.BoardDescription>
      <EvaluationBoard
        onClickGridItem={onClickBoardGrid}
        itemList={itemList}
        itemPointDict={points}
        boardInformation={boardInformation}
      />
      <Spacing size={20} />
    </>
  );
};

export default TouchEvaluationBoard;
