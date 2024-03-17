import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";

// styles
import { colors } from "src/styles/colors";

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
        primary: colors.primary,
        neutral: colors.neutral,
      }[color]};
      background-color: ${colors.white};
      border: 1px solid
        ${{
          primary: colors.primary,
          neutral: colors.neutral,
        }[color]};
      border-radius: 5px;

      ${selected &&
      css`
        color: ${colors.white};
        background-color: ${colors.primary};
      `}
    `,
  };

  return <button css={styles.container} {...props} />;
};

export default OutlinedButton;
