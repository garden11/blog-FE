// constants
import { DEFAULT_PROFILE_IMAGE_URI } from "src/constants";

type Props = { image: { uri?: string }; className?: string };

const ProfilePicture = (props: Props) => {
  const defaultUri = DEFAULT_PROFILE_IMAGE_URI;

  const { image, className } = props;

  return (
    <div className={`profile-picture ${className ?? ""}`}>
      <img src={image?.uri ? image.uri : defaultUri} />
    </div>
  );
};

export default ProfilePicture;
