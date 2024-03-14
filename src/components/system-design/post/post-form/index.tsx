import {
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
  DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationError } from "yup";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import { cx } from "@emotion/css";
import dynamic from "next/dynamic";

// components
import Button from "src/components/design-system/button";
import Form from "src/components/design-system/form";
import Flex from "src/components/design-system/flex";
import Input from "src/components/design-system/input";
import Stack from "src/components/design-system/stack";

// forms
import {
  postFormSchema as formSchema,
  PostFormValues as FormValues,
} from "src/forms/postForm";
import { imageFormSchema } from "src/forms/imageForm";

// styles
import { spacing } from "src/styles/spacing";

// utils
import ByteUtil from "src/utils/ByteUtil";

const EditorComponent = dynamic(
  () => import("src/components/design-system/editor"),
  {
    ssr: false,
  }
);

type Props = {
  defaultValues?: DefaultValues<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
  onSubmitImage: (image: File) => Promise<string | undefined>;
  onErrorSubmitImage: (error: ValidationError) => void;
};

const PostForm = (props: Props) => {
  const byteUtil = new ByteUtil();

  const editorRef = useRef<Editor>(null);

  const { register, handleSubmit, setValue, reset } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [!!props.defaultValues]);

  const onUploadImage = async (image: File) => {
    try {
      await imageFormSchema.validate({ image });
      const uri = props.onSubmitImage(image);

      return uri;
    } catch (error) {
      error instanceof ValidationError && props.onErrorSubmitImage(error);
    }
  };

  return (
    <Form
      className={cx("full-height")}
      onSubmit={handleSubmit(props.onSubmit, props.onErrorSubmit)}
    >
      <Input {...register("id")} hidden />
      <Input {...register("registerYN")} hidden />

      <Stack.Vertical spacing={spacing.unit10} className={cx("full-height")}>
        <Stack.Vertical.Item flex={"none"}>
          <Input
            {...register("title")}
            className="title-input"
            placeholder="TITLE"
            width={"100%"}
          />
        </Stack.Vertical.Item>

        <Input {...register("contentByteLength")} hidden />

        <Input name={"content"} hidden />
        <Stack.Vertical.Item overflow="hidden">
          {editorRef && (
            <EditorComponent
              editorRef={editorRef}
              height={"100%"}
              defaultValue={props.defaultValues?.content}
              onUploadImage={onUploadImage}
            />
          )}
        </Stack.Vertical.Item>

        <Stack.Vertical.Item flex={"none"}>
          <Flex justifyContent="flex-end">
            <Button
              type="submit"
              onClick={() => {
                const content =
                  editorRef.current?.getInstance().getHTML() ?? "";

                setValue("content", content);
                setValue(
                  "contentByteLength",
                  byteUtil.getByteLengthOfUtf8String(content)
                );
              }}
            >
              SUBMIT
            </Button>
          </Flex>
        </Stack.Vertical.Item>
      </Stack.Vertical>
    </Form>
  );
};

export default PostForm;
