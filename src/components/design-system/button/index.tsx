import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

// components
import StandardButton from "./standard-button";
import OutlinedButton from "./outlined-button";

// styles
import {
  CssPixelValue,
  coerceCssPixelValue,
} from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

type PropsDefault = {
  color?: "primary" | "neutral";
  size?: "small" | "medium" | "large";
  width?: CssPixelValue;
  height?: CssPixelValue;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type PropsStandard = {
  variant?: "standard";
  rounded?: boolean;
  selected?: never;
};

type PropsOutlined = {
  variant: "outlined";
  rounded?: never;
  selected?: boolean;
};

type Props = PropsDefault & (PropsStandard | PropsOutlined);

const Button = ({
  variant = "standard",
  size = "medium",
  color = "primary",
  ...props
}: Props) => {
  let Element = <></>;

  const styles = {
    contianer: css`
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      font-size: ${{
        small: "12px",
        medium: "14px",
        large: "20px",
      }[size]};

      ${props.width
        ? css`
            width: ${coerceCssPixelValue(props.width)};
          `
        : css`
            width: fit-content;
            ${{
              small: spacing.padding.x10,
              medium: spacing.padding.x20,
              large: spacing.padding.x20,
            }[size]};
          `};

      ${props.height
        ? css`
            height: ${coerceCssPixelValue(props.height)};
          `
        : css`
            height: auto;
            ${{
              small: spacing.padding.y6,
              medium: spacing.padding.y10,
              large: spacing.padding.y10,
            }[size]};
          `}

      :active {
        transform: scale(0.95);
      }
    `,
  };

  if (variant === "standard") {
    Element = (
      <StandardButton css={styles.contianer} color={color} {...props} />
    );
  }

  if (variant === "outlined") {
    Element = (
      <OutlinedButton css={styles.contianer} color={color} {...props} />
    );
  }

  return Element;
};

export default Button;
