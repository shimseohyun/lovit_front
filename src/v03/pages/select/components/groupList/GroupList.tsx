import { getItemGroupIDList } from "@dataV03/itemSummary";
import styled from "@emotion/styled";
import GroupCard from "./GroupCard";
import Flex from "@componentsV03/flex/Flex";
import GroupAllCard from "./GroupAllCard";
import Spacing from "@componentsV03/spacing/Spacing";

type Parms = {
  boardID: number;
};

const GroupList = (parms: Parms) => {
  const { boardID } = parms;
  const groupList = getItemGroupIDList(boardID);

  const GroupItemList = () =>
    groupList.map((groupID, _) => {
      return <GroupCard key={groupID} boardID={boardID} groupID={groupID} />;
    });

  return (
    <Flex width="100%" direction="column">
      <GroupAllCard boardID={boardID} />
      <Spacing size={24} />
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
