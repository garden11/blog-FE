import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// components
import Flex from "src/components/design-system/flex";
import ProfilePictureForm from "src/components/system-design/my-info/profile-article/profile-picture-form";
import Heading from "src/components/design-system/heading";

// types
import { ProfileDetail } from "src/types/profile";

// forms
import { ImageFormValues } from "src/forms/imageForm";

type Props = {
  profile: ProfileDetail;
  onSubmitProfileImageForm: SubmitHandler<ImageFormValues>;
  onErrorSubmitProfileImageForm: SubmitErrorHandler<ImageFormValues>;
};

const ProfileArticle = (props: Props) => {
  const { profile, onSubmitProfileImageForm, onErrorSubmitProfileImageForm } =
    props;

  return (
    <>
      <Heading value={"PROFILE"} />

      <Flex.CenterHorizontal>
        <ProfilePictureForm
          onSubmit={onSubmitProfileImageForm}
          onErrorSubmit={onErrorSubmitProfileImageForm}
          previewImage={{ uri: profile.profileImageUri }}
        />
      </Flex.CenterHorizontal>
    </>
  );
};

export default ProfileArticle;
