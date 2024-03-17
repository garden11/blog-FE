import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { SubmitHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import CenteredLayout from "src/components/system-design/layout/centered-layout";
import ResetPasswordForm, {
  ResetPsswordFormStatus,
} from "src/components/system-design/auth/reset-password-form";

// forms
import { ResetPasswordFormValues } from "src/forms/passwordForm";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// types
import { Page } from "src/types/common";

type PageQuery = {
  id?: string;
};

type Props = {};

const ResetPassword: Page<Props> = (props) => {
  const router = useRouter();
  const { id } = router.query as PageQuery;

  const { alert } = useAlertOrConfirm();

  const [formStatus, setFormStatus] = useState<ResetPsswordFormStatus>();

  const onSubmitForm: SubmitHandler<ResetPasswordFormValues> = async (form) => {
    if (!id) return;

    try {
      const request = {
        processToken: id,
        newPassword: form.password,
      } as API.ResetPasswordRequest;

      await API.resetPassword({ request });

      setFormStatus("done");
    } catch (error) {
      alert("비밀번호 재설정에 실패하였습니다.");
    }
  };

  return <ResetPasswordForm onSubmit={onSubmitForm} status={formStatus} />;
};

ResetPassword.layout = (page: ReactNode) => {
  return <CenteredLayout>{page}</CenteredLayout>;
};

export default ResetPassword;
