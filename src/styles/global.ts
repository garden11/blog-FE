import { css } from "@emotion/react";

// styles
import { colors } from "./colors";

export const globalStyles = css`
  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard-Thin.woff2") format("woff2");
  }

  :root {
  }

  * {
    font-family: "Pretendard", sans-serif;
  }

  *:focus {
    outline: none !important;
  }

  body {
    margin: 0px;
    background-color: ${colors.background};
  }

  p {
    margin-bottom: 0px;
  }

  a {
    text-decoration: none !important;
  }

  ul {
    padding: 0px;
    margin: 0px;
    list-style: none;
  }

  .full-height {
    height: 100%;
  }

  .full-width {
    width: 100%;
  }
`;
