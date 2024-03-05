import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import _ from "lodash";

// forms
import {
  emailFormSchema as formSchema,
  EmailFormValues as FormValues,
} from "src/forms/emailForm";

type Props = {
  defaultValues?: DefaultValues<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
};

const UpdateEmailForm = (props: Props) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, defaultValues },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [!!props.defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fields">
        <div className="field">
          <label>EMAIL</label>
          <div className="input-container">
            <input type="text" {...register("email")} />
            {errors.email && <p className="hint">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      <button type="submit" className="main-button d-flex ml-auto mr-auto">
        SUBMIT
      </button>
    </form>
  );
};

export default UpdateEmailForm;
