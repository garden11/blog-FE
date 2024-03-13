import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// components
import Card from "src/components/design-system/card";
import Flex from "src/components/design-system/flex";
import ProfilePictureForm from "src/components/system-design/manage/profile-article/profile-picture-form";
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
    <Card>
      <Card.Content>
        <Heading value={"PROFILE"} />

        <Flex.CenterHorizontal>
          <ProfilePictureForm
            onSubmit={onSubmitProfileImageForm}
            onErrorSubmit={onErrorSubmitProfileImageForm}
            previewImage={{ uri: profile.profileImageUri }}
          />
        </Flex.CenterHorizontal>
      </Card.Content>
    </Card>
  );
};

export default ProfileArticle;
