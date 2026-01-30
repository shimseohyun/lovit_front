import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";
import EvaluationPage from "@pagesV02/evaluation/EvaluationPage";

const App = () => {
  const maxWidth = "500px";

  return (
    <>
      <ThemeProvider theme={theme(maxWidth)}>
        <Global styles={global(maxWidth)} />
        <EvaluationPage />
      </ThemeProvider>
    </>
  );
};

export default App;
