import Bottomsheet from "@componentsV02/bottomsheet/Bottomsheet";
import FullSpinner from "@componentsV02/spinner/Spinner";
import TestTool from "@componentsV02/test/TestTool";
import { useAuth } from "@hooksV02/auth/useAuth";
import { BottomSheetProvider } from "@hooksV02/bottomsheet/context/BottomsheetProvider";
import { Outlet } from "react-router-dom";

const ServiceRoute = () => {
  const { isLoading } = useAuth();

  // 스피너 넣기
  if (isLoading) return <FullSpinner />;

  return (
    <>
      <BottomSheetProvider>
        <TestTool />
        <Outlet />
        <Bottomsheet />
      </BottomSheetProvider>
    </>
  );
};

export default ServiceRoute;
