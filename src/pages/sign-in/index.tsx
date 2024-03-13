import { SubmitHandler } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

// components
import CenteredLayout from "src/components/system-design/layout/centered-layout";
import SignInForm from "src/components/system-design/auth/sign-in-form";

// forms
import { SignInFormValues } from "src/forms/authForm";

// hooks
import useAuth from "src/hooks/useAuth";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// types
import { Page } from "src/types/common";

type Props = {};

type PageQuery = {
  referer?: string | undefined;
};

const SignIn: Page<Props> = (props) => {
  const router = useRouter();

  const { alert } = useAlertOrConfirm();

  let referer: string | undefined;
  ({ referer } = router.query as PageQuery);

  useAuth({ referer });

  const onSubmitForm: SubmitHandler<SignInFormValues> = async (form, event) => {
    try {
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
    } catch (error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return <SignInForm onSubmit={onSubmitForm} />;
};

SignIn.layout = (page: ReactNode) => {
  return <CenteredLayout>{page}</CenteredLayout>;
};

export default SignIn;
