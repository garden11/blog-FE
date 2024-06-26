import { css } from "@emotion/react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "prismjs/themes/prism.css";
import { cx } from "@emotion/css";

type Props = {
  value: string;
};

const Viewer = (props: Props) => {
  const addLazyLoading = (html: string) => {
    return /<img\b[^>]*>/i.test(html)
      ? html.replace(/<img /g, '<img loading="lazy" ')
      : html;
  };

  const value = addLazyLoading(props.value);

  const styles = {
    container: css`
      font-size: 16px;
      line-height: 30px;

      img {
        max-width: 100%;
      }
      
      .toastui-editor-contents pre code {
        white-space: pre;
      }
    `,
  };

  return (
    <div css={styles.container} >
      <div className={cx("toastui-editor-contents ")} dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default Viewer;
