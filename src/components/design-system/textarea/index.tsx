import { css } from "@emotion/react";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from "react";

// tyles
import { spacing } from "src/styles/spacing";

type Props = {} & ComponentPropsWithoutRef<"textarea">;

const TextArea = forwardRef(function TextArea(
  props: Props,
  ref: ComponentPropsWithRef<"textarea">["ref"]
) {
  const styles = {
    container: css`
      width: 100%;
      height: 180px;
      min-height: 100px;
      max-height: 220px;
      box-sizing: border-box;
      border: 1px solid #eee;
      font-size: 13px;
      font-weight: 500;
      color: #7a7a7a;
      outline: none;
      ${spacing.padding.y10};
      ${spacing.padding.x16};

      ::placeholder {
        color: #aaa;
      }
    `,
  };

  return <textarea css={styles.container} ref={ref} {...props} />;
});

export default TextArea;
