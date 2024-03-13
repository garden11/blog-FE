import Link from "next/link";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { css } from "@emotion/react";

// components
import Button from "src/components/design-system/button";
import Card from "src/components/design-system/card";
import Form from "src/components/design-system/form";
import Spacing from "src/components/design-system/spacing";
import Stack from "src/components/design-system/stack";
import TextField from "src/components/design-system/text-field";

// forms
import {
  signUpformSchema as formSchema,
  SignUpFormValues as FormValues,
} from "src/forms/authForm";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
};

const SignUpForm = (props: Props) => {
  const { onSubmit, onErrorSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const styles = {
    container: css`
      .link {
        text-align: center;

        > a {
          color: #4158d0;
        }
      }
    `,
  };

  return (
    <div css={styles.container}>
      <Card width={"380px"} variant="rounded">
        <Card.Heading value="Sign up" />
        <Card.Content>
          <Form
            onSubmit={handleSubmit(onSubmit, onErrorSubmit)}
            itemWidth={"100%"}
            itemHeight={"50px"}
          >
            <Stack.Vertical spacing={spacing.unit20}>
              <Form.Item error={errors.email?.message}>
                <TextField
                  variant="outlined"
                  rounded
                  label="Email"
                  isError={!!errors.email?.message}
                  width={"100%"}
                  height={"100%"}
                  {...register("email")}
                />
              </Form.Item>

              <Form.Item error={errors.username?.message}>
                <TextField
                  variant="outlined"
                  rounded
                  label="Username"
                  isError={!!errors.username?.message}
                  width={"100%"}
                  height={"100%"}
                  {...register("username")}
                />
              </Form.Item>

              <Form.Item error={errors.password?.message}>
                <TextField
                  variant="outlined"
                  rounded
                  label="Password"
                  isError={!!errors.password?.message}
                  type="password"
                  width={"100%"}
                  height={"100%"}
                  {...register("password")}
                />
              </Form.Item>

              <Form.Item error={errors.passwordConfirm?.message}>
                <TextField
                  variant="outlined"
                  rounded
                  label="Confirm password"
                  isError={!!errors.passwordConfirm?.message}
                  type="password"
                  width={"100%"}
                  height={"100%"}
                  {...register("passwordConfirm")}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="submit"
                  variant="rounded"
                  size="large"
                  width={"100%"}
                  height={"100%"}
                >
                  Sign up
                </Button>
              </Form.Item>
            </Stack.Vertical>
          </Form>

          <Spacing.Vertical size={spacing.unit20} />

          <div className="link">
            Aleady have an account? <Link href={"/sign-in"}>Sign in</Link>
          </div>

          <Spacing.Vertical size={spacing.unit20} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default SignUpForm;
