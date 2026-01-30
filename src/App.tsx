import { Global, ThemeProvider } from "@emotion/react";

import { theme } from "./styles/theme";
import { global } from "./styles/global";
import Board from "@componentsV01/board/Board";
import ColorTestPage from "@pagesV01/ColorTest";

const App = () => {
  const maxWidth = "500px";

  return (
    <>
      <ThemeProvider theme={theme(maxWidth)}>
        <Global styles={global(maxWidth)} />

        <Board />
        {/* <ColorTestPage /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
