import { css } from "@emotion/react";

type Options = {
  direction: "vertical" | "horizontal";
};

type Props = {};

type LineComponent = (props: Props) => JSX.Element;

const createLineComponent =
  (options: Options): LineComponent =>
  (props: Props) => {
    const { direction = "horizontal" } = options;

    const styles = {
      contianer: css`
        border-bottom: 1px solid #eee;

        ${direction === "horizontal" &&
        css`
          width: 100%;
        `};

        ${direction === "vertical" &&
        css`
          height: 100%;
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
