import { Global, ThemeProvider } from "@emotion/react";
import Board from "./pages/map/MapPage";
import { theme } from "./styles/theme";
import { global } from "./styles/global";
import Navigation from "./components/navigation/Navigation";

const App = () => {
  const maxWidth = "500px";

  return (
    <>
      <ThemeProvider theme={theme(maxWidth)}>
        <Global styles={global(maxWidth)} />
        <Navigation />
        <Board />
      </ThemeProvider>
    </>
  );
};

export default App;
