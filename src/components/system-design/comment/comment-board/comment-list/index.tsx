import Link from "next/link";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

// components
import Flex from "src/components/design-system/flex";
import Line from "src/components/design-system/line";
import Spacing from "src/components/design-system/spacing";
import Stack from "src/components/design-system/stack";
import ProfilePicture from "src/components/system-design/image/profile-picture";

// hooks
import useAuth from "src/hooks/useAuth";

// styles
import { colors } from "src/styles/colors";
import { spacing } from "src/styles/spacing";

// types
import { CommentDetail } from "src/types/comment";

// utils
import DateUtil from "src/utils/DateUtil";

type Props = {
  list: CommentDetail[];
  onClickDeleteButton: (commentId: CommentDetail["id"]) => void;
};

const CommentList = (props: Props) => {
  const { isSignedIn } = useAuth();

  const dateUtil = new DateUtil();

  const styles = {
    contianer: css`
      > .item {
        min-height: 100px;

        .comment-info-content {
          > .info {
            > .username {
              color: ${colors.heading};
              font-size: 19px;
              font-weight: 900;
              letter-spacing: 0.5px;
            }

            > .registered-at {
              font-size: 14px;
              color: ${colors.gray};
              font-weight: 400;
              letter-spacing: 0.25px;
              margin-left: 20px;
            }
          }

          > .content {
          }
        }

        .comment-deal {
          .delete-button {
            background-color: transparent;
            color: ${colors.gray};
            border: none;
            cursor: pointer;
          }
        }
      }
    `,
  };

  return (
    <ul css={styles.contianer}>
      {props.list.map((listItem, index) => {
        return (
          <>
            <li key={listItem.id} className={cx("item")}>
              <Stack.Horizontal spacing={spacing.unit30}>
                <Stack.Horizontal.Item flex={"none"}>
                  <ProfilePicture
                    image={{
                      uri: listItem.profileImageUri ?? undefined,
                    }}
                    size={"100px"}
                  />
                </Stack.Horizontal.Item>

                <Stack.Horizontal.Item>
                  <Stack.Vertical className={cx("full-height")}>
                    <Stack.Vertical.Item
                      flex={"none"}
                      className={cx("comment-info-content")}
                    >
                      <Stack.Horizontal
                        className={cx("info")}
                        spacing={spacing.unit10}
                        alignItems="flex-end"
                      >
                        <Link
                          className={cx("username")}
                          href={`/${listItem.username}`}
                        >
                          {listItem.username}
                        </Link>
                        <span className={cx("registered-at")}>
                          {dateUtil.utcUnixStringToDateString(
                            listItem.registeredAt
                          )}{" "}
                          작성
                        </span>
                      </Stack.Horizontal>
                      <div className={cx("content")}>{listItem.content}</div>
                    </Stack.Vertical.Item>

                    <Stack.Vertical.Item className={cx("comment-deal")}>
                      <Flex
                        className={cx("full-height")}
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      >
                        {/* 댓글을 작성한 사용자인 경우 삭제 버튼 추가 */}
                        {isSignedIn(listItem.username) && (
                          <button
                            className={cx("delete-button")}
                            onClick={() =>
                              props.onClickDeleteButton(listItem.id)
                            }
                          >
                            DELETE
                          </button>
                        )}
                      </Flex>
                    </Stack.Vertical.Item>
                  </Stack.Vertical>
                </Stack.Horizontal.Item>
              </Stack.Horizontal>
            </li>

            {index !== props.list.length - 1 && (
              <>
                <Spacing.Vertical size={spacing.unit20} />
                <Line.Horizontal />
                <Spacing.Vertical size={spacing.unit20} />
              </>
            )}
          </>
        );
      })}
    </ul>
  );
};

export default CommentList;
