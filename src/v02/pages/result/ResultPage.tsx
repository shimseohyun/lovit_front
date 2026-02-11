import {
  PageContainer,
  PageViewPortScroll,
} from "@componentsV02/layout/DefaultLayout";
import Result from "./components/Result";
import Navigation from "@componentsV02/navigation/Navigation";

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
