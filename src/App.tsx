import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";
import TestPage from "@pagesV02/testData/TestData";

const App = () => {
  const maxWidth = "500px";

  return (
    <>
      <ThemeProvider theme={theme(maxWidth)}>
        <Global styles={global(maxWidth)} />
        <TestPage />
      </ThemeProvider>
    </>
  );
};

export default App;
