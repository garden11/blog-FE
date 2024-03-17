import { css } from "@emotion/react";
import { CSSProperties } from "react";

export const flex = {
  display: css`
    display: flex;
  `,
  direction: (value: CSSProperties["flexDirection"]) => css`
    flex-direction: ${value};
  `,
  alignItems: (value: CSSProperties["alignItems"]) => css`
    align-items: ${value};
  `,
  justifyContent: (value: CSSProperties["justifyContent"]) => css`
    justify-content: ${value};
  `,
  wrap: (value: CSSProperties["flexWrap"]) => css`
    flex-wrap: ${value};
  `,
  rowGap: (value: CSSProperties["rowGap"]) =>
    css`
      row-gap: ${value};
    `,
  columnGap: (value: CSSProperties["columnGap"]) =>
    css`
      column-gap: ${value};
    `,
};
