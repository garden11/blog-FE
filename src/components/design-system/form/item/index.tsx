import { css } from "@emotion/react";
import { ReactNode, useContext } from "react";
import { cx } from "@emotion/css";

// componetns
import Stack from "../../stack";

// contexts
import { Context } from "../contexts";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

type Props = { label?: string; error?: string; children: ReactNode };

const Item = (props: Props) => {
  const form = useContext(Context);

  const styles = {
    container: css`
      width: ${coerceCssPixelValue(form.itemWidth)};

      > label {
        width: ${coerceCssPixelValue(form.labelWidth)};
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.3px;
        color: #20232e;
        margin: 0px;
      }

      > .input-error {
        > .input {
          height: ${coerceCssPixelValue(form.itemHeight)};
        }

        > .error {
          color: #c91b1b;
          font-size: 10px;
          ${spacing.margin.left10};
        }
      }
    `,
  };

  if (form.variant === "vertical") {
    return (
      <Stack.Vertical css={styles.container} spacing={spacing.unit2}>
        {props.label && <label>{props.label}</label>}
        <Stack.Vertical className={cx("input-error")} spacing={spacing.unit4}>
          <div className={cx("input")}>{props.children}</div>
          {props.error && <div className={cx("error")}>{props.error}</div>}
        </Stack.Vertical>
      </Stack.Vertical>
    );
  }

  if (form.variant === "horizontal") {
    return (
      <Stack.Horizontal css={styles.container} alignItems="baseline">
        {props.label && <label>{props.label}</label>}
        <Stack.Vertical className={cx("input-error")} spacing={spacing.unit4}>
          <div className={cx("input")}>{props.children}</div>
          {props.error && <div className={cx("error")}>{props.error}</div>}
        </Stack.Vertical>
      </Stack.Horizontal>
    );
  }

  return <></>;
};

export default Item;
