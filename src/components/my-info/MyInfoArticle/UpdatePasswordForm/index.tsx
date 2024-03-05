import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// forms
import {
  updatePasswordFormSchema as formSchema,
  UpdatePasswordFormValues as FormValues,
} from "src/forms/passwordForm";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fields">
        <div className="field">
          <label>PASSWORD</label>
          <div className="input-container">
            <input type="password" {...register("password")} />
          </div>
        </div>

        <div className="field">
          <label>NEW PASSWORD</label>
          <div className="input-container">
            <input type="password" {...register("newPassword")} />
            {errors.newPassword && (
              <p className="hint">{errors.newPassword.message}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label>NEW PASSWORD CONFIRM</label>
          <div className="input-container">
            <input type="password" {...register("newPasswordConfirm")} />
            {errors.newPasswordConfirm && (
              <p className="hint">{errors.newPasswordConfirm.message}</p>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="main-button d-flex ml-auto mr-auto">
        SUBMIT
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
