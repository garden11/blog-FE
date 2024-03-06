import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import MyInfoArticle from "src/components/my-info/MyInfoArticle";
import WithdrawalArticle from "src/components/my-info/WithdrawalArticle";
import Layout from "src/components/shared/Layout";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";
import useAuth from "src/hooks/useAuth";

// types
import { UserInfo } from "src/types/user";

// forms
import { EmailFormValues } from "src/forms/emailForm";
import { UpdatePasswordFormValues } from "src/forms/passwordForm";

type PageQuery = {
  username?: string;
};

type Props = {};

const MyInfo = (props: Props) => {
  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  useAuth({ shouldRedirect: true });

  useEffect(() => {
    const selectUserInfo = async () => {
      if (!session) return;

      try {
        const userInfo = await API.selectUserInfo({
          accessToken: session.accessToken,
          username: session.username,
        });
        setUserInfo(userInfo);
      } catch (error) {
        alert("유저 정보 불러오기 중 에러가 발생하였습니다.");
      }
    };

    selectUserInfo();
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
    form,
    event
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
