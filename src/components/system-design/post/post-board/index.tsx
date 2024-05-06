import _ from "lodash";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

// components
import Flex from "src/components/design-system/flex";
import PostList from "./post-list";
import Pagination from "src/components/design-system/pagination";
import Stack from "src/components/design-system/stack";

// styles
import { flex } from "src/styles/flex";
import { spacing } from "src/styles/spacing";

// types
import { PageInfo } from "src/types/pageInfo";
import { PostDetail } from "src/types/post";

type Props = {
  posts: PostDetail[];
  postsPageInfo: PageInfo;
  onClickListItem: (postId: PostDetail["id"]) => void;
  onClickPageButton: (page: number) => void;
};

const PostBoard = (props: Props) => {
  const styles = {
    contianer: css`
      min-height: 400px;

      > .posts-pagination {
        ${flex.display};
        ${flex.direction("column")};

        > .empty {
          flex: auto;
        }
      }
    `,
  };

  return (
    <Stack.Vertical css={styles.contianer}>
      <Stack.Vertical.Item className={cx("posts-pagination")}>
        {_.isEmpty(props.posts) ? (
          <Flex.Center className={cx("empty")}>포스트가 없습니다.</Flex.Center>
        ) : (
          <Stack.Vertical spacing={spacing.unit30}>
            <PostList posts={props.posts} onClickItem={props.onClickListItem} />

            {props.postsPageInfo.totalPages !== 0 && (
              <Pagination
                pageInfo={props.postsPageInfo}
                onClickButton={props.onClickPageButton}
              />
            )}
          </Stack.Vertical>
        )}
      </Stack.Vertical.Item>
    </Stack.Vertical>
  );
};

export default PostBoard;
