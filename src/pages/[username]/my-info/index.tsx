import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

// components
import MyInfoArticle from "src/components/my-info/MyInfoArticle";
import WithdrawalArticle from "src/components/my-info/WithdrawalArticle";
import Layout from "src/components/shared/Layout";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";
import useAuth from "src/hooks/useAuth";

// models
import { UserInfo } from "src/models/user";
import { EmailFormValues } from "src/models/forms/emailForm";
import { UpdatePasswordFormValues } from "src/models/forms/passwordForm";

// sevices
import AuthService, { UpdatePasswordRequest } from "src/services/AuthService";
import UserService, { UserRequest } from "src/services/UserService";

type PageQuery = {
  username?: string;
};

type Props = {};

const MyInfo = (props: Props) => {
  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const userService = new UserService();
  const authService = new AuthService();

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  useAuth({ shouldRedirect: true });

  useEffect(() => {
    if (!session) return;

    (async () => {
      const userInfo = await userService.selectUserInfo({
        accessToken: session.accessToken,
        username: session.username,
      });
      setUserInfo(userInfo);
    })().catch((error) =>
      alert("유저 정보 불러오기 중 에러가 발생하였습니다.")
    );
  }, [session?.username]);

  const handleClickWidthdrawalButton = async () => {
    if (!session) return;

    const onConfirm = () => {
      (async () => {
        await authService.withdrawalUser({
          accessToken: session.accessToken,
          username: session.username,
        });

        signOut();
      })().catch((error) => alert("회원 탈퇴 중 에러가 발생하였습니다."));
    };
    confirm("회원탈퇴 하시겠습니까?", onConfirm);
  };

  const onSubmitUpdateEmailForm: SubmitHandler<EmailFormValues> = (
    form,
    event
  ) => {
    if (!session) return;

    (async () => {
      const request = {
        email: form.email,
      } as UserRequest;

      await userService.updateUser({
        accessToken: session.accessToken,
        username: session.username,
        request,
      });

      alert("이메일이 수정되었습니다.");
    })().catch((error) => alert("이메일 수정 중 에러가 발생하였습니다."));
  };

  const onSubmitUpdatePasswordForm: SubmitHandler<UpdatePasswordFormValues> = (
    form,
    event
  ) => {
    if (!session) return;

    (async () => {
      const request = {
        username: session.username,
        password: form.password,
        newPassword: form.newPassword,
      } as UpdatePasswordRequest;

      await authService.updatePassword({
        accessToken: session.accessToken,
        request,
      });

      event?.target.reset();
      alert("비밀번호가 변경되었습니다.");
    })().catch((error) => alert("비밀번호 변경 중 에러가 발생하였습니다."));
  };

  return (
    <Layout>
      <div className="my-info">
        <div className="col-lg-12">
          <div className="main-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mr-auto ml-auto">
                  <div className="main-box-items info mb-5">
                    <MyInfoArticle
                      userInfo={userInfo}
                      onSubmitUpdateEmailForm={onSubmitUpdateEmailForm}
                      onSubmitUpdatePasswordForm={onSubmitUpdatePasswordForm}
                    />
                  </div>
                </div>
                <div className="col-lg-8 mr-auto ml-auto">
                  <div className="main-box-items withdrawl">
                    <WithdrawalArticle
                      onClickWidthdrawalButton={handleClickWidthdrawalButton}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyInfo;
