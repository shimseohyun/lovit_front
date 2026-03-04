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
import { useAuth } from "@hooksV03/auth/useAuth";

type Parms = {
  boardID: number;
};
const SelectPageContainer = (parms: Parms) => {
  const { boardID } = parms;
  const { isLoggedIn } = useAuth();

  const subLabel = isLoggedIn
    ? `러빗이 고른 50명의 인물이 나와요!\n이 중 하나는 취향이겠지 ♪`
    : `러빗이 고른 50명의 인물이 나와요!\n로그인 전에는 10명까지 분류 가능해요.`;

  const Title = () => (
    <Flex width="100%" direction="column" padding="10px 16px 0px 16px">
      <Label
        font="head1"
        color={"textStrongest"}
        children={`빠르게 취향 찾아보기`}
      />
      <Spacing size={4} />
      <Label font="body1" color="textLighter" children={subLabel} />
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
