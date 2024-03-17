import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

// styles
import { colors } from "src/styles/colors";

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
      color: ${colors.white};
      border: none;
      background-color: ${{
        primary: colors.primary,
        neutral: colors.neutral,
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
