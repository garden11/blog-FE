import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { MouseEventHandler, useEffect, useState } from "react";

// models
import { Category } from "src/models/category";
import {
  categoryFormSchema as formSchema,
  CategoryFormValues as FormValues,
} from "src/models/forms/categoryForm";
import _, { forEach, isEmpty } from "lodash";

type Props = {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
  onClickDeleteButton?: (id: Category["id"]) => void;
};

const CategoryForm = (props: Props) => {
  const { onClickDeleteButton, onSubmit, onErrorSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    props.defaultValues ? setEditable(false) : setEditable(true);
    reset(props.defaultValues);
  }, [!!props.defaultValues]);

  const toggleEditable = () => {
    if (!defaultValues || _.isEmpty(defaultValues)) return;

    setEditable(!editable);
  };

  const Button = (props: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    value: string | number | readonly string[] | undefined;
    type: "button" | "reset" | "submit" | undefined;
  }) => {
    const { type, value, onClick } = props;

    return (
      <button type={type} className="main-button" onClick={onClick}>
        {value}
      </button>
    );
  };

  return (
    <form
      onSubmit={(event) =>
        handleSubmit(
          onSubmit,
          onErrorSubmit
        )(event).then(() => toggleEditable())
      }
      onReset={() => {
        reset();
        toggleEditable();
      }}
    >
      <input {...register("id")} defaultValue={defaultValues?.id} hidden />

      <input
        className="flex-grow-1"
        type="text"
        {...register("name")}
        defaultValue={defaultValues?.name}
        readOnly={!editable}
      />

      {!editable ? (
        <>
          <Button
            type="button"
            onClick={() => setEditable(true)}
            value="EDIT"
          />
          <Button
            type="button"
            onClick={() =>
              onClickDeleteButton &&
              defaultValues?.id &&
              onClickDeleteButton(defaultValues.id)
            }
            value="DELETE"
          />
        </>
      ) : (
        <>
          <Button type="submit" value="SUBMIT" />
          <Button type="reset" value="CANCEL" />
        </>
      )}
    </form>
  );
};

export default CategoryForm;
