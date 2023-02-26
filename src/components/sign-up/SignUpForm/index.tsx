import Link from "next/link";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// models
import {
  signUpformSchema as formSchema,
  SignUpFormValues as FormValues,
} from "src/models/forms/authForm";

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

  return (
    <div className="wrapper">
      <div className="title">Sign up</div>
      <form onSubmit={handleSubmit(onSubmit, onErrorSubmit)}>
        <div className="field">
          <input type="text" {...register("email")} />
          <label>Email</label>
        </div>
        {errors.email && <p className="hint">{errors.email.message}</p>}

        <div className="field">
          <input type="text" {...register("username")} />
          <label>Username</label>
        </div>
        {errors.username && <p className="hint">{errors.username.message}</p>}

        <div className="field">
          <input type="password" {...register("password")} />
          <label>Password</label>
        </div>
        {errors.password && <p className="hint">{errors.password.message}</p>}

        <div className="field">
          <input type="password" {...register("passwordConfirm")} />
          <label>Confirm password</label>
        </div>
        {errors.passwordConfirm && (
          <p className="hint">{errors.passwordConfirm.message}</p>
        )}

        <div className="field">
          <input type="submit" value="Sign up" />
        </div>
        <div className="link">
          Aleady have an account? <Link href={"/sign-in"}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
