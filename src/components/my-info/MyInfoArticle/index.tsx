import { SubmitHandler } from "react-hook-form";
import _ from "lodash";

// components
import UpdateEmailForm from "src/components/my-info/MyInfoArticle/UpdateEmailForm";
import UpdatePasswordForm from "src/components/my-info/MyInfoArticle/UpdatePasswordForm";

// types
import { UserInfo } from "src/types/user";

// forms
import { EmailFormValues } from "src/forms/emailForm";
import { UpdatePasswordFormValues } from "src/forms/passwordForm";

type Props = {
  userInfo: UserInfo;
  onSubmitUpdateEmailForm: SubmitHandler<EmailFormValues>;
  onSubmitUpdatePasswordForm: SubmitHandler<UpdatePasswordFormValues>;
};

const MyInfoArticle = (props: Props) => {
  const { userInfo, onSubmitUpdateEmailForm, onSubmitUpdatePasswordForm } =
    props;

  return (
    <div className="content">
      <div className="items-heading">MY INFO</div>
      <div className="items-sub-heading">EMAIL</div>
      <UpdateEmailForm
        defaultValues={
          _.isEmpty(userInfo) ? undefined : { email: userInfo.email }
        }
        onSubmit={onSubmitUpdateEmailForm}
      />

      <div className="items-sub-heading">PASSWORD</div>
      <UpdatePasswordForm onSubmit={onSubmitUpdatePasswordForm} />
    </div>
  );
};

export default MyInfoArticle;
