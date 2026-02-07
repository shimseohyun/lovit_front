import { PageContainer } from "@componentsV02/layout/DefaultLayout";
import Result from "./components/Result";
import Navigation from "@componentsV02/navigation/Navigation";

const ResultPage = () => {
  return (
    <>
      <PageContainer>
        <Navigation />
        <Result />
      </PageContainer>
    </>
  );
};

export default ResultPage;
