import { ReactNode } from "react";
import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import Header from "./header";
import Footer from "./footer";
import Flex from "src/components/design-system/flex";

// styles
import { breakPoints } from "src/styles/breakPoints";
import { spacing } from "src/styles/spacing";

type Props = {
  children: ReactNode;
};

const BlogLayout = (props: Props) => {
  const styles = {
    body: css`
      ${spacing.margin.top100};
      ${spacing.margin.bottom100};

      > .content {
        width: calc(100% - ${2 * spacing.unit10}px);
        ${spacing.margin.x10};

        @media (min-width: ${breakPoints.SM}) {
          max-width: 540px;
        }

        @media (min-width: ${breakPoints.MD}) {
          max-width: 720px;
        }

        @media (min-width: ${breakPoints.LG}) {
          max-width: 780px;
        }

        @media (min-width: ${breakPoints.XL}) {
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
