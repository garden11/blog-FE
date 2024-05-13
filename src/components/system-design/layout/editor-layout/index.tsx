import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { ReactNode } from "react";

// components
import Flex from "src/components/design-system/flex";

// styles
import { spacing } from "src/styles/spacing";

type Props = { children: ReactNode };

const EditorLayout = (props: Props) => {
  const styles = {
    container: css`
      width: 100%;
      height: 100vh;

      > .content {
        height: 100%;
        width: 70%;
        box-sizing: border-box;
        ${spacing.padding.y20};

        @media (max-width: 992px) {
          width: 100%;
        }
      }
    `,
  };

  return (
    <Flex.Center css={styles.container}>
      <div className={cx("content")}>{props.children}</div>
    </Flex.Center>
  );
};

export default EditorLayout;
