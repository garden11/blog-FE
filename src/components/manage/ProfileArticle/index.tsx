import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// components
import ProfileImageForm from "src/components/manage/ProfileArticle/ProfileImageForm";

// models
import { ProfileView } from "src/models/profile";
import { ImageFormValues } from "src/models/forms/imageForm";

type Props = {
  profile: ProfileView;
  onSubmitProfileImageForm: SubmitHandler<ImageFormValues>;
  onErrorSubmitProfileImageForm: SubmitErrorHandler<ImageFormValues>;
};

const ProfileArticle = (props: Props) => {
  const { profile, onSubmitProfileImageForm, onErrorSubmitProfileImageForm } =
    props;

  return (
    <div className="content">
      <div className="items-heading">PROFILE</div>
      <ProfileImageForm
        onSubmit={onSubmitProfileImageForm}
        onErrorSubmit={onErrorSubmitProfileImageForm}
        previewImage={{ uri: profile.profileImageUri }}
      />
    </div>
  );
};

export default ProfileArticle;
