import { css } from "@emotion/react";

// components
import Spacing from "../spacing";
import Line from "../line";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  variant?: "primary" | "secondary";
  value: string;
};

const Heading = ({ variant = "primary", ...props }: Props) => {
  const styles = {
    container: css`
      font-size: ${{ primary: "18px", secondary: "15px" }[variant]};
      font-weight: 900;
      letter-spacing: 0.5px;
      color: #20232e;
    `,
  };

  if (variant === "primary") {
    return (
      <div css={styles.container}>
        {props.value}
        <Spacing.Vertical size={spacing.unit10} />
        <Line.Horizontal />
        <Spacing.Vertical size={spacing.unit20} />
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <div css={styles.container}>
        {props.value}
        <Spacing.Vertical size={spacing.unit20} />
      </div>
    );
  }

  return <></>;
};

export default Heading;
