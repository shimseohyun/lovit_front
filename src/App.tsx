import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";
import EvaluationPage from "@pagesV02/evaluation/EvaluationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  const maxWidth = "500px";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme(maxWidth)}>
          <Global styles={global(maxWidth)} />
          <EvaluationPage />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
