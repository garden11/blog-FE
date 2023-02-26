import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// components
import FindPasswordForm from "src/components/find-password/FindPasswordForm";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// models
import { EmailFormValues } from "src/models/forms/emailForm";

// services
import AuthService, { MailRequest } from "src/services/AuthService";

type Props = {};

const FindPassword = (props: Props) => {
  const authService = new AuthService();

  const { alert } = useAlertOrConfirm();

  const onSubmitForm: SubmitHandler<EmailFormValues> = (form, event) => {
    (async () => {
      const processToken = uuidv4();
      const SUBJECT = "[BLOG] 비밀번호 재설정";
      const LINK = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/reset-password/${processToken}`;
      const MESSAGE =
        "다음 링크를 통해 비밀번호를 재설정해 주세요.\n" + `${LINK}`;

      const request = {
        to: form.email,
        subject: SUBJECT,
        message: MESSAGE,
        processToken,
      } as MailRequest;

      await authService.sendResetPasswordMail({ request });
      alert("메일을 발송했습니다.");
    })().catch((error) => alert("메일 발송 중 에러가 발생하였습니다."));
  };

  return (
    <div className="auth">
      <FindPasswordForm onSubmit={onSubmitForm} />
    </div>
  );
};

export default FindPassword;
