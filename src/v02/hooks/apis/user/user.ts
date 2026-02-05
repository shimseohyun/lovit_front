import { getUserBoardData } from "@apisV02/firebase/domain/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBoardData = () => {
  const userID = "1234";
  return useQuery({
    queryKey: ["BOARD", userID],
    queryFn: () => getUserBoardData(userID),
  });
};
