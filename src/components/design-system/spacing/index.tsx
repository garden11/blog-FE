import { css } from "@emotion/react";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";

type Options = {
  direction: "vertical" | "horizontal";
};

type Props = {
  size: number;
};

type SpacingComponent = (props: Props) => JSX.Element;

const createSpacingComponent = (options: Options): SpacingComponent =>
  function SpacingComponent(props: Props) {
    const { direction = "horizontal" } = options;

    const styles = {
      container: css`
        ${direction === "horizontal" &&
        css`
          width: ${coerceCssPixelValue(props.size)};
        `};

        ${direction === "vertical" &&
        css`
          height: ${coerceCssPixelValue(props.size)};
        `};
      `,
    };

    return <div css={styles.container} />;
  };

type Spacing = { Vertical: SpacingComponent; Horizontal: SpacingComponent };

const Spacing: Spacing = {
  Vertical: createSpacingComponent({ direction: "vertical" }),
  Horizontal: createSpacingComponent({ direction: "horizontal" }),
};

export default Spacing;
