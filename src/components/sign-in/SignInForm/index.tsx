import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// models
import {
  signInformSchema as formSchema,
  SignInFormValues as FormValues,
} from "src/models/forms/authForm";

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

  return (
    <div className="wrapper">
      <div className="title">Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <input type="submit" value="Sign in" />
        </div>

        <div className="link">
          <a
            onClick={() =>
              handleSubmit(onSubmit({ username: "test", password: "1111" }))
            }
          >
            Test sign in
          </a>
        </div>

        <div className="link">
          Not a member? <Link href="/sign-up">Sign up</Link>
        </div>

        <div className="link">
          Forgot your password? <Link href="/find-password">Find password</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
