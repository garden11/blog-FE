type Props = {
  image: {
    uri?: string;
  };
};

const PostThumbnail = (props: Props) => {
  const { image } = props;

  const DEFAULT_IMAGE_URI = "/assets/images/default-post-thumbnail.png";

  return (
    <div className="blog-thumb">
      <img src={image.uri ? image.uri : DEFAULT_IMAGE_URI} />
    </div>
  );
};

export default PostThumbnail;
