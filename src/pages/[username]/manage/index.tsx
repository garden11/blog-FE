import { ReactElement, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { css } from "@emotion/react";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import ProfileArticle from "src/components/system-design/manage/profile-article";
import Stack from "src/components/design-system/stack";

// forms
import { ImageFormValues } from "src/forms/imageForm";

// hooks
import useAuth from "src/hooks/useAuth";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// types
import { ProfileDetail } from "src/types/profile";
import { Page } from "src/types/common";

// styles
import { spacing } from "src/styles/spacing";

type Props = {};

const BlogManage: Page<Props> = (props) => {
  const { data: session } = useSession();
  const { alert } = useAlertOrConfirm();

  const [profile, setProfile] = useState<ProfileDetail>({} as ProfileDetail);

  useAuth({ shouldRedirect: true });

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

  const styles = {
    container: css``,
  };

  return (
    <Stack.Vertical css={styles.container} spacing={spacing.unit30}>
      <ProfileArticle
        profile={profile}
        onSubmitProfileImageForm={onSubmitProfileImageForm}
        onErrorSubmitProfileImageForm={onErrorSubmitProfileImageForm}
      />
    </Stack.Vertical>
  );
};

BlogManage.layout = (page: ReactElement) => {
  return <BlogLayout hasSideBar={false}>{page}</BlogLayout>;
};

export default BlogManage;
