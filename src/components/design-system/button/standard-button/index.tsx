import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

type Props = {
  color?: "primary" | "neutral";
  rounded?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StandardButton = ({
  color = "primary",
  rounded = false,
  ...props
}: Props) => {
  const styles = {
    container: css`
      color: #fff;
      border: none;
      background-color: ${{
        primary: "#f48840",
        neutral: "#aaaaaa",
      }[color]};

      ${rounded &&
      css`
        border-radius: 25px;
      `};
    `,
  };

  return <button css={styles.container} {...props} />;
};

export default StandardButton;
