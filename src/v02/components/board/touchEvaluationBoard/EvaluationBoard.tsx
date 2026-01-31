import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";
import * as S from "./EvaluationBoard.styled";
import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import type { UserAxisGroupDict } from "@interfacesV02/data/user";
import { getSlotCount } from "@utilsV02/createAxisSlot";
import { useBoardStepContext } from "@hooksV02/data/context/context";

const EvaluationBoard = () => {
  const { itemList, boardSize, vertical, horizontal } = useBoardDataContext();
  const { navigateEvaluationSwipe } = useBoardStepContext();

  const { verticalPoints, horizontalPoints } = useGetBoardPoint();

  const CENTER_SIZE = 20;
  const BOARD_SIZE = boardSize - 32;

  const getSlotIDX = (groupID: number, gorupDict: UserAxisGroupDict) => {
    let slotIDX = 0;
    for (let i = 0; i < groupID; i++) {
      slotIDX += getSlotCount(gorupDict[i].bundleList.length);
    }

    slotIDX += Math.floor(
      getSlotCount(gorupDict[groupID].bundleList.length) / 2,
    );

    return slotIDX;
  };

  const getPercentWithCenter = (originalPercent: number) => {
    const clampedPercent = Math.max(0, Math.min(100, originalPercent)); // 0~100
    const originalRatio = clampedPercent / 100; // 0~1

    const centerGapPx = Math.max(0, Math.min(CENTER_SIZE, BOARD_SIZE - 1e-6));
    const shrinkRatio = (BOARD_SIZE - centerGapPx) / BOARD_SIZE;

    if (originalRatio < 0.5) {
      return originalRatio * shrinkRatio * 100;
    } else {
      const centerGapHalfRatio = centerGapPx / (2 * BOARD_SIZE);
      return (
        (0.5 + centerGapHalfRatio + (originalRatio - 0.5) * shrinkRatio) * 100
      );
    }
  };

  const onClickBoardGrid = (v: number, h: number) => {
    const vSlotIDX = getSlotIDX(v, vertical.groupDict);
    const hSlotIDX = getSlotIDX(h, horizontal.groupDict);

    navigateEvaluationSwipe({ VERTICAL: vSlotIDX, HORIZONTAL: hSlotIDX });
  };

  return (
    <>
      <S.BoardContainer $size={400}>
        <S.BoardGrid $cols={6} $rows={6} $holePx={20}>
          {[0, 1, 2, -1, 3, 4, 5].map((r) =>
            [0, 1, 2, -1, 3, 4, 5].map((c) => {
              if (r === -1 || c === -1)
                return <div key={`${r}-${c}}`}>{/* {r}, {c} */}</div>;
              return (
                <S.GridItem
                  key={`${r}-${c}}`}
                  onClick={() => onClickBoardGrid(r, c)}
                />
              );
            }),
          )}
        </S.BoardGrid>

        {itemList.map((item, i) => {
          return (
            <S.Marker
              key={i}
              $left={getPercentWithCenter(horizontalPoints[item].percentage)}
              $top={getPercentWithCenter(verticalPoints[item].percentage)}
            >
              {item}
            </S.Marker>
          );
        })}
      </S.BoardContainer>
    </>
  );
};

export default EvaluationBoard;
