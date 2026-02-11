import {
  getTotalBoardData,
  postUserDataToTotalBoardData,
  type GetTotalBoardDataReturn,
  type PostUserDataParams,
} from "@apisV03/firebase/domain/total";
import { useMutation, useQuery } from "@tanstack/react-query";

const initialTotalData: GetTotalBoardDataReturn = {
  totalBoardData: {},
};

export const useGetTotalBoardData = () => {
  return useQuery<GetTotalBoardDataReturn>({
    queryKey: ["TOTAL_BOARD_DATA"],
    queryFn: async () => getTotalBoardData(),
    initialData: initialTotalData,
  });
};

export const usePostUserDataToTotalBoardData = () => {
  return useMutation({
    mutationKey: ["POST_TOTAL_BOARD_DATA"],
    mutationFn: async (body: PostUserDataParams) => {
      return postUserDataToTotalBoardData(body);
    },
  });
};
