import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";

//components
import Card from "src/components/design-system/card";
import Line from "src/components/design-system/line";
import Spacing from "src/components/design-system/spacing";
import Stack from "src/components/design-system/stack";

// hooks
import useAuth from "src/hooks/useAuth";

// styles
import { spacing } from "src/styles/spacing";

// types
import { PostDetail } from "src/types/post";

// utils
import DateUtil from "src/utils/DateUtil";

const PostContent = dynamic(() => import("./post-content"), { ssr: false });

type Props = {
  post: PostDetail;
  onClickUpdatePostButton: () => void;
  onClickDeletePostButton: (postId: PostDetail["id"]) => void;
};

const PostBox = (props: Props) => {
  const { isSignedIn } = useAuth();

  const dateUtil = new DateUtil();

  const styles = {
    contianer: css`
      .down-content {
        .category {
          font-size: 18px;
          letter-spacing: 0.5px;
          font-weight: 900;
          color: #f48840;
        }

        .title {
          font-size: 20px;
          letter-spacing: 0.25px;
          font-weight: 900;
          color: #20232e;
        }
      }

      .post-info {
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

      .post-options {
        > .edit-delete {
          text-align: right;

          > .item {
            display: inline-block;

            > .button {
              color: #4158d0;
              cursor: pointer;
            }
          }
        }
      }
    `,
  };

  return (
    <div css={styles.contianer}>
      <Card>
        <Card.Content>
          <div className={cx("down-content")}>
            <Stack.Vertical spacing={spacing.unit20}>
              <div className={cx("category")}>{props.post.categoryName}</div>
              <div className={cx("title")}>{props.post.title}</div>

              <ul className={cx("post-info")}>
                <li className={cx("item")}>{props.post.username}</li>
                <li className={cx("item")}>
                  {props.post.registeredAt &&
                    dateUtil.utcUnixStringToDateString(
                      props.post.registeredAt
                    )}{" "}
                  작성
                </li>
                {props.post.updatedAt && (
                  <li className={cx("item")}>
                    {dateUtil.utcUnixStringToDateString(props.post.updatedAt)}{" "}
                    수정
                  </li>
                )}
              </ul>
            </Stack.Vertical>

            <Spacing.Vertical size={spacing.unit20} />
            <Line.Horizontal />
            <Spacing.Vertical size={spacing.unit20} />

            <PostContent value={props.post.content} />

            <div className={cx("post-options")}>
              {/* 블로그 주인인 경우 수정, 삭제 버튼 추가 */}
              {isSignedIn(props.post.username) && (
                <ul className={cx("edit-delete")}>
                  <li className={cx("item")}>
                    <a
                      className="button"
                      onClick={props.onClickUpdatePostButton}
                    >
                      EDIT
                    </a>
                  </li>
                  &nbsp;&nbsp;
                  <li className={cx("item")}>
                    <a
                      className="button"
                      onClick={() =>
                        props.onClickDeletePostButton(props.post.id)
                      }
                    >
                      DELETE
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PostBox;
