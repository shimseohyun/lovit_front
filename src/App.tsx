import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";
import Board from "@components/board/Board";

const App = () => {
  const maxWidth = "500px";

  return (
    <>
      <ThemeProvider theme={theme(maxWidth)}>
        <Global styles={global(maxWidth)} />

        <Board />
      </ThemeProvider>
    </>
  );
};

export default App;
