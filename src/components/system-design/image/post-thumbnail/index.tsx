import { css } from "@emotion/react";

// constants
import { DEFAULT_POST_THUMBNAIL_IMAGE_URI } from "src/constants";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";

// types
import { CssPixelValue } from "src/styles/types";

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
      width: 200px;
      padding-top: 150px;

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
