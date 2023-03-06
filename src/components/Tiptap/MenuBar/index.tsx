import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Editor } from "@tiptap/react";
import { ValidationError } from "yup";
import { useMemo } from "react";

// models
import { imageFormSchema } from "src/models/forms/imageForm";

type Props = {
  editor: Editor | null;
  onSubmitImage: (image: File, editor: Editor | null) => void;
  onErrorSubmitImage: (error: ValidationError) => void;
};

const MenuBar = (props: Props) => {
  const { editor, onSubmitImage, onErrorSubmitImage } = props;

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

  const MemoizedMenuBar = useMemo(() => {
    return (
      <div className="menu-bar">
        <button onClick={handleClickImageButton} type="button">
          <AddPhotoAlternateIcon fontSize="large" />
        </button>
      </div>
    );
  }, [editor, onSubmitImage, onErrorSubmitImage]);

  return MemoizedMenuBar;
};

export default MenuBar;
