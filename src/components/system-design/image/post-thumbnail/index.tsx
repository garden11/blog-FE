import { css } from "@emotion/react";

type Props = {
  image: {
    uri: string;
  };
};

const PostThumbnail = (props: Props) => {
  const styles = {
    continaer: css`
      position: relative;
      width: 100%;
      aspect-ratio: 10 / 7;

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
      <img src={props.image.uri} />
    </div>
  );
};

export default PostThumbnail;
