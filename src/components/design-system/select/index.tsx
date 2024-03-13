import { css } from "@emotion/react";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from "react";
import { spacing } from "src/styles/spacing";

type Props = {} & ComponentPropsWithoutRef<"select">;

const Select = forwardRef(function Select(
  props: Props,
  ref: ComponentPropsWithRef<"select">["ref"]
) {
  const styles = {
    container: css`
      box-sizing: border-box;
      font-size: 13px;
      ${spacing.padding4};
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      border-bottom-color: #d4d4d4;

      :first-of-type[disabled] {
        display: none;
      }
    `,
  };

  return <select css={styles.container} ref={ref} {...props} />;
});

export default Select;
