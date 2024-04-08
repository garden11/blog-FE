import { useRouter } from "next/router";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { ReactElement } from "react";

// api
import * as API from "src/api";

// components
import CenteredLayout from "src/components/system-design/layout/centered-layout";
import SignUpForm from "src/components/system-design/auth/sign-up-form";

// forms
import { SignUpFormValues } from "src/forms/authForm";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// types
import { Page } from "src/types/common";

type Props = {};

const SignUp: Page<Props> = (props) => {
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
    const { message } = Object.values(errors)[0];
    message && alert(message);
  };

  return (
    <SignUpForm onSubmit={onSubmitForm} onErrorSubmit={onErrorSubmitForm} />
  );
};

SignUp.layout = (page: ReactElement) => {
  return <CenteredLayout>{page}</CenteredLayout>;
};

export default SignUp;
