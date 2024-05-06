import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import Flex from "src/components/design-system/flex";

// styles
import { colors } from "src/styles/colors";

type Props = {};

const Footer = (props: Props) => {
  const styles = {
    container: css`
      background-color: ${colors.footer};
      height: 150px;

      .info {
        font-size: 13px;

        > .link {
          cursor: pointer;
        }

        > .name {
          font-weight: 600;
          text-transform: uppercase;
        }
      }
    `,
  };

  return (
    <footer css={styles.container}>
      <Flex.Center className={cx("full-height")}>
        <div className={cx("info")}>
          <span
            className={cx("link")}
            onClick={() =>
              window.open(process.env.NEXT_PUBLIC_CREATOR_GIT_LINK)
            }
          >
            {process.env.NEXT_PUBLIC_CREATOR_GIT_LINK}
          </span>
          <span className={cx("name")}>
            {" "}
            {process.env.NEXT_PUBLIC_CREATOR_NAME}
          </span>
        </div>
      </Flex.Center>
    </footer>
  );
};

export default Footer;
