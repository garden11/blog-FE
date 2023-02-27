// constants
import { DEFAULT_POST_THUMBNAIL_IMAGE_URI } from "src/constants";

type Props = {
  image: {
    uri?: string;
  };
};

const PostThumbnail = (props: Props) => {
  const { image } = props;

  const defaultUri = DEFAULT_POST_THUMBNAIL_IMAGE_URI;

  return (
    <div className="blog-thumb">
      <img src={image.uri ? image.uri : defaultUri} />
    </div>
  );
};

export default PostThumbnail;
