import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import Flex from "src/components/design-system/flex";

type Props = {};

const Footer = (props: Props) => {
  const styles = {
    container: css`
      background-color: #20232e;
      height: 250px;

      .copyright {
        font-size: 13px;
        text-transform: uppercase;
        color: #fff;

        > .link {
          color: #f48840;
        }
      }
    `,
  };

  return (
    <footer css={styles.container}>
      <Flex.Center className={cx("full-height")}>
        <div className={cx("copyright")}>
          Copyright 2020 Stand Blog Co. | Design:{" "}
          <a
            className={cx("link")}
            rel="nofollow"
            href="https://templatemo.com"
            target="_parent"
          >
            TemplateMo
          </a>
        </div>
      </Flex.Center>
    </footer>
  );
};

export default Footer;