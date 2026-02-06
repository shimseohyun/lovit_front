import type { PropsWithChildren } from "react";

import * as S from "./EvaluationBoard.styled";

import useGetBoardPoint from "@hooksV02/board/useGetBoardPoint";

import BoardMarker from "./marker/BoardMarker";

import { getItemSummary } from "@dataV02/itemSummary";
import type { AxisData, AxisType } from "@interfacesV02/type";
import type { ItemIDList } from "@interfacesV02/data/user";
import type { BoardInformation } from "@interfacesV02/data/system";

type Parms = {
  vertical: AxisData;
  horizontal: AxisData;
  preference: AxisData;
  itemList: ItemIDList;
  boardInformation: BoardInformation;

  type?: "RESULT" | "BOARD";
  onClickGridItem?: (r: number, c: number) => void;
} & PropsWithChildren;

const EvaluationBoard = (parms: Parms) => {
  const {
    vertical,
    horizontal,
    preference,
    itemList,
    boardInformation,
    children,
    onClickGridItem,
    type = "BOARD",
  } = parms;

  const { verticalPoints, horizontalPoints, preferncePoints } =
    useGetBoardPoint({ vertical, horizontal, preference, itemList });

  const CENTER_SIZE = 20;
  const BOARD_SIZE = 400 - 32;

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
      <S.BoardContainer $size={BOARD_SIZE}>
        <S.BoardGrid $cols={6} $rows={6} $holePx={20}>
          {[0, 1, 2, -1, 3, 4, 5].map((r, rIDX) => {
            const rowInfo = boardInformation.axisDict["VERTICAL"];

            return [0, 1, 2, -1, 3, 4, 5].map((c, cIDX) => {
              const colInfo = boardInformation.axisDict["HORIZONTAL"];

              if (r === -1 && c === -1) {
                return <S.Ceter className="center" key={`${rIDX}-${cIDX}`} />;
              } else if (r == -1 || c == -1) {
                const axis: AxisType = r === -1 ? "HORIZONTAL" : "VERTICAL";

                const info =
                  axis === "HORIZONTAL"
                    ? colInfo.groupSummary[c]
                    : rowInfo.groupSummary[r];

                const label = info.groupLabel;
                const icon = info.groupIcon;
                const intesity = info.intensityLabel;

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
                      onClickGridItem === undefined ? {} : onClickGridItem(r, c)
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
