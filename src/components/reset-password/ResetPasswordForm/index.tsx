import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// models
import {
  resetPasswordFormSchema as formSchema,
  ResetPasswordFormValues as FormValues,
} from "src/models/forms/passwordForm";
import MessageBox from "src/components/shared/MessageBox";

type FormStatus = "done" | "error" | undefined;
export type { FormStatus as ResetPsswordFormStatus };

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

  return (
    <div className="wrapper">
      <div className="title">Reset password</div>

      {status !== "done" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input type="password" {...register("password")} />
            <label>Password</label>
          </div>
          {errors.password && <p className="hint">{errors.password.message}</p>}

          <div className="field">
            <input type="password" {...register("passwordConfirm")} />
            <label>Password confirm</label>
          </div>
          {errors.passwordConfirm && (
            <p className="hint">{errors.passwordConfirm.message}</p>
          )}

          <div className="field">
            <input type="submit" value="Submit" />
          </div>
        </form>
      ) : (
        <MessageBox className="mt-5 mb-5 text-center mx-auto">
          <div className="mx-auto">
            <p>비밀번호 재설정이 완료되었습니다.</p>
            <div className="link">
              Go to <Link href={"/sign-in"}>Sign in</Link>
            </div>
          </div>
        </MessageBox>
      )}
    </div>
  );
};

export default ResetPasswordForm;
