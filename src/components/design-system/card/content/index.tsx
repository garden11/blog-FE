import { css } from "@emotion/react";
import { ReactNode } from "react";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  padding?: "small" | "medium";
  children: ReactNode;
};

const Content = ({ padding = "medium", ...props }: Props) => {
  const styles = {
    container: css`
      ${{ small: spacing.padding20, medium: spacing.padding30 }[padding]};
    `,
  };

  return <div css={styles.container}>{props.children}</div>;
};

export default Content;
