import { Global, ThemeProvider } from "@emotion/react";
import MainPage from "./pages/map/MapPage";
import { theme } from "./styles/theme";
import { global } from "./styles/global";

const App = () => {
  const maxWidth = "500px";

  return (
    <>
      <ThemeProvider theme={theme(maxWidth)}>
        <Global styles={global(maxWidth)} />

        <MainPage />
      </ThemeProvider>
    </>
  );
};

export default App;
