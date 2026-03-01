import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import { PageContainer } from "@componentsV03/layout/DefaultLayout";
import Spacing from "@componentsV03/spacing/Spacing";
import { getItemGroup, getItemGroupIDList } from "@dataV03/itemSummary";

type Parms = {
  boardID: number;
};
const SelectPageContainer = (parms: Parms) => {
  const { boardID } = parms;
  const groupList = getItemGroupIDList(boardID);
  console.log(groupList);
  return (
    <PageContainer>
      <Flex width="100%" direction="column" padding="10px 16px 0px 16px">
        <Label
          font="head1"
          color={"textStrongest"}
          children={`내 손으로 채우는\n나만의 취향 사분면`}
        />
        <Spacing size={4} />
        <Label
          font="body1"
          color="textLight"
          children={`나의 취향 대삼각형을 찾아서...`}
        />
      </Flex>
      {groupList.map((groupID, _) => {
        const group = getItemGroup(boardID, groupID);
        console.log(group);
        return <div>{group.name}</div>;
      })}
    </PageContainer>
  );
};

export default SelectPageContainer;
