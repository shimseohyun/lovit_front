import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { Section } from "@componentsV03/layout/DefaultLayout";
import { BoardPoint } from "./cell/ResultCell.styld";
import ResultCell from "./cell/ResultCell";
import useResultCell from "./cell/useResultCell";

import type {
  ItemIDList,
  UserAxisItemPositionDict,
} from "@interfacesV03/data/user";
import type { BoardInformation } from "@interfacesV03/data/system";
import type { BoardAxisType } from "@interfacesV03/type";
import type { GetTotalBoardDataReturn } from "@apisV03/firebase/domain/total";

type Parms = {
  itemList: ItemIDList;
  boardInfromation: BoardInformation;
  itemPositionDict: Record<BoardAxisType, UserAxisItemPositionDict>;
  data: GetTotalBoardDataReturn;
};
const ResultTotalList = (parms: Parms) => {
  const { itemList, boardInfromation, itemPositionDict, data } = parms;

  const { resultDict } = useResultCell({
    data,
    itemList,
    boardInfromation,
    itemPositionDict,
  });

  return (
    itemList.length > 0 && (
      <>
        <Section $gap={20}>
          <Flex justifyContent="space-between" alignItem="center" width="100%">
            <Label font="head2" color="titleStrongest">
              다른 유저와 비교해요!
            </Label>

            <Flex gap="12px">
              <Flex gap="2px" alignItem="center" justifyContent="center">
                <BoardPoint $isUser={false} />
                <Label font="body3" color="textLighter">
                  평균
                </Label>
              </Flex>

              <Flex gap="2px" alignItem="center" justifyContent="center">
                <BoardPoint $isUser={true} />
                <Label font="body3" color="textLighter">
                  내 평가
                </Label>
              </Flex>
            </Flex>
          </Flex>

          {Object.entries(resultDict)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([idx, cell]) => {
              if (!cell) return null;
              return <ResultCell key={idx} {...cell} />;
            })}
        </Section>
      </>
    )
  );
};

export default ResultTotalList;
