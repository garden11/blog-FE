import { css } from "@emotion/react";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from "react";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/spacing";

// types
import { CssPixelValue } from "src/styles/types";

type Props = {
  width?: CssPixelValue;
} & ComponentPropsWithoutRef<"input">;

const Input = forwardRef(function Input(
  { width = "auto", ...props }: Props,
  ref: ComponentPropsWithRef<"input">["ref"]
) {
  const styles = {
    container: css`
      width: ${coerceCssPixelValue(width)};
      box-sizing: border-box;
      font-size: 13px;
      ${spacing.padding4};
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      border-bottom-color: ${colors.border};
    `,
  };

  return <input css={styles.container} ref={ref} {...props} />;
});

export default Input;
