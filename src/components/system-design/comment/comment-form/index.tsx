import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { css } from "@emotion/react";

// components
import Button from "src/components/design-system/button";
import Form from "src/components/design-system/form";
import Heading from "src/components/design-system/heading";
import Stack from "src/components/design-system/stack";
import TextArea from "src/components/design-system/textarea";

// forms
import {
  commentFormSchema as formSchema,
  CommentFormValues as FormValues,
} from "src/forms/commentForm";

// hooks
import useAuth from "src/hooks/useAuth";

// styles
import { spacing } from "src/styles/spacing";

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  onErrorSubmit: SubmitErrorHandler<FormValues>;
};

const CommentForm = (props: Props) => {
  const { onSubmit, onErrorSubmit } = props;

  const { register, handleSubmit } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });
  const { isSignedIn } = useAuth();

  const styles = {
    container: css``,
  };

  return (
    <div css={styles.container}>
      <Heading value={"YOUR COMMENT"} />

      <Form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
        <Stack.Vertical spacing={spacing.unit20}>
          <TextArea
            rows={6}
            placeholder={
              isSignedIn()
                ? "TYPE YOUR COMMENT"
                : "로그인 후 댓글을 작성할 수 있습니다"
            }
            readOnly={!isSignedIn()}
            {...register("content")}
          />

          <Button type="submit">SUBMIT</Button>
        </Stack.Vertical>
      </Form>
    </div>
  );
};

export default CommentForm;
