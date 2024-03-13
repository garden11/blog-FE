import { ReactNode } from "react";
import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import Header from "./header";
import Footer from "./footer";
import Flex from "src/components/design-system/flex";
import SideBar from "./side-bar";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

type Props = {
  children: ReactNode;
  hasSideBar?: boolean;
};

const BlogLayout = ({ hasSideBar = true, ...props }: Props) => {
  const styles = {
    body: css`
      ${spacing.padding.x10};
      ${spacing.padding.top150};
      ${spacing.padding.bottom100};

      > .content-side-bar {
        width: 100%;

        @media (min-width: 576px) {
          max-width: 540px;
        }

        @media (min-width: 768px) {
          max-width: 720px;
        }

        @media (min-width: 992px) {
          max-width: 960px;
        }

        @media (min-width: 1200px) {
          max-width: 1140px;
        }

        > .content {
          width: 100%;

          @media (min-width: 992px) {
            flex: 2;
          }
        }

        > .side-bar {
          width: 100%;

          @media (min-width: 992px) {
            flex: 1;
            ${spacing.padding.top50};
          }
        }
      }
    `,
  };

  return (
    <>
      <Header />

      <Flex.CenterHorizontal css={styles.body}>
        <Flex
          className={cx("content-side-bar")}
          wrap="wrap"
          columnGap={coerceCssPixelValue(spacing.unit20)}
          rowGap={coerceCssPixelValue(spacing.unit50)}
        >
          <div className={cx("content")}>{props.children}</div>
          {hasSideBar && (
            <div className={cx("side-bar")}>
              <SideBar />
            </div>
          )}
        </Flex>
      </Flex.CenterHorizontal>

      <Footer />
    </>
  );
};

export default BlogLayout;
