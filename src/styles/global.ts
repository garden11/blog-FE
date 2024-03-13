import { css } from "@emotion/react";

export const globalStyles = css`
  :root {
  }

  *:focus {
    outline: none !important;
  }

  body {
    margin: 0px;
    font-family: "Roboto", sans-serif;
    background-color: #f7f7f7;
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
