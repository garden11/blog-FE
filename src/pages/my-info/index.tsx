import { signOut, useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import MyInfoArticle from "src/components/system-design/my-info/my-info-article";
import WithdrawalArticle from "src/components/system-design/my-info/withdrawal-article";
import ProfileArticle from "src/components/system-design/my-info/profile-article";
import Stack from "src/components/design-system/stack";

// constants
import { eventListeners } from "src/constants";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";
import useAuth from "src/hooks/useAuth";

// forms
import { EmailFormValues } from "src/forms/emailForm";
import { UpdatePasswordFormValues } from "src/forms/passwordForm";
import { ImageFormValues } from "src/forms/imageForm";

// types
import { UserInfo } from "src/types/user";
import { ProfileDetail } from "src/types/profile";
import { Page } from "src/types/common";

// styles
import { spacing } from "src/styles/spacing";

type Props = {};

const MyInfo: Page<Props> = (props: Props) => {
  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [profile, setProfile] = useState<ProfileDetail>({} as ProfileDetail);

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

  useEffect(() => {
    const getProfileDetail = async () => {
      if (!session) return;

      try {
        const profile = await API.getProfileDetail({
          username: session.username,
        });
        profile && setProfile(profile);
      } catch (error) {
        alert("프로필 정보를 불러올 수 없습니다.");
      }
    };

    getProfileDetail();
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

  const onSubmitProfileImageForm: SubmitHandler<ImageFormValues> = async (
    form,
    event
  ) => {
    if (!session) return;

    try {
      const request = {
        image: form.image,
        profileId: profile.id,
      } as API.ProfileImageRequest;

      const profileImage = await API.createProfileImage({
        accessToken: session.accessToken,
        request,
      });

      const newProfile: ProfileDetail = {
        ...profile,
        profileImageId: profileImage.id,
        profileImageUri: profileImage.uri,
      };

      setProfile(() => newProfile);

      event?.target.reset();

      window.dispatchEvent(new CustomEvent(eventListeners.PROFILE_UPDATE));

      alert("이미지가 변경되었습니다.");
    } catch (error) {
      alert("이미지 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitProfileImageForm: SubmitErrorHandler<ImageFormValues> = (
    errors
  ) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  return (
    <Stack.Vertical spacing={spacing.unit30}>
      <ProfileArticle
        profile={profile}
        onSubmitProfileImageForm={onSubmitProfileImageForm}
        onErrorSubmitProfileImageForm={onErrorSubmitProfileImageForm}
      />

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
  return <BlogLayout>{page}</BlogLayout>;
};

export default MyInfo;
