import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

// components
import ResetPasswordForm, {
  ResetPsswordFormStatus,
} from "src/components/reset-password/ResetPasswordForm";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// models
import { ResetPasswordFormValues } from "src/models/forms/passwordForm";

// services
import AuthService, { ResetPasswordRequest } from "src/services/AuthService";

type PageQuery = {
  id?: string;
};

type Props = {};

const ResetPassword = (props: Props) => {
  const router = useRouter();
  const { id } = router.query as PageQuery;

  const authService = new AuthService();

  const { alert } = useAlertOrConfirm();

  const [formStatus, setFormStatus] = useState<ResetPsswordFormStatus>();

  const onSubmitForm: SubmitHandler<ResetPasswordFormValues> = (
    form,
    event
  ) => {
    if (!id) return;

    (async () => {
      const request = {
        processToken: id,
        newPassword: form.password,
      } as ResetPasswordRequest;

      await authService.resetPassword({ request });

      setFormStatus("done");
    })().catch((error) => {
      alert("비밀번호 재설정에 실패하였습니다.");
    });
  };

  return (
    <div className="auth">
      <ResetPasswordForm onSubmit={onSubmitForm} status={formStatus} />
    </div>
  );
};

export default ResetPassword;
