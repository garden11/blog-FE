import { css } from "@emotion/react";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from "react";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

// types
import { CssPixelValue } from "src/styles/types";

type PropsDefault = {
  width?: CssPixelValue;
  height?: CssPixelValue;
  variant?: "standard" | "outlined";
  label?: string;
  isError?: boolean;
} & ComponentPropsWithoutRef<"input">;

type PropsStandard = {
  variant?: "standard";
  rounded?: never;
};

type PropsOutlined = {
  variant?: "outlined";
  rounded?: boolean;
};

type Props = PropsDefault & (PropsStandard | PropsOutlined);

const TextField = forwardRef(function TextField(
  { variant = "standard", ...props }: Props,
  ref: ComponentPropsWithRef<"input">["ref"]
) {
  const styles = {
    container: css`
      position: relative;

      ${props.height
        ? css`
            height: ${coerceCssPixelValue(props.height)};

            > input {
              height: 100%;
            }
          `
        : css`
            > input {
              ${spacing.padding.y10};
            }
          `};

      ${props.width &&
      css`
        width: ${coerceCssPixelValue(props.width)};

        > input {
          width: 100%;
        }
      `};

      ${variant === "outlined" &&
      css`
        > label {
          position: absolute;
          top: 50%;
          left: 20px;
          color: ${props.isError ? "#c91b1b" : "#999999"};
          font-weight: 400;
          font-size: 17px;
          pointer-events: none;
          transform: translateY(-50%);
          transition: all 0.3s ease;
        }

        > input {
          box-sizing: border-box;
          ${spacing.padding.left20};
          outline: none;
          font-size: 17px;
          border-width: 1px;
          border-style: solid;
          border-color: ${props.isError ? "#c91b1b" : "lightGray"};
          border-radius: ${props.rounded ? "25px" : "0px"};
          transition: all 0.3s ease;

          :focus {
            border-color: ${props.isError ? "#c91b1b" : "#4158d0"};
          }
        }

        > input:focus ~ label,
        > input:not(:placeholder-shown) ~ label {
          top: 0%;
          font-size: 16px;
          background: #fff;
          transform: translateY(-50%);
        }

        > input:focus ~ label {
          color: ${props.isError ? "#c91b1b" : "#4158d0"};
        }
      `}
    `,
  };

  const { label, isError, rounded, ...restProps } = props;

  return (
    <div css={styles.container}>
      <input ref={ref} placeholder="" {...restProps} />
      {props.label && <label>{props.label}</label>}
    </div>
  );
});

export default TextField;
