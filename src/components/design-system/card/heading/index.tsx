import { css } from "@emotion/react";

// styles
import { colors } from "src/styles/colors";

type Props = {
  value: string;
};

const Heading = (props: Props) => {
  const styles = {
    container: css`
      font-size: 35px;
      font-weight: 600;
      text-align: center;
      line-height: 100px;
      color: ${colors.white};
      user-select: none;
      border-radius: inherit;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      background: ${colors.primary};
    `,
  };

  return <div css={styles.container}>{props.value}</div>;
};

export default Heading;
