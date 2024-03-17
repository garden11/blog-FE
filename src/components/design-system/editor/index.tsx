import { RefObject, useEffect } from "react";
import { Editor as BaseEditor } from "@toast-ui/react-editor";
import Prism from "prismjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { HookMap } from "@toast-ui/editor";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";

// types
import { CssPixelValue } from "src/styles/types";

type Props = {
  editorRef: RefObject<BaseEditor>;
  defaultValue?: string;
  onUploadImage: (image: File) => Promise<string | undefined>;
  height?: CssPixelValue;
};

const toolbarItems = [
  ["heading", "bold", "italic", "strike"],
  ["hr"],
  ["ul", "ol", "task"],
  ["table", "link"],
  ["image"],
  ["code", "codeblock"],
  ["scrollSync"],
];

const Editor = ({ height = "auto", ...props }: Props) => {
  useEffect(() => {
    props.defaultValue &&
      props.editorRef.current?.getInstance().setHTML(props.defaultValue);
  }, [props.defaultValue]);

  const addImage: HookMap["addImageBlobHook"] = (image, callback) => {
    if (!(image instanceof File)) return;

    props.onUploadImage(image).then((uri) => uri && callback(uri, image.name));
  };

  return (
    <BaseEditor
      ref={props.editorRef}
      height={coerceCssPixelValue(height)}
      previewStyle="vertical"
      initialEditType="markdown"
      useCommandShortcut={true}
      toolbarItems={toolbarItems}
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      hooks={{
        addImageBlobHook: addImage,
      }}
    />
  );
};

export default Editor;
