import { postGoogleLogin, postLogout } from "@apisV02/firebase/domain/auth";
import { useMutation } from "@tanstack/react-query";

export const usePostLogin = () => {
  return useMutation({
    mutationKey: ["POST_LOGIN"],
    mutationFn: postGoogleLogin,
    onSuccess: () => {
      location.reload();
    },
  });
};

export const usePostLogout = () => {
  return useMutation({
    mutationKey: ["POST_LOGOUT"],
    mutationFn: postLogout,
    onSuccess: () => {
      location.reload();
    },
  });
};
