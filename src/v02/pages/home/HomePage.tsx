import { useAuth } from "@hooksV02/auth/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <div>{user?.name}홈</div>
    </>
  );
};

export default HomePage;
