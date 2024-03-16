import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
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
  signInformSchema as formSchema,
  SignInFormValues as FormValues,
} from "src/forms/authForm";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

const SignInForm = (props: Props) => {
  const { onSubmit } = props;

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
      .links {
        > .item {
          text-align: center;

          > a {
            color: #4158d0;
            cursor: pointer;
          }
        }
      }
    `,
  };

  return (
    <div css={styles.container}>
      <Card width={"380px"} variant="rounded">
        <Card.Heading value="Sign in" />
        <Card.Content>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            itemWidth={"100%"}
            itemHeight={"50px"}
          >
            <Stack.Vertical spacing={spacing.unit20}>
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

              <Form.Item>
                <Button
                  type="submit"
                  rounded
                  size="large"
                  width={"100%"}
                  height={"100%"}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Stack.Vertical>
          </Form>

          <Spacing.Vertical size={spacing.unit20} />

          <Stack.Vertical className="links" spacing={spacing.unit20}>
            <div className="item">
              <a
                onClick={() =>
                  handleSubmit(
                    onSubmit({
                      username:
                        process.env.NEXT_PUBLIC_TEST_USER_USERNAME ?? "",
                      password:
                        process.env.NEXT_PUBLIC_TEST_USER_PASSWORD ?? "",
                    })
                  )
                }
              >
                Test sign in
              </a>
            </div>

            <div className="item">
              Not a member? <Link href="/sign-up">Sign up</Link>
            </div>

            <div className="item">
              Forgot your password?{" "}
              <Link href="/find-password">Find password</Link>
            </div>
          </Stack.Vertical>

          <Spacing.Vertical size={spacing.unit20} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default SignInForm;
