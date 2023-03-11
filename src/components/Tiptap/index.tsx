import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import HardBreak from "@tiptap/extension-hard-break";
import { ValidationError } from "yup";
import { useEffect } from "react";

// components
import MenuBar from "./MenuBar";

type Props = {
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onSubmitImage: (image: File, editor: Editor | null) => void;
  onErrorSubmitImage: (error: ValidationError) => void;
};

const Tiptap = (props: Props) => {
  const { value, onChange, onSubmitImage, onErrorSubmitImage } = props;

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
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // 상위 컴포넌트에서 value 값을 변경했을 때 반영
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <>
      <MenuBar
        editor={editor}
        onSubmitImage={onSubmitImage}
        onErrorSubmitImage={onErrorSubmitImage}
      />
      <EditorContent editor={editor} className="editor" />
    </>
  );
};

export default Tiptap;

export const setTiptapEditorImage = ({
  uri,
  editor,
}: {
  uri: string;
  editor: Editor | null;
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
