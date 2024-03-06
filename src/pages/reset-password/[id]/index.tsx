import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import ResetPasswordForm, {
  ResetPsswordFormStatus,
} from "src/components/reset-password/ResetPasswordForm";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// forms
import { ResetPasswordFormValues } from "src/forms/passwordForm";

type PageQuery = {
  id?: string;
};

type Props = {};

const ResetPassword = (props: Props) => {
  const router = useRouter();
  const { id } = router.query as PageQuery;

  const { alert } = useAlertOrConfirm();

  const [formStatus, setFormStatus] = useState<ResetPsswordFormStatus>();

  const onSubmitForm: SubmitHandler<ResetPasswordFormValues> = async (
    form,
    event
  ) => {
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

  return (
    <div className="auth">
      <ResetPasswordForm onSubmit={onSubmitForm} status={formStatus} />
    </div>
  );
};

export default ResetPassword;
