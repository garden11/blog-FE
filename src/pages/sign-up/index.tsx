import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import SignUpForm from "src/components/sign-up/SignUpForm";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// forms
import { SignUpFormValues } from "src/forms/authForm";

type Props = {};

const SignUp = (props: Props) => {
  const router = useRouter();

  const { alert } = useAlertOrConfirm();

  const onSubmitForm: SubmitHandler<SignUpFormValues> = async (form, event) => {
    try {
      if (!(await API.isUniqueUsername({ username: form.username }))) {
        alert("중복된 아이디입니다.");
        return;
      }

      if (!(await API.isUniqueEmail({ email: form.email }))) {
        alert("중복된 이메일 입니다.");
        return;
      }

      const request = {
        email: form.email,
        username: form.username,
        password: form.password,
      } as API.SignUpRequest;

      await API.signUp({ request });

      event?.target.reset();
      router.replace("/sign-in");
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      alert("회원가입 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitForm: SubmitErrorHandler<SignUpFormValues> = (errors) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  return (
    <div className="auth">
      <SignUpForm onSubmit={onSubmitForm} onErrorSubmit={onErrorSubmitForm} />
    </div>
  );
};

export default SignUp;
