import { css } from "@emotion/react";
import {
  CSSProperties,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
} from "react";

type Props = {
  children?: ReactNode;
  flex?: CSSProperties["flex"];
  overflow?: CSSProperties["overflow"];
} & ComponentPropsWithoutRef<"div">;

const Item = forwardRef(function Item(
  { flex = "auto", overflow = "visible", ...props }: Props,
  ref: ComponentPropsWithRef<"div">["ref"]
) {
  const styles = {
    container: css`
      flex: ${flex};
      overflow: ${overflow};
    `,
  };

  return <div css={styles.container} {...props} ref={ref} />;
});

export default Item;
