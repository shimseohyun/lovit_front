import {
  PageContainer,
  PageViewPortScroll,
} from "@componentsV03/layout/DefaultLayout";
import { Separator } from "@componentsV03/layout/DefaultLayout";

import Spacing from "@componentsV03/spacing/Spacing";

import Share from "./share/Share";

import TotalResultList from "./total/TotalResultList";

import BottomButton from "@componentsV03/button/BottomButton";
import MoreButton from "./more/MoreButton";
import Navigation from "@componentsV03/navigation/Navigation";
import { useResultContext } from "../context/ResultProvider";
import FullSpinner from "@componentsV03/spinner/Spinner";
import ResultBoard from "./board/ResultBoard";

const ResultPageContent = () => {
  const { isFetching } = useResultContext();

  if (isFetching) return <FullSpinner label="결과를 불러오고 있어요!" />;
  return (
    <>
      <PageContainer>
        <Navigation />
        <PageViewPortScroll>
          <ResultBoard />
          <Share />
          <Separator $size={8} />
          <TotalResultList />
          <Spacing size={40} />
        </PageViewPortScroll>
        <BottomButton>
          <MoreButton />
        </BottomButton>
      </PageContainer>
    </>
  );
};

export default ResultPageContent;
