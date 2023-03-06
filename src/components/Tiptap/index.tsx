import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { ValidationError } from "yup";

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

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        Image.configure({
          inline: true,
          HTMLAttributes: {
            class: "tiptap-image",
          },
        }),
      ],
      autofocus: "end",
      content: value,
      onUpdate({ editor }) {
        onChange(editor.getHTML());
      },
    },
    // value값이 있다면 반영함
    [!!value]
  );

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
  editor?.chain().focus().setImage({ src: uri }).focus().run();
};
