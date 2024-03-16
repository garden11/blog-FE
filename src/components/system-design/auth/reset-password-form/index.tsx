import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { css } from "@emotion/react";

// components
import Button from "src/components/design-system/button";
import Card from "src/components/design-system/card";
import Form from "src/components/design-system/form";
import Flex from "src/components/design-system/flex";
import Stack from "src/components/design-system/stack";

// forms
import {
  resetPasswordFormSchema as formSchema,
  ResetPasswordFormValues as FormValues,
} from "src/forms/passwordForm";

// styles
import { spacing } from "src/styles/spacing";

// types
import { ResetPsswordFormStatus as FormStatus } from "./types";
import TextField from "src/components/design-system/text-field";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  status: FormStatus;
};

const ResetPasswordForm = (props: Props) => {
  const { status, onSubmit } = props;

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
      .done {
        min-height: 150px;

        .link {
          text-align: center;

          > a {
            color: #4158d0;
          }
        }
      }
    `,
  };

  return (
    <div css={styles.container}>
      <Card width={"380px"} variant="rounded">
        <Card.Heading value="Reset password" />

        <Card.Content>
          {status !== "done" ? (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              itemHeight={"50px"}
              itemWidth={"100%"}
            >
              <Stack.Vertical spacing={spacing.unit20}>
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
                    label="Password confirm"
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
                    rounded
                    size="large"
                    width={"100%"}
                    height={"100%"}
                  >
                    Submit
                  </Button>{" "}
                </Form.Item>
              </Stack.Vertical>
            </Form>
          ) : (
            <Flex.Center className="done">
              <div>
                <div>비밀번호 재설정이 완료되었습니다.</div>
                <div className="link">
                  Go to <Link href={"/sign-in"}>Sign in</Link>
                </div>
              </div>
            </Flex.Center>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;

export * from "./types";
