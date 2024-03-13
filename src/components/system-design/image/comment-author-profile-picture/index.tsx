// constants
import { css } from "@emotion/react";
import { DEFAULT_PROFILE_IMAGE_URI } from "src/constants";

type Props = {
  image: {
    uri?: string;
  };
};

const CommentAuthorProfilePicture = (props: Props) => {
  const defaultUri = DEFAULT_PROFILE_IMAGE_URI;

  const styles = {
    container: css`
      position: relative;
      display: inline;
      float: left;
      width: 100px;
      height: 100px;

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
    <div css={styles.container}>
      <img src={props.image?.uri ? props.image.uri : defaultUri} />
    </div>
  );
};

export default CommentAuthorProfilePicture;
