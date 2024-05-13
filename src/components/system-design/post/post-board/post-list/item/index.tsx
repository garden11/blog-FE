import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import Flex from "src/components/design-system/flex";
import Stack from "src/components/design-system/stack";
import PostThumbnail from "src/components/system-design/image/post-thumbnail";
import TagButton from "src/components/system-design/tag/tag-button";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/spacing";

// types
import { PostDetail } from "src/types/post";
import { Tag } from "src/types/tag";

// utils
import DateUtil from "src/utils/DateUtil";

type Props = {
  post: PostDetail;
  onClick: () => void;
};

const Item = (props: Props) => {
  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>([]);

  const dateUtil = new DateUtil();

  useEffect(() => {
    const loadTags = async () => {
      const tags = await API.getTags({
        postId: props.post.id,
      });

      setTags(tags);
    };

    loadTags();
  }, []);

  const styles = {
    container: css`
      cursor: pointer;

      .title {
        font-size: 24px;
        letter-spacing: 0.5px;
        font-weight: 900;
        color: ${colors.heading};
      }

      .content {
        height: 90px;
        line-height: 30px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > .thumbnail {
        width: 30%;
        min-width: 150px;
        max-width: 200px;
      }
    `,
  };

  return (
    <Stack.Horizontal
      css={styles.container}
      spacing={spacing.unit10}
      onClick={props.onClick}
    >
      <Stack.Horizontal.Item overflow="hidden">
        <Stack.Vertical className={cx("full-height")} spacing={spacing.unit10}>
          <Stack.Vertical.Item className={cx("title")} flex={"none"}>
            {props.post.title}
          </Stack.Vertical.Item>

          <Stack.Vertical.Item overflow="hidden">
            <div className={cx("content")}>
              {/** HTML 태그를 공백으로 치환 */}
              {props.post.content.replace(/<[^>]+>/g, " ")}
            </div>
          </Stack.Vertical.Item>

          <Stack.Vertical.Item flex={"none"}>
            <Flex
              wrap="wrap"
              columnGap={coerceCssPixelValue(spacing.unit8)}
              rowGap={coerceCssPixelValue(spacing.unit8)}
            >
              {tags.map((tag) => (
                <TagButton key={tag.id} tag={tag} />
              ))}
            </Flex>
          </Stack.Vertical.Item>

          <Stack.Vertical.Item className={cx("registered-at")} flex={"none"}>
            {props.post.registeredAt &&
              dateUtil.utcUnixStringToDateString(props.post.registeredAt)}
          </Stack.Vertical.Item>
        </Stack.Vertical>
      </Stack.Horizontal.Item>

      {props.post.thumbnailImageUri && (
        <Stack.Horizontal.Item flex={"none"} className={cx("thumbnail")}>
          <PostThumbnail
            image={{
              uri: props.post.thumbnailImageUri,
            }}
          />
        </Stack.Horizontal.Item>
      )}
    </Stack.Horizontal>
  );
};

export default Item;
