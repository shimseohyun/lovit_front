import {
  PageContainer,
  PageViewPortScroll,
} from "@componentsV03/layout/DefaultLayout";
import Result from "./components/Result";
import Navigation from "@componentsV03/navigation/Navigation";
import BottomButton from "@componentsV03/button/BottomButton";
import MoreButton from "./components/MoreButton";
import { useAuth } from "@hooksV03/auth/useAuth";
import { useGetUserBoardData } from "@hooksV03/api/userBoardData";
import { useGetTotalBoardData } from "@hooksV03/api/userTotalData";
import FullSpinner from "@componentsV03/spinner/Spinner";

const ResultPage = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  const { data: userBoardData, isFetching: isUserBoardFetching } =
    useGetUserBoardData(uid);
  const { data: totalBoardDataDict, isFetching: isTotalBoardFetching } =
    useGetTotalBoardData();

  if (isUserBoardFetching || isTotalBoardFetching) return <FullSpinner />;

  return (
    <>
      <PageContainer>
        <Navigation />
        <PageViewPortScroll>
          <Result
            userBoardData={userBoardData}
            totalBoardDataDict={totalBoardDataDict}
          />
        </PageViewPortScroll>
        <BottomButton>
          <MoreButton isMore={userBoardData.isMore} />
        </BottomButton>
      </PageContainer>
    </>
  );
};

export default ResultPage;
