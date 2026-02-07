import TestTool from "@componentsV02/test/TestTool";
import { useAuth } from "@hooksV02/auth/useAuth";
import { Outlet } from "react-router-dom";

const ServiceRoute = () => {
  const { isLoading } = useAuth();

  // 스피너 넣기
  if (isLoading) return <div>유저 정보를 로딩 중이에요.</div>;

  return (
    <>
      <TestTool />
      <Outlet />
    </>
  );
};

export default ServiceRoute;
