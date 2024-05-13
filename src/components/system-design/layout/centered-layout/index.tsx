import { css } from "@emotion/react";
import { ReactNode } from "react";

// components
import Flex from "src/components/design-system/flex";

type Props = {
  children: ReactNode;
};

const CenteredLayout = (prpos: Props) => {
  const styles = {
    container: css`
      height: 100vh;
      width: 100%;
    `,
  };

  return <Flex.Center css={styles.container}>{prpos.children}</Flex.Center>;
};

export default CenteredLayout;
