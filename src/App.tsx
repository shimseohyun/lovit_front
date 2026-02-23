import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import router from "@routersV03/router";
import { AuthProvider } from "@hooksV03/auth/context/AuthProvider";
import useInAppBrowser from "@hooksV03/useInAppBrowser";
import InAppPage from "@pagesV03/InApp/InAppPage";

const App = () => {
  const queryClient = new QueryClient();
  const maxWidth = "500px";

  const inAppBrowser = useInAppBrowser();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme(maxWidth)}>
            <Global styles={global(maxWidth)} />
            {inAppBrowser.isInApp ? (
              <InAppPage appKey={inAppBrowser.appKey} />
            ) : (
              <RouterProvider router={router} />
            )}
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
