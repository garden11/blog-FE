import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// models
import {
  emailFormSchema as formSchema,
  EmailFormValues as FormValues,
} from "src/models/forms/emailForm";

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

  return (
    <div className="wrapper">
      <div className="title">Find password</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input type="text" {...register("email")} />
          <label>Email</label>
        </div>
        {errors.email && <p className="hint">{errors.email.message}</p>}

        <div className="field">
          <input type="submit" value="Send" />
        </div>

        <div className="link">
          Aleady have an account? <Link href={"/sign-in"}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default FindPasswordForm;
