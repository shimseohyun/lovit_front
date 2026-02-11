import type { PropsWithChildren } from "react";

import * as S from "./EvaluationBoard.styled";

import BoardMarker from "./marker/BoardMarker";

import type { AxisType } from "@interfacesV02/type";
import type { ItemIDList, UserPointDict } from "@interfacesV02/data/user";
import type { BoardInformation } from "@interfacesV02/data/system";

import { getItemSummary } from "@dataV02/itemSummary";

import useViewport from "@hooksV02/useViewPort";

type Parms = {
  onClickGridItem?: (r: number, c: number) => void;
  boardInformation: BoardInformation;

  itemList: ItemIDList;
  itemPointDict: UserPointDict;
} & PropsWithChildren;

const EvaluationBoard = (parms: Parms) => {
  const {
    onClickGridItem,
    boardInformation,

    itemList,
    itemPointDict,
    children,
  } = parms;

  const { width } = useViewport();
  const CENTER_SIZE = 20;
  const BOARD_SIZE = width - 32;

  return (
    <>
      <S.BoardContainer $size={BOARD_SIZE}>
        <S.BoardGrid $cols={6} $rows={6} $holePx={CENTER_SIZE}>
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
        {children}
        {itemList.map((itemID, i) => {
          return (
            <BoardMarker
              key={i}
              left={itemPointDict[itemID].horizontaPos}
              top={itemPointDict[itemID].verticalPos}
              preferencePercent={
                itemPointDict[itemID].isLiked
                  ? 100
                  : itemPointDict[itemID].preferenceSize
              }
              isLiked={itemPointDict[itemID].isLiked}
              img={getItemSummary(itemID).thumbnailURL}
            />
          );
        })}
      </S.BoardContainer>
    </>
  );
};

export default EvaluationBoard;
