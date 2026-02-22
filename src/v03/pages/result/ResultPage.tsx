import {
  PageContainer,
  PageViewPortScroll,
} from "@componentsV03/layout/DefaultLayout";
import Result from "./components/Result";
import Navigation from "@componentsV03/navigation/Navigation";
import BottomButton from "@componentsV03/button/BottomButton";

import { useAuth } from "@hooksV03/auth/useAuth";
import { useGetUserBoardData } from "@hooksV03/api/userBoardData";
import { useGetTotalBoardData } from "@hooksV03/api/userTotalData";
import FullSpinner from "@componentsV03/spinner/Spinner";
import MoreButton from "./components/more/MoreButton";
import { ResultProvider } from "./context/ResultProvider";
import { FACE_BOARD_INFO } from "@dataV03/boardInfoDummy";

const ResultPage = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  const { data: userBoardData, isFetching: isUserBoardFetching } =
    useGetUserBoardData(uid);
  const { data: totalBoardDataDict, isFetching: isTotalBoardFetching } =
    useGetTotalBoardData();

  if (isUserBoardFetching || isTotalBoardFetching) return <FullSpinner />;

  return (
    <ResultProvider
      userBoardData={userBoardData}
      totalBoardDataDict={totalBoardDataDict}
      boardInformation={FACE_BOARD_INFO}
    >
      <PageContainer>
        <Navigation />
        <PageViewPortScroll>
          <Result />
        </PageViewPortScroll>
        <BottomButton>
          <MoreButton isMore={userBoardData.isMore} />
        </BottomButton>
      </PageContainer>
    </ResultProvider>
  );
};

export default ResultPage;
