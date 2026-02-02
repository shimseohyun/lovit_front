import type { PropsWithChildren } from "react";

import * as S from "./EvaluationBoard.styled";

import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";

import { useBoardStaticContext } from "@hooksV02/board/context/context";
import BoardMarker from "./marker/BoardMarker";

import type { DirectionType } from "@interfacesV02/type";
import { getItemSummary } from "@dataV02/itemSummary";

type Parms = {
  type?: "RESULT" | "BOARD";
  onClickGridItem?: (r: number, c: number) => void;
} & PropsWithChildren;

const EvaluationBoard = (parms: Parms) => {
  const { children, onClickGridItem, type = "BOARD" } = parms;

  const { itemList, boardSize, boardInformation } = useBoardStaticContext();

  const { verticalPoints, horizontalPoints, preferncePoints } =
    useGetBoardPoint();

  const CENTER_SIZE = 20;
  const BOARD_SIZE = boardSize - 32;

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

  return (
    <>
      <S.BoardContainer $size={boardSize - 24}>
        <S.BoardGrid $cols={6} $rows={6} $holePx={20}>
          {[2, 1, 0, -1, 0, 1, 2].map((r, rIDX) => {
            const rowPart: DirectionType = rIDX > 3 ? "END" : "START";
            const rowInfo = boardInformation.evaluationAxisDict["VERTICAL"];

            return [2, 1, 0, -1, 0, 1, 2].map((c, cIDX) => {
              const colPart: DirectionType = cIDX > 3 ? "END" : "START";
              const colInfo = boardInformation.evaluationAxisDict["HORIZONTAL"];

              if (r === -1 && c === -1) {
                return <S.Ceter className="center" key={`${rIDX}-${cIDX}`} />;
              } else if (r == -1 || c == -1) {
                const axis = r === -1 ? "HORIZONTAL" : "VERTICAL";
                const label =
                  axis === "VERTICAL"
                    ? rowInfo.partDict[rowPart].label
                    : colInfo.partDict[colPart].label;

                const icon =
                  axis === "VERTICAL"
                    ? rowInfo.partDict[rowPart].icon
                    : colInfo.partDict[colPart].icon;

                const intesity =
                  axis === "HORIZONTAL"
                    ? rowInfo.intensityLabelList[c]
                    : colInfo.intensityLabelList[r];

                return (
                  <S.Label $axis={axis} key={`${rIDX}-${cIDX}`}>
                    {icon} {intesity} {label}
                  </S.Label>
                );
              } else {
                return (
                  <S.GridItem
                    key={`${rIDX}-${cIDX}`}
                    $isAble={onClickGridItem !== undefined}
                    onClick={() =>
                      onClickGridItem === undefined
                        ? {}
                        : onClickGridItem(
                            rIDX > 3 ? rIDX - 1 : rIDX,
                            cIDX > 3 ? cIDX - 1 : cIDX,
                          )
                    }
                  />
                );
              }
            });
          })}
        </S.BoardGrid>

        {itemList.map((itemID, i) => {
          return (
            <BoardMarker
              key={i}
              left={getPercentWithCenter(horizontalPoints[itemID].percentage)}
              top={getPercentWithCenter(verticalPoints[itemID].percentage)}
              preferencePercent={
                type === "RESULT" ? preferncePoints[i].percentage : undefined
              }
              img={getItemSummary(itemID).thumbnailURL}
            />
          );
        })}

        {children}
      </S.BoardContainer>
    </>
  );
};

export default EvaluationBoard;
