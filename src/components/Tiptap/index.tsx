import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { ValidationError } from "yup";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

// models
import { imageFormSchema } from "src/models/forms/imageForm";
import { useEffect } from "react";

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

  const TiptapMenuBar = (props: {}) => {
    const handleClickImageButton = () => {
      if (typeof document === undefined) return;

      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        const file = input?.files?.[0];

        if (!file) return;

        await imageFormSchema
          .validate({ image: file })
          .then(({ image }) => {
            onSubmitImage(image, editor);
          })
          .catch((error) => {
            onErrorSubmitImage(error);
          });
      };
    };

    return (
      <>
        <div className="menu-bar">
          <button onClick={handleClickImageButton} type="button">
            <AddPhotoAlternateIcon fontSize="large" />
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <TiptapMenuBar />
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
