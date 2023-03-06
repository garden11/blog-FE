type Props = {
  image: {
    uri?: string;
  };
};

const CommentAuthorThumbnail = (props: Props) => {
  const DEFAULT_IMAGE_URI = "/assets/images/default-profile-picture.png";

  const { image } = props;

  return (
    <div className="author-thumb">
      <img src={image?.uri ? image.uri : DEFAULT_IMAGE_URI} />
    </div>
  );
};

export default CommentAuthorThumbnail;
