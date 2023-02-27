// constants
import { DEFAULT_PROFILE_IMAGE_URI } from "src/constants";

type Props = {
  image: {
    uri?: string;
  };
};

const CommentAuthorThumbnail = (props: Props) => {
  const defaultUri = DEFAULT_PROFILE_IMAGE_URI;

  const { image } = props;

  return (
    <div className="author-thumb">
      <img src={image?.uri ? image.uri : defaultUri} />
    </div>
  );
};

export default CommentAuthorThumbnail;
