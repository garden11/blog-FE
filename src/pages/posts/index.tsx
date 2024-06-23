import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import PostBoard from "src/components/system-design/post/post-board";
import Stack from "src/components/design-system/stack";
import TagList from "src/components/system-design/tag/tag-list";

// types
import { PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";
import { Page } from "src/types/common";
import { Tag } from "src/types/tag";

// styles
import { spacing } from "src/styles/spacing";

type PageQuery = {
  page?: number | undefined;
  tagId?: string | undefined;
};

type Props = {
  posts: PostDetail[];
  postsPageInfo: PageInfo;
  tags: Tag[];
};

const Posts: Page<Props> = (props) => {
  const router = useRouter();
  const { tagId } = router.query as PageQuery;

  const handleClickPostBoardListItem = (postId: PostDetail["id"]) => {
    router.push(`posts/${postId}`);
  };

  const handleClickPostBoardPageButton = (page: number) => {
    router.push({
      pathname: "/posts",
      query: { page },
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
        <title>jwseok</title>
      </Head>

      <Stack.Vertical css={styles.container} spacing={spacing.unit50}>
        <Stack.Vertical className={cx("tags")} spacing={spacing.unit20}>
          <div className={cx("title")}>Tags</div>
          <TagList tags={props.tags} selectedTagId={tagId} />
        </Stack.Vertical>

        <PostBoard
          posts={props.posts}
          postsPageInfo={props.postsPageInfo}
          onClickListItem={handleClickPostBoardListItem}
          onClickPageButton={handleClickPostBoardPageButton}
        />
      </Stack.Vertical>
    </>
  );
};

Posts.layout = (page: ReactElement) => {
  return <BlogLayout>{page}</BlogLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const { query } = context;
  const { page = 1, tagId } = query as PageQuery;

  const [tags, { content: posts, ...pageInfo }] = await Promise.all([
    API.getTags({}),
    API.getPostDetails({
      page,
      tagId,
    }),
  ]);

  return {
    props: {
      posts,
      postsPageInfo: pageInfo,
      tags,
    },
  };
};

export default Posts;
