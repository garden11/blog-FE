import { useEditor, EditorContent, Editor as BaseEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import HardBreak from "@tiptap/extension-hard-break";
import { ValidationError } from "yup";
import { useEffect } from "react";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

// components
import MenuBar from "./menu-bar";
import Stack from "../stack";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

// types
import { CssPixelValue } from "src/styles/types";

type Props = {
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onSubmitImage: (image: File, editor: BaseEditor | null) => void;
  onErrorSubmitImage: (error: ValidationError) => void;
  height?: CssPixelValue;
};

const Editor = ({ height = "auto", ...props }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          contentEditable: true,
        },
      }),
    ],
    autofocus: "end",
    content: props.value,
    onUpdate({ editor }) {
      props.onChange(editor.getHTML());
    },
  });

  // 상위 컴포넌트에서 value 값을 변경했을 때 반영
  useEffect(() => {
    if (editor && editor.getHTML() !== props.value) {
      editor.commands.setContent(props.value);
    }
  }, [editor, props.value]);

  const styles = {
    container: css`
      .editor {
        height: ${coerceCssPixelValue(height)};
        background-color: #fff;
        border: 1px solid #e2e2e2;
        overflow: auto;
        ${spacing.padding20};
      }

      img {
        max-width: 100%;
      }
    `,
  };

  return (
    <Stack.Vertical css={styles.container} className={cx("full-height")}>
      <Stack.Vertical.Item flex={"none"}>
        <MenuBar
          editor={editor}
          onSubmitImage={props.onSubmitImage}
          onErrorSubmitImage={props.onErrorSubmitImage}
        />
      </Stack.Vertical.Item>

      <Stack.Vertical.Item overflow="hidden">
        <EditorContent editor={editor} className={cx("editor")} />
      </Stack.Vertical.Item>
    </Stack.Vertical>
  );
};

export default Editor;

export const setEditorImage = ({
  uri,
  editor,
}: {
  uri: string;
  editor: BaseEditor | null;
}) => {
  editor
    ?.chain()
    .insertContent({
      type: "image",
      attrs: {
        src: uri,
      },
    })
    .run();

  editor?.commands.setHardBreak();
  editor?.chain().focus().run();
};
