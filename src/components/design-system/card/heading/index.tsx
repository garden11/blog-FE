import { css } from "@emotion/react";

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
      color: #fff;
      user-select: none;
      border-radius: inherit;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      background: #f48840;
    `,
  };

  return <div css={styles.container}>{props.value}</div>;
};

export default Heading;
