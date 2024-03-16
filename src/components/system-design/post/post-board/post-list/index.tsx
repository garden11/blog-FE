import _ from "lodash";
import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import PostThumbnail from "../../../image/post-thumbnail";
import Stack from "src/components/design-system/stack";
import Spacing from "src/components/design-system/spacing";
import Line from "src/components/design-system/line";

// styles
import { spacing } from "src/styles/spacing";

// types
import { PostDetail } from "src/types/post";

// utils
import DateUtil from "src/utils/DateUtil";

type Props = {
  list: PostDetail[];
  onClickListItem: (postId: PostDetail["id"]) => void;
};

const PostList = (props: Props) => {
  const dateUtil = new DateUtil();

  const styles = {
    container: css`
      > .item {
        .title {
          font-size: 24px;
          letter-spacing: 0.5px;
          font-weight: 900;
          color: #20232e;
          ${spacing.margin.y10};
        }

        .content {
          height: 54px;
          line-height: 18px;
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
          aspect-ratio: 10 / 7;
        }
      }
    `,
  };

  return (
    <Stack.Vertical css={styles.container}>
      {props.list.map((listItem, index) => {
        return (
          <>
            <Stack.Horizontal
              spacing={spacing.unit10}
              key={listItem.id}
              className={cx("item")}
              onClick={() => props.onClickListItem(listItem.id)}
            >
              <Stack.Horizontal.Item overflow="hidden">
                <Stack.Vertical className={cx("full-height")}>
                  <Stack.Vertical.Item className={cx("title")} flex={"none"}>
                    {listItem.title}
                  </Stack.Vertical.Item>

                  <Stack.Vertical.Item overflow="hidden">
                    <div className={cx("content")}>
                      {/** HTML 태그를 공백으로 치환 */}
                      {listItem.content.replace(/<[^>]+>/g, " ")}
                    </div>
                  </Stack.Vertical.Item>

                  <Stack.Vertical.Item
                    className={cx("registered-at")}
                    flex={"none"}
                  >
                    {listItem.registeredAt &&
                      dateUtil.utcUnixStringToDateString(listItem.registeredAt)}
                  </Stack.Vertical.Item>
                </Stack.Vertical>
              </Stack.Horizontal.Item>

              <Stack.Horizontal.Item flex={"none"} className={cx("thumbnail")}>
                <PostThumbnail
                  image={{
                    uri: listItem.thumbnailImageUri ?? undefined,
                  }}
                />
              </Stack.Horizontal.Item>
            </Stack.Horizontal>

            {index !== props.list.length - 1 && (
              <>
                <Spacing.Vertical size={spacing.unit30} />
                <Line.Horizontal />
                <Spacing.Vertical size={spacing.unit30} />
              </>
            )}
          </>
        );
      })}
    </Stack.Vertical>
  );
};

export default PostList;
