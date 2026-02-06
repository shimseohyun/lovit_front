import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import router from "@routersV02/router";
import TestTool from "@componentsV02/test/TestTool";

const App = () => {
  const queryClient = new QueryClient();
  const maxWidth = "500px";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ThemeProvider theme={theme(maxWidth)}>
          <Global styles={global(maxWidth)} />
          <RouterProvider router={router} />
          <TestTool />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
