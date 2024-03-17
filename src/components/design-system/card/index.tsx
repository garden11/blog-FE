import { css } from "@emotion/react";
import { ReactNode } from "react";

// components
import Heading from "./heading";
import Content from "./content";

// styles
import { colors } from "src/styles/colors";
import {
  CssPixelValue,
  coerceCssPixelValue,
} from "src/styles/coerceCssPixelValue";

// types
import { Variant } from "./types";

type Props = {
  width?: CssPixelValue;
  variant?: Variant;
  children: ReactNode;
};

const CardComponent = ({
  width = "auto",
  variant = "standard",
  ...props
}: Props) => {
  const styles = {
    container: css`
      width: ${coerceCssPixelValue(width)};
      background-color: ${colors.white};

      ${variant === "standard" && css``};

      ${variant === "rounded" &&
      css`
        border-radius: 15px;
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
      `};
    `,
  };

  return <div css={styles.container}>{props.children}</div>;
};

type Card = typeof CardComponent & {
  Heading: typeof Heading;
  Content: typeof Content;
};

const Card: Card = CardComponent as Card;
Card.Heading = Heading;
Card.Content = Content;

export default Card;
