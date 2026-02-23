import { css } from "@emotion/react";

export const global = (maxWidth: string) => css`
  ${resetCSS}

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard-SemiBold.woff2") format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  body {
    width: 100vw;
    display: flex;
    justify-content: center;
    font-family:
      "Pretendard",
      system-ui,
      -apple-system,
      sans-serif;
  }

  #root {
    max-width: ${maxWidth};
    width: 100%;
  }
`;

const resetCSS = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  html,
  body {
    font-family:
      "Pretendard", "system-ui", "-apple-system", "BlinkMacSystemFont",
      "Open Sans", "Helvetica Neue", sans-serif;
    font-synthesis: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
