import { Viewer as BaseViewer } from "@toast-ui/react-editor";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "prismjs/themes/prism.css";
import { css } from "@emotion/react";

type Props = {
  value: string;
};

const Viewer = (props: Props) => {
  const styles = {
    container: css`
      img {
        max-width: 100%;
      }
    `,
  };

  return (
    <div css={styles.container}>
      <BaseViewer
        initialValue={props.value}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
};

export default Viewer;
