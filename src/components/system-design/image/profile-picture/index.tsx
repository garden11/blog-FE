import { css } from "@emotion/react";
import { DOMAttributes } from "react";

// constants
import { DEFAULT_PROFILE_IMAGE_URI } from "src/constants";
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";

// styles
import { CssPixelValue } from "src/styles/types";

type Props = {
  image: { uri?: string };
  size?: CssPixelValue;
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
};

const ProfilePicture = ({ size = "100%", ...props }: Props) => {
  const styles = {
    container: css`
      position: relative;
      width: ${coerceCssPixelValue(size)};
      height: ${coerceCssPixelValue(size)};
      overflow: hidden;
      border-radius: 50%;
      cursor: ${props.onClick ? "pointer" : "auto"};

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
    <div
      css={styles.container}
      onClick={(event) => {
        props.onClick?.(event);
      }}
    >
      <img
        src={props.image?.uri ? props.image.uri : DEFAULT_PROFILE_IMAGE_URI}
      />
    </div>
  );
};

export default ProfilePicture;
