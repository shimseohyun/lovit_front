import type { PropsWithChildren } from "react";

import * as S from "./EvaluationBoard.styled";

import BoardMarker from "./marker/BoardMarker";

import type { AxisType } from "@interfacesV03/type";
import type { ItemIDList, UserPointDict } from "@interfacesV03/data/user";
import type {
  BoardInformation,
  ItemSummaryDict,
} from "@interfacesV03/data/system";

import useViewport from "@hooksV03/useViewPort";
import { getItemSummary } from "@dataV03/itemSummary";

type Parms = {
  boardSize?: number;
  onClickGridItem?: (r: number, c: number) => void;
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;

  itemList: ItemIDList;
  itemPointDict: UserPointDict;
} & PropsWithChildren;

const EvaluationBoard = (parms: Parms) => {
  const {
    boardSize,
    onClickGridItem,
    boardInformation,
    itemSummaryDict,
    itemList,
    itemPointDict,
    children,
  } = parms;

  const { width } = useViewport();
  const CENTER_SIZE = 20;
  const BOARD_SIZE = boardSize === undefined ? width - 32 : boardSize;

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
                    <span> {icon}</span>
                    <span>{intesity}</span>
                    <span>{label}</span>
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
          if (!itemPointDict || !itemPointDict[itemID]) return;
          return (
            <BoardMarker
              key={i}
              left={itemPointDict[itemID].horizontalPos}
              top={itemPointDict[itemID].verticalPos}
              preferencePercent={
                itemPointDict[itemID].isLiked
                  ? 100
                  : itemPointDict[itemID].preferenceSize
              }
              isLiked={itemPointDict[itemID].isLiked}
              img={getItemSummary(itemID, itemSummaryDict).thumbnailURL}
            />
          );
        })}
      </S.BoardContainer>
    </>
  );
};

export default EvaluationBoard;
