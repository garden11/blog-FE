import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import PostBoard from "src/components/system-design/post/post-board";
import Stack from "src/components/design-system/stack";
import TagList from "src/components/system-design/tag/tag-list";

// hooks
import useAuth from "src/hooks/useAuth";
import usePostActions from "src/hooks/usePostActions";

// types
import { PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";
import { Page } from "src/types/common";

// styles
import { spacing } from "src/styles/spacing";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

type PageQuery = {
  page?: number | undefined;
  tagId?: string | undefined;
};

type Props = {};

const BlogBoard: Page<Props> = (props) => {
  const router = useRouter();
  const { page = 1, tagId } = router.query as PageQuery;

  const { isSignedIn } = useAuth();
  const { handleClickCreatePostButton } = usePostActions();

  const [postList, setPostList] = useState<PostDetail[]>([] as PostDetail[]);
  const [postListPageInfo, setPostListPageInfo] = useState<PageInfo>(
    {} as PageInfo
  );

  useEffect(() => {
    const getPostDetailList = async () => {
      try {
        const { content, ...pageInfo } = await API.getPostDetailList({
          page,
          tagId,
        });

        setPostList(content);
        setPostListPageInfo(pageInfo);
      } catch (error) {
        alert("포스트를 불러올 수 없습니다.");
      }
    };

    getPostDetailList();
  }, [tagId, page]);

  const handleClickPostBoardListItem = (postId: PostDetail["id"]) => {
    router.push(`post/${postId}`);
  };

  const handleClickPostBoardPageNavigationButton = (page: number) => {
    router.push({
      pathname: `/`,
      query: { page, tagId },
    });
  };

  const styles = {
    container: css`
      .tags {
        > .title {
          font-size: 38px;
          font-weight: 600;
        }
      }
    `,
  };

  return (
    <>
      <Head>
        <title>BLOG</title>
      </Head>

      <Stack.Vertical css={styles.container} spacing={spacing.unit100}>
        <Stack.Vertical className={cx("tags")} spacing={spacing.unit20}>
          <div className={cx("title")}>Tags</div>
          <TagList />
        </Stack.Vertical>

        <PostBoard
          canPost={isSignedIn()}
          postList={postList}
          postListPageInfo={postListPageInfo}
          onClickPostListItem={handleClickPostBoardListItem}
          onClickPageNavigationButton={handleClickPostBoardPageNavigationButton}
          onClickCreatePostButton={handleClickCreatePostButton}
        />
      </Stack.Vertical>
    </>
  );
};

BlogBoard.layout = (page: ReactElement) => {
  return <BlogLayout>{page}</BlogLayout>;
};

export default BlogBoard;
