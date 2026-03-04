import { getItemGroupIDList } from "@dataV03/itemSummary";
import styled from "@emotion/styled";
import GroupCard from "./GroupCard";
import Flex from "@componentsV03/flex/Flex";
import GroupAllCard from "./GroupAllCard";

import { Separator } from "@componentsV03/layout/DefaultLayout";

type Parms = {
  boardID: number;
  groupID?: number;
  isResult?: boolean;
};

const GroupList = (parms: Parms) => {
  const {
    boardID,
    groupID: currentGroupID = undefined,
    isResult = false,
  } = parms;
  const groupList = getItemGroupIDList(boardID);

  const GroupItemList = () =>
    groupList.map((groupID, _) => {
      return (
        <GroupCard
          key={groupID}
          boardID={boardID}
          groupID={groupID}
          isResult={isResult}
          isCurrent={currentGroupID === groupID}
        />
      );
    });

  return (
    <Flex width="100%" direction="column">
      <GroupAllCard
        boardID={boardID}
        isResult={isResult}
        isCurrent={isResult && currentGroupID === undefined}
      />

      <Separator $size={2} $margin={isResult ? undefined : 20} />

      <Continaer>
        <GroupItemList />
      </Continaer>
    </Flex>
  );
};

export default GroupList;

const Continaer = styled.section`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  row-gap: 12px;
  column-gap: 8px;
`;
