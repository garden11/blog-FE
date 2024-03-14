import { ReactNode } from "react";
import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import Header from "./header";
import Footer from "./footer";
import Flex from "src/components/design-system/flex";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  children: ReactNode;
};

const BlogLayout = (props: Props) => {
  const styles = {
    body: css`
      ${spacing.padding.x10};
      ${spacing.padding.top150};
      ${spacing.padding.bottom100};

      > .content {
        width: 100%;

        @media (min-width: 576px) {
          max-width: 540px;
        }

        @media (min-width: 768px) {
          max-width: 720px;
        }

        @media (min-width: 992px) {
          max-width: 780px;
        }

        @media (min-width: 1200px) {
          max-width: 960px;
        }
      }
    `,
  };

  return (
    <>
      <Header />

      <Flex.CenterHorizontal css={styles.body}>
        <div className={cx("content")}>{props.children}</div>
      </Flex.CenterHorizontal>

      <Footer />
    </>
  );
};

export default BlogLayout;
