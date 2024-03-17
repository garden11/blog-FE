import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { ValidationError } from "yup";
import { css } from "@emotion/react";

// components
import Button from "src/components/design-system/button";
import Form from "src/components/design-system/form";
import ProfilePicture from "src/components/system-design/image/profile-picture";
import Stack from "src/components/design-system/stack";
import Input from "src/components/design-system/input";

// forms
import {
  imageFormSchema as formSchema,
  imageFormSchema,
  ImageFormValues as FormValues,
} from "src/forms/imageForm";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  previewImage?: { uri?: string };
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
};

const ProfilePictureForm = (props: Props) => {
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

  const styles = {
    container: css`
      width: 380px;

      input {
        width: 100%;
      }
    `,
  };

  return (
    <Stack.Vertical
      css={styles.container}
      spacing={spacing.unit20}
      alignItems="center"
    >
      <ProfilePicture image={previewImage} size={"200px"} />

      <Form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
        <Input {...register("image")} hidden />

        <Stack.Horizontal>
          <Stack.Horizontal.Item>
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => {
                event.target.files?.[0] &&
                  setValue("image", event.target.files[0]);
              }}
            />
          </Stack.Horizontal.Item>

          <Stack.Horizontal.Item flex={"none"}>
            <Button type="submit">SUBMIT</Button>
          </Stack.Horizontal.Item>
        </Stack.Horizontal>
      </Form>
    </Stack.Vertical>
  );
};

export default ProfilePictureForm;
