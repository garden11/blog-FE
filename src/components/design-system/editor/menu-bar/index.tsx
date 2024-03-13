import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Editor } from "@tiptap/react";
import { ValidationError } from "yup";
import { useMemo } from "react";

// forms
import { imageFormSchema } from "src/forms/imageForm";
import { css } from "@emotion/react";
import { spacing } from "src/styles/spacing";

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

  const styles = {
    container: css`
      ${spacing.padding4};
      background-color: #f7f7f7;
      border: 1px solid #e2e2e2;

      > button {
        background-color: transparent;
        border: 0px;
      }
    `,
  };

  const MemoizedMenuBar = useMemo(() => {
    return (
      <div css={styles.container}>
        <button onClick={handleClickImageButton} type="button">
          <AddPhotoAlternateIcon fontSize="large" />
        </button>
      </div>
    );
  }, [editor, onSubmitImage, onErrorSubmitImage]);

  return MemoizedMenuBar;
};

export default MenuBar;
