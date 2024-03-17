import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import Form from "src/components/design-system/form";
import Button from "src/components/design-system/button";
import Flex from "src/components/design-system/flex";
import Stack from "src/components/design-system/stack";
import Input from "src/components/design-system/input";

// forms
import {
  updatePasswordFormSchema as formSchema,
  UpdatePasswordFormValues as FormValues,
} from "src/forms/passwordForm";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

const UpdatePasswordForm = (props: Props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  return (
    <Form
      variant="horizontal"
      labelWidth={"150px"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack.Vertical spacing={spacing.unit20}>
        <Stack.Vertical spacing={spacing.unit10}>
          <Form.Item label="PASSWORD">
            <Input type="password" {...register("password")} />
          </Form.Item>

          <Form.Item label="NEW PASSWORD" error={errors.newPassword?.message}>
            <Input type="password" {...register("newPassword")} />
          </Form.Item>

          <Form.Item
            label="NEW PASSWORD CONFIRM"
            error={errors.newPasswordConfirm?.message}
          >
            <Input type="password" {...register("newPasswordConfirm")} />
          </Form.Item>
        </Stack.Vertical>

        <Flex.CenterHorizontal>
          <Button type="submit">SUBMIT</Button>
        </Flex.CenterHorizontal>
      </Stack.Vertical>
    </Form>
  );
};

export default UpdatePasswordForm;
