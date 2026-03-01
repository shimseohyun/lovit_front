import {
  PageContainer,
  PageViewPortScroll,
  Section,
} from "@componentsV03/layout/DefaultLayout";
import Navigation from "@componentsV03/navigation/Navigation";

import Label from "@componentsV03/label/Label";
import Spacing from "@componentsV03/spacing/Spacing";
import Flex from "@componentsV03/flex/Flex";
import HomeCard from "./components/HomeCard";

const HomePage = () => {
  return (
    <>
      <PageContainer>
        <Navigation />

        <PageViewPortScroll>
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
          <Section>
            <HomeCard />
          </Section>
        </PageViewPortScroll>
      </PageContainer>
    </>
  );
};

export default HomePage;
