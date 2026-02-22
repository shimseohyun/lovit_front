import Bottomsheet from "@componentsV03/bottomsheet/Bottomsheet";
import FullSpinner from "@componentsV03/spinner/Spinner";
import { useAuth } from "@hooksV03/auth/useAuth";
import { BottomSheetProvider } from "@hooksV03/bottomsheet/context/BottomsheetProvider";
import { Outlet } from "react-router-dom";

const ServiceRoute = () => {
  const { isLoading } = useAuth();

  // 스피너 넣기
  if (isLoading) return <FullSpinner />;

  return (
    <>
      <BottomSheetProvider>
        {/* <TestTool /> */}
        <Outlet />
        <Bottomsheet />
      </BottomSheetProvider>
    </>
  );
};

export default ServiceRoute;
