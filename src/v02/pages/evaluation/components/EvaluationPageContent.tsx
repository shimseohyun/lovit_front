import EvaluationButton from "./board/EvaluationButton";
import {
  useBoardStaticContext,
  useBoardStepContext,
} from "@hooksV02/board/context/context";
import Board from "./board/Board";

import { useAuth } from "@hooksV02/auth/useAuth";
import EvaluationNavigation from "./navigation/EvaluationNavigation";

import {
  PageContainer,
  PageViewPort,
} from "@componentsV02/layout/DefaultLayout";
import FullSpinner from "@componentsV02/spinner/Spinner";

const EvaluationPageContent = () => {
  const { isLoading: isAuthLoading } = useAuth();
  const { isFetching: isDataLoading } = useBoardStaticContext();
  const { isFetching: isItemListLoading } = useBoardStepContext();

  const isLoading = !(!isAuthLoading && !isDataLoading && !isItemListLoading);
  if (isLoading) return <FullSpinner />;

  return (
    <>
      <PageContainer>
        <EvaluationNavigation />
        <PageViewPort>
          <Board />
        </PageViewPort>

        <EvaluationButton />
      </PageContainer>
    </>
  );
};

export default EvaluationPageContent;
