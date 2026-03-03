import * as S from "./TotalResult.style";

import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";

import { useResultContext } from "@pagesV03/result/context/ResultProvider";

import { BoardPoint } from "./TotalResult.style";
import TotalResultCell from "./TotalResultCell";
import useTotalResultCell from "./useTotalResult";
import { getItemSummary } from "@dataV03/itemSummary";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useState } from "react";

type SortType = "user" | "avg";
const TotalResultList = () => {
  const [srot, setSort] = useState<SortType>("user");

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
        <Flex
          gap={"20px"}
          width="100%"
          direction="column"
          padding="20px 16px"
          style={{ position: "relative" }}
        >
          <Label font="head2" color="titleStrongest">
            다른 유저와 비교해요!
          </Label>

          <Flex gap="8px">
            <S.SortToggle
              $isSelected={srot === "user"}
              onClick={() => setSort("user")}
            >
              <BoardPoint $isUser={true} />
              <span>내 취향순</span>
            </S.SortToggle>

            <S.SortToggle
              $isSelected={srot === "avg"}
              onClick={() => setSort("avg")}
            >
              <BoardPoint $isUser={false} />
              <span>평균 취항순</span>
            </S.SortToggle>
          </Flex>

          {Object.entries(resultDict)
            .sort(([a], [b]) =>
              srot === "avg"
                ? resultDict[Number(b)].avg.PREFERENCE -
                  resultDict[Number(a)].avg.PREFERENCE
                : resultDict[Number(b)].user.PREFERENCE -
                  resultDict[Number(a)].user.PREFERENCE,
            )
            .map(([idx, cell]) => {
              if (!cell) return null;
              return <TotalResultCell key={idx} {...cell} />;
            })}
          <More />
        </Flex>
      </>
    )
  );
};

export default TotalResultList;
