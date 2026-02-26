import type {
  ItemIDList,
  UserAxisItemPositionDict,
} from "@interfacesV03/data/user";
import type { BoardAxisType, ResultType } from "@interfacesV03/type";
import type { TotalResultCellParms } from "./TotalResultCell";
import { getItemSummary } from "@dataV03/itemSummary";
import type {
  BoardInformation,
  BoardResultDict,
  ItemSummaryDict,
} from "@interfacesV03/data/system";
import type { GetTotalBoardDataReturn } from "@apisV03/firebase/domain/total";

const clamp0to100 = (n: number) => {
  if (n < 50) return Math.max(0, n * 0.8);
  else if (n > 50) return Math.min(90, n * 1.2);
  else return n;
};
type Parms = {
  itemList: ItemIDList;
  boardInformation: BoardInformation;
  itemSummaryDict: ItemSummaryDict;
  itemPositionDict: Record<BoardAxisType, UserAxisItemPositionDict>;
  data: GetTotalBoardDataReturn;
};

const getPercent = (avg: number, groupCount: number): number => {
  return (avg / groupCount + 1 / groupCount / 2) * 100;
};

const getAvg = (data: number[]): number => {
  let total = 0;
  data.forEach((data) => (total += data));

  if (data.length === 0) return total;
  return total / data.length;
};

const getAvgResultType = (num: number): ResultType => {
  if (num < 100 / 3) return "START";
  else if (num < (100 / 3) * 2) return "MIDDLE";
  else return "END";
};

const getAvgResult = (v: number, h: number, dict: BoardResultDict): string => {
  return dict[getAvgResultType(v)][getAvgResultType(h)][0].label;
};

const useTotalResultCell = (parms: Parms) => {
  const {
    itemList,
    boardInformation,
    itemSummaryDict,
    itemPositionDict,
    data: originData,
  } = parms;
  const data = originData.totalBoardData;
  const resultDict: Record<number, TotalResultCellParms> = {};

  itemList.forEach((itemID) => {
    const result = data[itemID];
    if (result === undefined) return;

    const item = getItemSummary(itemID, itemSummaryDict);

    const horizontalAvgResult = clamp0to100(
      getPercent(getAvg(result.HORIZONTAL), 6) * 1.1,
    );
    const verticalAvgResult = clamp0to100(
      getPercent(getAvg(result.VERTICAL), 6) * 1.1,
    );

    resultDict[itemID] = {
      itemImg: item.thumbnailURL,
      itemName: item.name,
      itemResult: getAvgResult(
        verticalAvgResult,
        horizontalAvgResult,
        boardInformation.avgResultDict,
      ),
      avgCount: result.PREFERENCE.length,
      avg: {
        HORIZONTAL: horizontalAvgResult,
        VERTICAL: verticalAvgResult,
        PREFERENCE: clamp0to100(
          getPercent(getAvg(result.PREFERENCE), 11) * 1.2,
        ),
      },
      user: {
        HORIZONTAL: getPercent(
          itemPositionDict.HORIZONTAL[itemID].userAxisGroupID,
          6,
        ),
        VERTICAL: getPercent(
          itemPositionDict.VERTICAL[itemID].userAxisGroupID,
          6,
        ),

        PREFERENCE: getPercent(
          itemPositionDict.PREFERENCE[itemID].userAxisGroupID,
          11,
        ),
      },
    };
  });

  return { resultDict };
};

export default useTotalResultCell;
