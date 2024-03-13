import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

// components
import Button from "src/components/design-system/button";
import Form from "src/components/design-system/form";
import Stack from "src/components/design-system/stack";
import Input from "src/components/design-system/input";

// forms
import {
  categoryFormSchema as formSchema,
  CategoryFormValues as FormValues,
} from "src/forms/categoryForm";

// styles
import { spacing } from "src/styles/spacing";

// types
import { Category } from "src/types/category";

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

  const styles = {
    container: css`
      width: 380px;

      input {
        width: 100%;
      }
    `,
  };

  return (
    <Form
      css={styles.container}
      itemWidth={"80px"}
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
      <Input {...register("id")} defaultValue={defaultValues?.id} hidden />

      <Stack.Horizontal spacing={spacing.unit10}>
        <Stack.Horizontal.Item>
          <Input
            {...register("name")}
            defaultValue={defaultValues?.name}
            readOnly={!editable}
            height={"100%"}
          />
        </Stack.Horizontal.Item>

        {!editable ? (
          <>
            <Stack.Horizontal.Item flex={"none"}>
              <Button
                type="button"
                width={"80px"}
                onClick={() => setEditable(true)}
              >
                EDIT
              </Button>
            </Stack.Horizontal.Item>

            <Stack.Horizontal.Item flex={"none"}>
              <Button
                type="button"
                width={"80px"}
                onClick={() =>
                  onClickDeleteButton &&
                  defaultValues?.id &&
                  onClickDeleteButton(defaultValues.id)
                }
              >
                DELETE
              </Button>
            </Stack.Horizontal.Item>
          </>
        ) : (
          <>
            <Stack.Horizontal.Item flex={"none"}>
              <Button type="submit" width={"80px"}>
                SUBMIT
              </Button>
            </Stack.Horizontal.Item>

            <Stack.Horizontal.Item flex={"none"}>
              <Button type="reset" width={"80px"}>
                CANCEL
              </Button>
            </Stack.Horizontal.Item>
          </>
        )}
      </Stack.Horizontal>
    </Form>
  );
};

export default CategoryForm;
