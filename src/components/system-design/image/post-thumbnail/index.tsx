import { css } from "@emotion/react";

// constants
import { DEFAULT_POST_THUMBNAIL_IMAGE_URI } from "src/constants";

type Props = {
  image: {
    uri?: string;
  };
};

const PostThumbnail = (props: Props) => {
  const defaultUri = DEFAULT_POST_THUMBNAIL_IMAGE_URI;

  const styles = {
    continaer: css`
      position: relative;
      padding-top: 60%;

      > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        margin: auto;
        object-fit: cover;
      }
    `,
  };

  return (
    <div css={styles.continaer}>
      <img src={props.image.uri ? props.image.uri : defaultUri} />
    </div>
  );
};

export default PostThumbnail;
