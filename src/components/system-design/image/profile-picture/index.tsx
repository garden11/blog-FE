import { css } from "@emotion/react";

// constants
import { DEFAULT_PROFILE_IMAGE_URI } from "src/constants";
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";

// styles
import { CssPixelValue } from "src/styles/types";

type Props = { image: { uri?: string }; size?: CssPixelValue };

const ProfilePicture = ({ size = "100%", ...props }: Props) => {
  const defaultUri = DEFAULT_PROFILE_IMAGE_URI;

  const styles = {
    container: css`
      position: relative;
      width: ${coerceCssPixelValue(size)};
      padding-top: ${coerceCssPixelValue(size)};

      > img {
        position: absolute;
        height: 100%;
        width: 100%;
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

export default ProfilePicture;
