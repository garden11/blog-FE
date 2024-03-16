import { css } from "@emotion/react";
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";

// types
import { CssPixelValue } from "src/styles/types";

type Options = {
  direction: "vertical" | "horizontal";
};

type Props = { size?: CssPixelValue };

type LineComponent = (props: Props) => JSX.Element;

const createLineComponent = (options: Options): LineComponent =>
  function LineComponent({ size = "100%", ...props }: Props) {
    const { direction = "horizontal" } = options;

    const styles = {
      contianer: css`
        border: 1px solid #eee;

        ${direction === "horizontal" &&
        css`
          width: ${coerceCssPixelValue(size)};
        `};

        ${direction === "vertical" &&
        css`
          height: ${coerceCssPixelValue(size)};
        `};
      `,
    };

    return <div css={styles.contianer} />;
  };

type Line = {
  Horizontal: LineComponent;
  Vertical: LineComponent;
};

const Line: Line = {
  Horizontal: createLineComponent({ direction: "horizontal" }),
  Vertical: createLineComponent({ direction: "vertical" }),
};

export default Line;
