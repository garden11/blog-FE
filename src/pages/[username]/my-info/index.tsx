import { signOut, useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import MyInfoArticle from "src/components/system-design/my-info/my-info-article";
import WithdrawalArticle from "src/components/system-design/my-info/withdrawal-article";
import Stack from "src/components/design-system/stack";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";
import useAuth from "src/hooks/useAuth";

// forms
import { EmailFormValues } from "src/forms/emailForm";
import { UpdatePasswordFormValues } from "src/forms/passwordForm";

// styles
import { spacing } from "src/styles/spacing";

// types
import { UserInfo } from "src/types/user";
import { Page } from "src/pages/types";
import Flex from "src/components/design-system/flex";

type Props = {};

const MyInfo: Page<Props> = (props: Props) => {
  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  useAuth({ shouldRedirect: true });

  useEffect(() => {
    const getUserInfo = async () => {
      if (!session) return;

      try {
        const userInfo = await API.getUserInfo({
          accessToken: session.accessToken,
          username: session.username,
        });
        setUserInfo(userInfo);
      } catch (error) {
        alert("유저 정보 불러오기 중 에러가 발생하였습니다.");
      }
    };

    getUserInfo();
  }, [session?.username]);

  const handleClickWidthdrawalButton = async () => {
    if (!session) return;

    if (confirm("회원탈퇴 하시겠습니까?")) {
      try {
        await API.withdrawalUser({
          accessToken: session.accessToken,
          username: session.username,
        });

        signOut();
      } catch (error) {
        alert("회원 탈퇴 중 에러가 발생하였습니다.");
      }
    }
  };

  const onSubmitUpdateEmailForm: SubmitHandler<EmailFormValues> = async (
    form
  ) => {
    if (!session) return;

    try {
      const request = {
        email: form.email,
      } as API.UserRequest;

      await API.updateUser({
        accessToken: session.accessToken,
        username: session.username,
        request,
      });

      alert("이메일이 수정되었습니다.");
    } catch (error) {
      alert("이메일 수정 중 에러가 발생하였습니다.");
    }
  };

  const onSubmitUpdatePasswordForm: SubmitHandler<UpdatePasswordFormValues> =
    async (form, event) => {
      if (!session) return;

      try {
        const request = {
          username: session.username,
          password: form.password,
          newPassword: form.newPassword,
        } as API.UpdatePasswordRequest;

        await API.updatePassword({
          accessToken: session.accessToken,
          request,
        });

        event?.target.reset();
        alert("비밀번호가 변경되었습니다.");
      } catch (error) {
        alert("비밀번호 변경 중 에러가 발생하였습니다.");
      }
    };

  return (
    <Stack.Vertical spacing={spacing.unit30}>
      <MyInfoArticle
        userInfo={userInfo}
        onSubmitUpdateEmailForm={onSubmitUpdateEmailForm}
        onSubmitUpdatePasswordForm={onSubmitUpdatePasswordForm}
      />

      <WithdrawalArticle
        onClickWidthdrawalButton={handleClickWidthdrawalButton}
      />
    </Stack.Vertical>
  );
};

MyInfo.layout = (page: ReactElement) => {
  return <BlogLayout hasSideBar={false}>{page}</BlogLayout>;
};

export default MyInfo;
