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
  emailFormSchema as formSchema,
  EmailFormValues as FormValues,
} from "src/forms/emailForm";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

const FindPasswordForm = (props: Props) => {
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
        <Card.Heading value="Find password" />
        <Card.Content>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            itemHeight={"50px"}
            itemWidth={"100%"}
          >
            <Stack.Vertical spacing={spacing.unit20}>
              <Form.Item>
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

              <Form.Item>
                <Button
                  type="submit"
                  rounded
                  size="large"
                  width={"100%"}
                  height={"100%"}
                >
                  Send
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

export default FindPasswordForm;
