import { css, SerializedStyles } from "@emotion/react";

// styles
import { coerceCssPixelValue } from "./coerceCssPixelValue";

export const gutter: {
  vertical: (spacing: number, selector?: string) => SerializedStyles;
  horizontal: (spacing: number, selector?: string) => SerializedStyles;
} = {
  vertical: (spacing: number, selector: string = "*:not(style)") => {
    return css`
      & > ${selector} ~ ${selector} {
        margin-top: ${coerceCssPixelValue(spacing)};
      }
    `;
  },
  horizontal: (spacing: number, selector: string = "*:not(style)") => css`
    & > ${selector} ~ ${selector} {
      margin-left: ${coerceCssPixelValue(spacing)};
    }
  `,
};
