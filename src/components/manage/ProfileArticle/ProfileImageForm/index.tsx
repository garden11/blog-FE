import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { ValidationError } from "yup";

// models
import {
  imageFormSchema as formSchema,
  imageFormSchema,
  ImageFormValues as FormValues,
} from "src/models/forms/imageForm";

// components
import ProfilePicture from "src/components/image/ProfilePicture";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

type Props = {
  previewImage?: { uri?: string };
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
};

const ProfileImageForm = (props: Props) => {
  const { onSubmit, onErrorSubmit } = props;

  const { alert } = useAlertOrConfirm();

  const [previewImage, setPreviewImage] = useState<{ uri?: string }>({
    uri: "",
  });

  const { register, setValue, watch, handleSubmit } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const image = watch("image");

  useEffect(() => {
    props.previewImage &&
      setPreviewImage((prevState) =>
        props.previewImage ? props.previewImage : prevState
      );
  }, [props.previewImage]);

  useEffect(() => {
    const validateImage = async () => {
      if (!image) return;

      try {
        await imageFormSchema.validate({ image }).then((value) => {
          const reader = new FileReader();
          reader.onload = () =>
            setPreviewImage({
              uri:
                typeof reader.result === "string" ? reader.result : undefined,
            });
          reader.readAsDataURL(value.image);
        });
      } catch (error) {
        (error: ValidationError) => alert(error.message);
      }
    };

    validateImage();
  }, [image]);

  return (
    <>
      <ProfilePicture image={previewImage} className={"ml-auto mr-auto"} />
      <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
        <input hidden />
        <input {...register("image")} hidden />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            event.target.files?.[0] && setValue("image", event.target.files[0]);
          }}
        />

        <button type="submit" className="main-button">
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default ProfileImageForm;
