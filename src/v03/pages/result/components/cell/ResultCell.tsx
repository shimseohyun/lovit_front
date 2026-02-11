import type { BoardAxisType } from "@interfacesV03/type";
import * as S from "./ResultCell.styld";

export type ResultCellParms = {
  itemResult: string;
  itemName: string;
  itemImg: string;
  avg: Record<BoardAxisType, number>;
  user: Record<BoardAxisType, number>;
};

const ResultCell = (parms: ResultCellParms) => {
  const { itemImg, itemName, itemResult, avg, user } = parms;
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

      <S.Contents>
        <span className="name">{itemName}</span>
        <span className="evaluation">{itemResult}</span>

        <S.Preference>
          <div className="preferenceTitle ">호감도</div>
          <S.PreferenceBar>
            <S.PreferenceBarValue $value={avg.PREFERENCE} />

            <S.PreferenceBarPoint $value={avg.PREFERENCE} $isAvg={true} />
            <S.PreferenceBarPoint $value={user.PREFERENCE} $isAvg={false} />
          </S.PreferenceBar>
        </S.Preference>
      </S.Contents>
    </S.Container>
  );
};

export default ResultCell;
