import { SubmitHandler } from "react-hook-form";
import _ from "lodash";

// components
import Heading from "src/components/design-system/heading";
import UpdateEmailForm from "src/components/system-design/my-info/my-info-article/update-email-form";
import UpdatePasswordForm from "src/components/system-design/my-info/my-info-article/update-password-form";

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
  return (
    <>
      <Heading variant="primary" value={"MY INFO"} />
      <Heading variant="secondary" value={"EMAIL"} />
      <UpdateEmailForm
        defaultValues={
          _.isEmpty(props.userInfo)
            ? undefined
            : { email: props.userInfo.email }
        }
        onSubmit={props.onSubmitUpdateEmailForm}
      />

      <Heading variant="secondary" value={"PASSWORD"} />
      <UpdatePasswordForm onSubmit={props.onSubmitUpdatePasswordForm} />
    </>
  );
};

export default MyInfoArticle;
