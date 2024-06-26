import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// api
import * as API from "src/api";

//components
import Flex from "src/components/design-system/flex";
import Line from "src/components/design-system/line";
import Spacing from "src/components/design-system/spacing";
import Stack from "src/components/design-system/stack";
import ProfilePicture from "../../image/profile-picture";
import TagButton from "../../tag/tag-button";
import Viewer from "src/components/design-system/viewer";

// hooks
import useAuth from "src/hooks/useAuth";

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
  onClickUpdatePostButton: () => void;
  onClickDeletePostButton: (postId: PostDetail["id"]) => void;
};

const PostBox = (props: Props) => {
  const { isSignedIn } = useAuth();

  const dateUtil = new DateUtil();

  const [tags, setTags] = useState<Tag[]>([]);

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
    contianer: css`
      .title {
        font-size: 20px;
        letter-spacing: 0.25px;
        font-weight: 900;
        color: ${colors.heading};
      }

      .post-info {
        > .item {
          font-size: 14px;
          color: ${colors.gray};
          font-weight: 400;
        }
      }

      .post-options {
        > .edit-delete {
          text-align: right;

          > .item {
            display: inline-block;

            > a {
              color: ${colors.link};
              cursor: pointer;
            }
          }
        }
      }
    `,
  };

  return (
    <div css={styles.contianer}>
      <Stack.Vertical spacing={spacing.unit20}>
        <div className={cx("title")}>{props.post.title}</div>

        <Stack.Horizontal
          className={cx("post-info")}
          alignItems="center"
          spacing={spacing.unit8}
        >
          <Stack.Horizontal
            className={cx("item")}
            alignItems="center"
            spacing={spacing.unit8}
          >
            <ProfilePicture
              image={{ uri: props.post.profileImageUri }}
              size={"20px"}
            />
            <div>{props.post.username}</div>
          </Stack.Horizontal>

          <Line.Vertical size={"10px"} />

          <div className={cx("item")}>
            {props.post.registeredAt &&
              dateUtil.utcUnixStringToDateString(props.post.registeredAt)}{" "}
            작성
          </div>

          {props.post.updatedAt && (
            <>
              <Line.Vertical size={"10px"} />
              <div className={cx("item")}>
                {dateUtil.utcUnixStringToDateString(props.post.updatedAt)} 수정
              </div>
            </>
          )}
        </Stack.Horizontal>
      </Stack.Vertical>

      <Spacing.Vertical size={spacing.unit30} />
      <Line.Horizontal />
      <Spacing.Vertical size={spacing.unit30} />

      <Viewer value={props.post.content} />

      <Spacing.Vertical size={spacing.unit100} />

      <Flex
        wrap="wrap"
        columnGap={coerceCssPixelValue(spacing.unit8)}
        rowGap={coerceCssPixelValue(spacing.unit8)}
      >
        {tags.map((tag) => (
          <TagButton key={tag.id} tag={tag} />
        ))}
      </Flex>

      <Spacing.Vertical size={spacing.unit10} />

      <div className={cx("post-options")}>
        {/* 블로그 주인인 경우 수정, 삭제 버튼 추가 */}
        {isSignedIn(props.post.username) && (
          <ul className={cx("edit-delete")}>
            <li className={cx("item")}>
              <a className="button" onClick={props.onClickUpdatePostButton}>
                EDIT
              </a>
            </li>
            &nbsp;&nbsp;
            <li className={cx("item")}>
              <a
                className="button"
                onClick={() => props.onClickDeletePostButton(props.post.id)}
              >
                DELETE
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostBox;
