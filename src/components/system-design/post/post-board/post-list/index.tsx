import _ from "lodash";
import { cx } from "@emotion/css";
import { css } from "@emotion/react";

// components
import Card from "src/components/design-system/card";
import PostThumbnail from "../../../image/post-thumbnail";
import Stack from "src/components/design-system/stack";

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
      .down-content {
        padding: 40px;
        border-right: 1px solid #eee;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;

        > .category {
          font-size: 18px;
          letter-spacing: 0.5px;
          font-weight: 900;
          color: #f48840;
        }

        > .title {
          font-size: 24px;
          letter-spacing: 0.5px;
          font-weight: 900;
          color: #20232e;
          ${spacing.margin.y10};
          ${spacing.margin.left20};
        }

        > .others {
          ${spacing.margin.top10};

          > .item {
            display: inline-block;
            font-size: 14px;
            color: #aaa;
            font-weight: 400;

            :after {
              content: "|";
              color: #aaa;
              ${spacing.margin.x8};
            }

            :last-child::after {
              display: none;
            }
          }
        }
      }
    `,
  };

  return (
    <Stack.Vertical css={styles.container} spacing={spacing.unit30}>
      {props.list.map((listItem) => {
        return (
          <div
            key={listItem.id}
            onClick={() => props.onClickListItem(listItem.id)}
          >
            <Card>
              <PostThumbnail
                image={{
                  uri: listItem.thumbnailImageUri ?? undefined,
                }}
              />

              <div className={cx("down-content")}>
                <span className={cx("category")}>{listItem.categoryName}</span>
                <a className={cx("title")}>{listItem.title}</a>

                <ul className={cx("others")}>
                  <li className={cx("item")}>
                    <a className={cx("username")}>{listItem.username}</a>
                  </li>

                  <li className={cx("item")}>
                    <a className={cx("registered-at")}>
                      {listItem.registeredAt &&
                        dateUtil.utcUnixStringToDateString(
                          listItem.registeredAt
                        )}
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        );
      })}
    </Stack.Vertical>
  );
};

export default PostList;
