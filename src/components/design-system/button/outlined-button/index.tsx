import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

type Props = {
  color?: "primary" | "neutral";
  selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const OutlinedButton = ({
  color = "primary",
  selected = false,
  ...props
}: Props) => {
  const styles = {
    container: css`
      box-sizing: border-box;
      color: ${{
        primary: "#f48840",
        neutral: "#aaaaaa",
      }[color]};
      background-color: #fff;
      border: 1px solid
        ${{
          primary: "#f48840",
          neutral: "#aaaaaa",
        }[color]};
      border-radius: 5px;

      ${selected &&
      css`
        color: #fff;
        background-color: #f48840;
      `}
    `,
  };

  return <button css={styles.container} {...props} />;
};

export default OutlinedButton;
