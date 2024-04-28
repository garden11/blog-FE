import { css } from "@emotion/react";

// components
import Spacing from "../spacing";
import Line from "../line";

// styles
import { colors } from "src/styles/colors";
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
      color: ${colors.heading};
      margin: unset;
    `,
  };

  if (variant === "primary") {
    return (
      <h1 css={styles.container}>
        {props.value}
        <Spacing.Vertical size={spacing.unit10} />
        <Line.Horizontal />
        <Spacing.Vertical size={spacing.unit20} />
      </h1>
    );
  }

  if (variant === "secondary") {
    return (
      <h2 css={styles.container}>
        {props.value}
        <Spacing.Vertical size={spacing.unit20} />
      </h2>
    );
  }

  return <></>;
};

export default Heading;
