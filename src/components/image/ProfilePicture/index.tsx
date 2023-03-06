type Props = { image: { uri?: string }; className?: string };

const ProfilePicture = (props: Props) => {
  const DEFAULT_IMAGE_URI = "/assets/images/default-profile-picture.png";

  const { image, className } = props;

  return (
    <div className={`profile-picture ${className ?? ""}`}>
      <img src={image?.uri ? image.uri : DEFAULT_IMAGE_URI} />
    </div>
  );
};

export default ProfilePicture;
