import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { Section } from "@componentsV03/layout/DefaultLayout";

import { useResultContext } from "@pagesV03/result/context/ResultProvider";

import { BoardPoint } from "./TotalResult.style";
import TotalResultCell from "./TotalResultCell";
import useTotalResultCell from "./useTotalResult";

const TotalResultList = () => {
  const { itemList, boardInformation, itemPositionDict, totalBoardDataDict } =
    useResultContext();

  const { resultDict } = useTotalResultCell({
    data: totalBoardDataDict,
    itemList,
    boardInformation,
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
              return <TotalResultCell key={idx} {...cell} />;
            })}
        </Section>
      </>
    )
  );
};

export default TotalResultList;
