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

// models
import { Category } from "src/models/category";
import {
  postFormSchema as formSchema,
  PostFormValues as FormValues,
} from "src/models/forms/postForm";

// utils
import ByteUtil from "src/utils/ByteUtil";

// components
import Tiptap from "../../Tiptap";

type Props = {
  defaultValues?: DefaultValues<FormValues>;
  categoryList: Category[];
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
  onSubmitImage: (image: File, editor: Editor | null) => void;
  onErrorSubmitImage: (error: ValidationError) => void;
};

const PostForm = (props: Props) => {
  const {
    categoryList,
    onSubmit,
    onErrorSubmit,
    onSubmitImage,
    onErrorSubmitImage,
  } = props;

  const byteUtil = new ByteUtil();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { defaultValues },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [!!props.defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
      <input {...register("id")} hidden />
      <input {...register("registerYN")} hidden />

      <div className="editor-container">
        <div className="top-bar">
          <select className="category-select-box" {...register("categoryId")}>
            <option value="" disabled>
              CATEGORY
            </option>
            {categoryList.map((listItem) => {
              return (
                <option key={listItem.id} value={listItem.id}>
                  {listItem.name}
                </option>
              );
            })}
          </select>
          <input
            {...register("title")}
            type="text"
            className="title-input"
            placeholder="TITLE"
          />
        </div>

        <input {...register("contentByteLength")} hidden />
        {/* 현재 bytes */}
        {/* <div className="d-flex justify-content-end">
          <span>{`${watch("contentByteLength")}/100000bytes`}</span>
        </div> */}

        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <Tiptap
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue(
                  "contentByteLength",
                  byteUtil.getByteLengthOfUtf8String(value)
                );
              }}
              onSubmitImage={onSubmitImage}
              onErrorSubmitImage={onErrorSubmitImage}
            />
          )}
        />
      </div>

      <div className="bottom-bar">
        <input
          type="submit"
          className="main-button d-inline-block"
          value="SUBMIT"
        />
      </div>
    </form>
  );
};

export default PostForm;
