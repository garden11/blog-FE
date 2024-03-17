import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import _ from "lodash";

// components
import Button from "src/components/design-system/button";
import Form from "src/components/design-system/form";
import Flex from "src/components/design-system/flex";
import Stack from "src/components/design-system/stack";
import Input from "src/components/design-system/input";

// forms
import {
  emailFormSchema as formSchema,
  EmailFormValues as FormValues,
} from "src/forms/emailForm";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  defaultValues?: DefaultValues<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
};

const UpdateEmailForm = (props: Props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [!!props.defaultValues]);

  return (
    <Form
      variant="horizontal"
      labelWidth="150px"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack.Vertical spacing={spacing.unit20}>
        <Form.Item label="EMAIL" error={errors.email?.message}>
          <Input type="text" {...register("email")} />
        </Form.Item>

        <Flex.CenterHorizontal>
          <Button type="submit"> SUBMIT</Button>
        </Flex.CenterHorizontal>
      </Stack.Vertical>
    </Form>
  );
};

export default UpdateEmailForm;
