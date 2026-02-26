import type { BoardAxisType } from "@interfacesV03/type";
import * as S from "./TotalResult.style";
import Label from "@componentsV03/label/Label";
import Flex from "@componentsV03/flex/Flex";

export type TotalResultCellParms = {
  itemResult: string;
  itemName: string;
  itemImg: string;
  avgCount: number;
  avg: Record<BoardAxisType, number>;
  user: Record<BoardAxisType, number>;
};

const TotalResultCell = (parms: TotalResultCellParms) => {
  const { itemImg, itemName, itemResult, avg, user, avgCount } = parms;

  return (
    <S.Container>
      <S.Board>
        <S.BoardAxis $axis="VERTICAL" />
        <S.BoardAxis $axis="HORIZONTAL" />
        <S.BoardPointAvg
          $x={avg.HORIZONTAL}
          $y={avg.VERTICAL}
          $imgURL={itemImg}
        />
        <S.BoardPointUser $x={user.HORIZONTAL} $y={user.VERTICAL} />
      </S.Board>

      <Flex flexGrow={1} direction="column" style={{ paddingTop: "4px" }}>
        <Label font="head3" color="titleStrongest">
          {itemName}
        </Label>
        <Label font="body1" color="textLighter">
          {itemResult}
        </Label>

        <Flex flexGrow={1} direction="column" justifyContent="flex-end">
          <Flex width="100%" justifyContent="space-between">
            <Label
              font="body3"
              color="textLightest"
              style={{ marginBottom: "8px" }}
              className="preferenceTitle "
            >
              취향
            </Label>
            <Label font="body3B" color="textLighter">
              {avgCount}명 참여
            </Label>
          </Flex>

          <S.PreferenceBar>
            <S.PreferenceBarValue $value={avg.PREFERENCE} />

            <S.PreferenceBarPoint $value={avg.PREFERENCE} $isAvg={true} />
            <S.PreferenceBarPoint $value={user.PREFERENCE} $isAvg={false} />
          </S.PreferenceBar>
        </Flex>
      </Flex>
    </S.Container>
  );
};

export default TotalResultCell;
