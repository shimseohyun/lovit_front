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

import { useResultContext } from "../context/ResultProvider";
import FullSpinner from "@componentsV03/spinner/Spinner";
import ResultBoard from "./board/ResultBoard";
import Footer from "./footer/Footer";
import ResultNavigation from "./navigation/ResultNavigation";

const ResultPageContent = () => {
  const { isFetching, itemList } = useResultContext();
  const isEmpty = itemList.length === 0;

  if (isFetching) return <FullSpinner label="결과를 불러오고 있어요!" />;
  return (
    <>
      <PageContainer>
        <ResultNavigation />
        <PageViewPortScroll>
          <ResultBoard />
          {!isEmpty && (
            <>
              <Share />
              <Separator $size={8} />
              <TotalResultList />
              <Spacing size={20} />
              <Footer />
            </>
          )}
        </PageViewPortScroll>
        <BottomButton>
          <MoreButton />
        </BottomButton>
      </PageContainer>
    </>
  );
};

export default ResultPageContent;
