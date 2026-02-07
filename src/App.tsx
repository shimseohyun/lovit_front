import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import router from "@routersV02/router";

import { AuthProvider } from "@hooksV02/auth/context/AuthProvider";

const App = () => {
  const queryClient = new QueryClient();
  const maxWidth = "500px";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme(maxWidth)}>
            <Global styles={global(maxWidth)} />
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
