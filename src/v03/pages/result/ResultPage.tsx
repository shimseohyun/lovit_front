import {
  PageContainer,
  PageViewPortScroll,
} from "@componentsV03/layout/DefaultLayout";
import Result from "./components/Result";
import Navigation from "@componentsV03/navigation/Navigation";

const ResultPage = () => {
  return (
    <>
      <PageContainer>
        <Navigation />
        <PageViewPortScroll>
          <Result />
        </PageViewPortScroll>
      </PageContainer>
    </>
  );
};

export default ResultPage;
