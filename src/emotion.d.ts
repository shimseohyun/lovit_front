import "@emotion/react";
import type { CustomTheme } from "./styles";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
