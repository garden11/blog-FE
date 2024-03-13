import {
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
  Controller,
  DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationError } from "yup";
import { Editor } from "@tiptap/react";
import { useEffect } from "react";
import { cx } from "@emotion/css";

// components
import Button from "src/components/design-system/button";
import EditorComponent from "../../../design-system/editor";
import Form from "src/components/design-system/form";
import Flex from "src/components/design-system/flex";
import Input from "src/components/design-system/input";
import Select from "src/components/design-system/select";
import Stack from "src/components/design-system/stack";

// forms
import {
  postFormSchema as formSchema,
  PostFormValues as FormValues,
} from "src/forms/postForm";

// styles
import { spacing } from "src/styles/spacing";

// types
import { Category } from "src/types/category";

// utils
import ByteUtil from "src/utils/ByteUtil";

type Props = {
  defaultValues?: DefaultValues<FormValues>;
  categoryList: Category[];
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
  onSubmitImage: (image: File, editor: Editor | null) => void;
  onErrorSubmitImage: (error: ValidationError) => void;
};

const PostForm = (props: Props) => {
  const byteUtil = new ByteUtil();

  const { register, control, watch, handleSubmit, setValue, reset } =
    useForm<FormValues>({
      mode: "onSubmit",
      resolver: yupResolver(formSchema),
    });

  useEffect(() => {
    reset(props.defaultValues);
  }, [!!props.defaultValues]);

  return (
    <Form
      className={cx("full-height")}
      onSubmit={handleSubmit(props.onSubmit, props.onErrorSubmit)}
    >
      <Input {...register("id")} hidden />
      <Input {...register("registerYN")} hidden />

      <Stack.Vertical spacing={spacing.unit10} className={cx("full-height")}>
        <Stack.Vertical.Item flex={"none"}>
          <Stack.Horizontal spacing={spacing.unit10}>
            <Stack.Horizontal.Item flex={"none"}>
              <Select {...register("categoryId")}>
                <option value="" disabled>
                  CATEGORY
                </option>
                {props.categoryList.map((listItem) => {
                  return (
                    <option key={listItem.id} value={listItem.id}>
                      {listItem.name}
                    </option>
                  );
                })}
              </Select>
            </Stack.Horizontal.Item>

            <Stack.Horizontal.Item>
              <Input
                {...register("title")}
                type="text"
                className="title-input"
                placeholder="TITLE"
                width={"100%"}
              />
            </Stack.Horizontal.Item>
          </Stack.Horizontal>
        </Stack.Vertical.Item>

        <Input {...register("contentByteLength")} hidden />
        {/* 현재 bytes */}
        {/* <div className="d-flex justify-content-end">
          <span>{`${watch("contentByteLength")}/100000bytes`}</span>
        </div> */}

        <Stack.Vertical.Item overflow="hidden">
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <EditorComponent
                height={"100%"}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setValue(
                    "contentByteLength",
                    byteUtil.getByteLengthOfUtf8String(value)
                  );
                }}
                onSubmitImage={props.onSubmitImage}
                onErrorSubmitImage={props.onErrorSubmitImage}
              />
            )}
          />
        </Stack.Vertical.Item>

        <Stack.Vertical.Item flex={"none"}>
          <Flex justifyContent="flex-end">
            <Button type="submit">SUBMIT</Button>
          </Flex>
        </Stack.Vertical.Item>
      </Stack.Vertical>
    </Form>
  );
};

export default PostForm;
