import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

// components
import Flex from "src/components/design-system/flex";
import PostList from "./post-list";
import Pagination from "src/components/design-system/pagination";
import Stack from "src/components/design-system/stack";

// styles
import { colors } from "src/styles/colors";
import { flex } from "src/styles/flex";
import { spacing } from "src/styles/spacing";

// types
import { PageInfo } from "src/types/pageInfo";
import { PostDetail } from "src/types/post";

type Props = {
  canPost?: boolean;
  postList: PostDetail[];
  postListPageInfo: PageInfo;
  onClickPostListItem: (postId: PostDetail["id"]) => void;
  onClickPageNavigationButton: (page: number) => void;
  onClickCreatePostButton: () => void;
};

const PostBoard = (props: Props) => {
  const styles = {
    contianer: css`
      min-height: 100%;

      > .post-edit {
        display: none;

        button {
          background-color: transparent;
          border: 0px;

          svg {
            color: ${colors.primary};
            border-bottom: 3px solid;
          }
        }

        @media (max-width: 992px) {
          display: block;
          ${spacing.margin.bottom10};
        }
      }

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
      {props.canPost && (
        <Stack.Vertical.Item flex={"none"} className="post-edit">
          <Flex justifyContent="flex-end">
            <button onClick={props.onClickCreatePostButton}>
              <EditIcon fontSize="large" />
            </button>
          </Flex>
        </Stack.Vertical.Item>
      )}

      <Stack.Vertical.Item className={cx("posts-pagination")}>
        {_.isEmpty(props.postList) ? (
          <Flex.Center className={cx("empty")}>포스트가 없습니다.</Flex.Center>
        ) : (
          <Stack.Vertical spacing={spacing.unit30}>
            <PostList
              list={props.postList}
              onClickListItem={props.onClickPostListItem}
            />

            <Pagination
              pageInfo={props.postListPageInfo}
              onClickButton={props.onClickPageNavigationButton}
            />
          </Stack.Vertical>
        )}
      </Stack.Vertical.Item>
    </Stack.Vertical>
  );
};

export default PostBoard;
