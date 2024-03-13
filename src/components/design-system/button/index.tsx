import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

// styles
import {
  CssPixelValue,
  coerceCssPixelValue,
} from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

type Props = {
  variant?: "standard" | "rounded";
  size?: "medium" | "large";
  color?: "primary" | "neutral";
  width?: CssPixelValue;
  height?: CssPixelValue;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "standard",
  size = "medium",
  color = "primary",
  ...props
}: Props) => {
  const styles = {
    contianer: css`
      color: #fff;
      border: none;
      font-weight: 500;
      cursor: pointer;
      background-color: ${{ primary: "#f48840", neutral: "#aaaaaa" }[color]};
      transition: all 0.3s ease;

      font-size: ${{
        medium: "13px",
        large: "20px",
      }[size]};

      ${props.width
        ? css`
            width: ${coerceCssPixelValue(props.width)};
          `
        : css`
            width: fit-content;
            ${spacing.padding.x20};
          `};

      ${props.height
        ? css`
            height: ${coerceCssPixelValue(props.height)};
          `
        : css`
            height: auto;
            ${spacing.padding.y10};
          `}

      ${variant === "rounded" &&
      css`
        border-radius: 25px;
      `};

      :active {
        transform: scale(0.95);
      }
    `,
  };

  return <button css={styles.contianer} {...props} />;
};

export default Button;
