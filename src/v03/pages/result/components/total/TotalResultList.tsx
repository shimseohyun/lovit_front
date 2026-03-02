// import * as S from "./TotalResult.style";
import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { Section } from "@componentsV03/layout/DefaultLayout";

import { useResultContext } from "@pagesV03/result/context/ResultProvider";

import { BoardPoint } from "./TotalResult.style";
import TotalResultCell from "./TotalResultCell";
import useTotalResultCell from "./useTotalResult";
import { getItemSummary } from "@dataV03/itemSummary";
import { useAuth } from "@hooksV03/auth/useAuth";

const TotalResultList = () => {
  const { isLoggedIn } = useAuth();
  const {
    boardID,
    itemList,
    boardInformation,
    itemPositionDict,
    totalBoardDataDict,
    isMore,
  } = useResultContext();

  const { resultDict } = useTotalResultCell({
    boardID,
    data: totalBoardDataDict,
    itemList,
    boardInformation,
    itemPositionDict,
  });

  const More = () => {
    if (!itemList || itemList.length === 0) return;

    const moreItem = getItemSummary(boardID, itemList[itemList.length - 1] + 1);

    if (moreItem === undefined || moreItem === null) return;
    if (isMore || !isLoggedIn) {
      return <></>;
      // return (
      //   <>
      //     <S.ResultGradient>
      //       <Label font="body2" color="textLightest">
      //         아직 분류할 수 있는 인물이 남았어요!
      //       </Label>
      //     </S.ResultGradient>
      //     <TotalResultCell
      //       key={0}
      //       itemResult={"???"}
      //       itemName={moreItem.name}
      //       itemImg={moreItem.thumbnailURL}
      //       avgCount={0}
      //       avg={{ HORIZONTAL: 50, VERTICAL: 50, PREFERENCE: 100 }}
      //       user={{ HORIZONTAL: 100, VERTICAL: 100, PREFERENCE: 100 }}
      //     />
      //   </>
      // );
    }
  };

  return (
    itemList.length > 0 && (
      <>
        <Section $gap={20} style={{ position: "relative" }}>
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

          {/* TODO: - 토글 기능 */}
          {Object.entries(resultDict)
            .sort(([a], [b]) => Number(a) - Number(b))
            // .sort(
            //   ([a], [b]) =>
            //     resultDict[Number(b)].user.PREFERENCE -
            //     resultDict[Number(a)].user.PREFERENCE,
            // )
            // .sort(
            //   ([a], [b]) =>
            //     resultDict[Number(b)].avg.PREFERENCE -
            //     resultDict[Number(a)].avg.PREFERENCE,
            // )
            .map(([idx, cell]) => {
              if (!cell) return null;
              return <TotalResultCell key={idx} {...cell} />;
            })}
          <More />
        </Section>
      </>
    )
  );
};

export default TotalResultList;
