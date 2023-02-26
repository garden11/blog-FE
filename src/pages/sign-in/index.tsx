import React from "react";
import { SubmitHandler } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";

// components
import SignInForm from "src/components/sign-in/SignInForm";

// hooks
import useAuth from "src/hooks/useAuth";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// models
import { SignInFormValues } from "src/models/forms/authForm";
import { useRouter } from "next/router";

type Props = {};

type PageQuery = {
  referer?: string | undefined;
};

const SignIn = (props: Props) => {
  const router = useRouter();

  const { alert } = useAlertOrConfirm();

  let referer: string | undefined;
  ({ referer } = router.query as PageQuery);

  useAuth({ referer });

  const onSubmitForm: SubmitHandler<SignInFormValues> = (form, event) => {
    (async () => {
      const response = await signIn("credentials", {
        ...form,
        redirect: false,
      });

      let ok: SignInResponse["ok"] = false,
        error: SignInResponse["error"] = undefined;
      response && ({ ok, error } = response);

      if (ok) {
        event?.target.reset();
      }

      if (error) {
        throw new Error();
      }
    })().catch((error) => alert("아이디 또는 비밀번호가 일치하지 않습니다."));
  };

  return (
    <div className="auth">
      <SignInForm onSubmit={onSubmitForm} />
    </div>
  );
};

export default SignIn;
