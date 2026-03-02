import Flex from "@componentsV03/flex/Flex";
import Label from "@componentsV03/label/Label";
import {
  PageContainer,
  PageViewPortScroll,
  Section,
} from "@componentsV03/layout/DefaultLayout";
import Navigation from "@componentsV03/navigation/Navigation";
import Spacing from "@componentsV03/spacing/Spacing";
import GroupList from "./groupList/GroupList";

type Parms = {
  boardID: number;
};
const SelectPageContainer = (parms: Parms) => {
  const { boardID } = parms;

  const Title = () => (
    <Flex width="100%" direction="column" padding="10px 16px 0px 16px">
      <Label
        font="head1"
        color={"textStrongest"}
        children={`관심있는 분야를 골라주세요!`}
      />
      <Spacing size={4} />
      <Label
        font="body1"
        color="textLight"
        children={`해당 그룹군으로 분류를 시작합니다.`}
      />
    </Flex>
  );

  return (
    <PageContainer>
      <Navigation />

      <PageViewPortScroll>
        <Title />
        <Section>
          <GroupList boardID={boardID} />
        </Section>
      </PageViewPortScroll>
    </PageContainer>
  );
};

export default SelectPageContainer;
